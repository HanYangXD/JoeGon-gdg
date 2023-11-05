import boto3
import json
import os
from opensearchpy import OpenSearch, RequestsHttpConnection, AWSV4SignerAuth

AWS_REGION = os.environ["AWS_REGION"]

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

    event_body = json.loads(event["body"])
    input = event_body["input"]
    input = parse_input(input)

    search_response = AOS.search(
        index=AOS_CANDIDATE_INDEX,
        body={
            "query": {
                "query_string": {
                    "query": f"resume_content: {input}",
                }
            }
        },
        _source=False,
        sort="_score:desc",
    )

    candidates = [hit["_id"] for hit in search_response["hits"]["hits"]]
    func_response = {"results": candidates}

    return {"statusCode": 200, "body": json.dumps(func_response)}


def parse_input(input):
    phrases = input.replace("'", '"').split('"')

    search_texts = []

    for index, phrase in enumerate(phrases):
        # When phrase is quoted
        if index % 2 != 0:
            # Take the full phrase after trimming whitespaces
            search_texts.append(f'"{phrase.strip()}"~')
            continue

        # Treat every text of phrase as single search item
        for text in phrase.split(" "):
            if text := text.strip():
                search_texts.append(f'"{text}"~')

    return " ".join(search_texts)
