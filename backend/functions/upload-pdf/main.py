import boto3
import json
import os

S3 = boto3.client("s3")
S3_BUCKET_JOEGON = os.environ["S3_BUCKET_JOEGON"]


def main(event, context):
    try:
        event_qs_param = event["queryStringParameters"]
        filename = event_qs_param["filename"]

        # Trim quotes or backslashes in file name
        filename = filename.strip('"\\')

        s3_key = f"resumes/{filename}"

        # Generate a pre-signed POST URL valid for 1 hour
        presigned_url = S3.generate_presigned_post(
            Bucket=S3_BUCKET_JOEGON,
            Key=s3_key,
            Fields=None,  # Additional form fields if needed
            Conditions=None,  # Conditions that must be met for the POST request
            ExpiresIn=3600,  # URL expiration time in seconds (1 hour in this case)
        )

        func_response = {
            "statusCode": 200,
            "headers": {
                "content-type": "application/json",
            },
            "body": json.dumps({"URL": presigned_url}),
        }

    except Exception as error:
        func_response = {
            "statusCode": 500,
            "headers": {"content-type": "application/json"},
            "body": f"Internal Server Error: {str(error)}",
        }

    finally:
        return func_response
