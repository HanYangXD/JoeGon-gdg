import boto3
import json
import os
import uuid
from opensearchpy import OpenSearch, RequestsHttpConnection, AWSV4SignerAuth
from urllib.parse import unquote_plus

AWS_REGION = os.environ["AWS_REGION"]

S3 = boto3.resource("s3")
S3_BUCKET_JOEGON = os.environ["S3_BUCKET_JOEGON"]

LAMBDA_ROLE_CRED = boto3.Session().get_credentials()
AWSAUTH = AWSV4SignerAuth(credentials=LAMBDA_ROLE_CRED, region=AWS_REGION, service="es")
AOS_ENDPOINT = os.environ["AOS_JOEGON_ENDPOINT"]
AOS = OpenSearch(
    hosts=[{"host": AOS_ENDPOINT, "port": 443}],
    http_auth=AWSAUTH,
    use_ssl=True,
    verify_certs=True,
    connection_class=RequestsHttpConnection,
    pool_maxsize=20,
)
AOS_CANDIDATE_INDEX = os.environ["AOS_CANDIDATE_INDEX"]


def main(event, context):
    print(event)

    for record in event["Records"]:
        s3_key = unquote_plus(record["s3"]["object"]["key"])
        job_id = s3_key.split("/")[1]

        obj_result = S3.Object(
            bucket_name=S3_BUCKET_JOEGON,
            key=s3_key,
        )
        file_stream = obj_result.get()["Body"].read()
        analysed_body = json.loads(file_stream)
        blocks = analysed_body.get("Blocks", [])
        texts = []

        for block in blocks:
            block_type = block["BlockType"]
            block_text = block["Text"]

            if block_type == "LINE":
                texts.append(block_text)

        resume_content = " ".join(texts)

        index_response = AOS.index(
            index=AOS_CANDIDATE_INDEX,
            body={
                "job_id": job_id,
                "resume_content": resume_content,
            },
            id=str(uuid.uuid4()),  # Temporary use UUID as user_id
            refresh=True,
        )

        if index_response["_shards"]["failed"] > 0:
            raise Exception("Failed to insert resume content")
