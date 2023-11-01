import json
import boto3

s3 = boto3.client('s3')
s3_bucket_name = 'your-s3-bucket'

def generate_presigned_post(event, context):
    object_key = event.get('queryStringParameters', {}).get('objectKey', 'default-key')
    presigned_post = s3.generate_presigned_post(Bucket=s3_bucket_name, Key=object_key)
    return {
        "statusCode": 200,
        "body": json.dumps(presigned_post)
    }


# import json
# import os
# import boto3
# from botocore.exceptions import NoCredentialsError



# # print(S3_BUCKET_JOEGON, type(S3_BUCKET_JOEGON))

# # hy: bruteforce upload from local
# # try:
# #     s3.upload_file(local_file_path, s3_bucket_name, object_key)
# #     print(f"File '{local_file_path}' uploaded to '{s3_bucket_name}/{object_key}'")
# # except Exception as e:
# #     print(f"Error uploading file: {e}")


# def get_key():
#     AWS_SESSION = boto3.Session(profile_name="bot-steve", region_name="ap-southeast-1")

#     s3 = AWS_SESSION.client('s3')
#     s3_bucket_name = 'gdg-joegon'
#     object_key = 'uploaded-resume/a.pdf'
#     local_file_path = '/home/hy/Desktop/HY_personal/gdg/backend/functions/upload-pdf/a.pdf'
#     S3_BUCKET_JOEGON = os.environ["S3_BUCKET_JOEGON"]
#     # print(event)
#     try:
#         pre_signed_post=s3.generate_presigned_post(
#             Bucket=s3_bucket_name,
#             Key=object_key,
#             ExpiresIn=3600  # URL expiration time in seconds (1 hour in this example)
#         )
#     except NoCredentialsError:
#         print("No AWS credentials found")

#     response = {"statusCode": 200, "body": json.dumps(pre_signed_post)}
#     return response


# # print("Pre-Signed POST URL:", pre_signed_post['url'])
#     print('\n\n\n')
#     # print("Form Fields:", pre_signed_post['fields'])
#     print(pre_signed_post)
# # for a,b in pre_signed_post['fields'].items():
# #     print(a, '\t\t', b)

# import base64
# import boto3
# import os
# import json

# def get_key(event, context):
#     try:
#         # AWS_SESSION = boto3.Session(profile_name="bot-steve", region_name="ap-southeast-1")
#         # s3 = AWS_SESSION.client('s3')
#         s3 = boto3.client('s3', region_name='ap-southeast-1')
#         s3_bucket_name = 'gdg-joegon'
#         object_key = 'uploaded-resume/' + base64.b64decode(event['body'])
#         # file_content = base64.b64decode(event['body'])
#         local_file_path = '/home/hy/Desktop/HY_personal/gdg/backend/functions/upload-pdf/a.pdf'
        
#         S3_BUCKET_JOEGON = os.environ.get("S3_BUCKET_JOEGON")
        
#         pre_signed_post = s3.generate_presigned_post(
#             Bucket=s3_bucket_name,
#             Key=object_key,
#             ExpiresIn=3600  # URL expiration time in seconds (1 hour in this example)
#         )
        
#         response = {"statusCode": 200, "body": json.dumps(pre_signed_post)}
#     except Exception as e:
#         response = {"statusCode": 500, "body": f"Internal Server Error: {str(e)}"}
    
#     return response

