import boto3
import os
from urllib.parse import unquote_plus

TEXTRACT = boto3.client("textract")

S3_BUCKET_JOEGON = os.environ["S3_BUCKET_JOEGON"]
TEXTRACT_S3_OUTPUT_PREFIX = os.environ["TEXTRACT_S3_OUTPUT_PREFIX"]


def main(event, context):
    print(event)

    for record in event["Records"]:
        s3_key = unquote_plus(record["s3"]["object"]["key"])

        textract_result = TEXTRACT.start_document_text_detection(
            DocumentLocation={"S3Object": {"Bucket": S3_BUCKET_JOEGON, "Name": s3_key}},
            OutputConfig={
                "S3Bucket": S3_BUCKET_JOEGON,
                "S3Prefix": TEXTRACT_S3_OUTPUT_PREFIX,
            },
        )

        print(textract_result)
