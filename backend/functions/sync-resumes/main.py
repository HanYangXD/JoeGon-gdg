import boto3
import json
import os
from opensearchpy import OpenSearch, RequestsHttpConnection, AWSV4SignerAuth
from urllib.parse import unquote_plus

AWS_REGION = os.environ["AWS_REGION"]

S3 = boto3.resource("s3")
S3_BUCKET_JOEGON = os.environ["S3_BUCKET_JOEGON"]

LAMBDA_ROLE_CRED = boto3.Session().get_credentials()
AWSAUTH = AWSV4SignerAuth(credentials=LAMBDA_ROLE_CRED, region=AWS_REGION, service="es")
AOS_ENDPOINT = os.environ["AOS_JOEGON_ENDPOINT"]
AOS = OpenSearch(
    hosts=[{"host": f"https://{AOS_ENDPOINT}", "port": 443}],
    http_auth=AWSAUTH,
    use_ssl=True,
    verify_certs=True,
    connection_class=RequestsHttpConnection,
    pool_maxsize=20,
)


def main(event, context):
    print(event)

    for record in event["Records"]:
        obj_result = S3.Object(
            bucket_name=S3_BUCKET_JOEGON,
            key=unquote_plus(record["s3"]["object"]["key"]),
        )
        file_content = obj_result.get()["Body"].read().decode("utf-8")
        json_content = json.loads(file_content)
