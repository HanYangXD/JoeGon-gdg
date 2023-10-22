import boto3

# from datetime import datetime, timedelta, timezone

AWS_SESSION = boto3.Session(profile_name="bot-steve", region_name="ap-southeast-1")
TEXTRACT = AWS_SESSION.client("textract")

S3_BUCKET_JOEGON = "gdg-joegon"
S3_KEY = "resumes/Attorney.pdf"
# No need end with "/" because it is a folder prefix
S3_TEXTRACT_OUTPUT_PREFIX = "textract"

# tz_gmt8 = timezone(timedelta(hours=8), name="GMT+8")
# dt_now = datetime.now(tz=tz_gmt8)
# str_now = dt_now.strftime("%Y-%m-%d %H:%M:%S")

textract_result = TEXTRACT.start_document_text_detection(
    DocumentLocation={"S3Object": {"Bucket": S3_BUCKET_JOEGON, "Name": S3_KEY}},
    OutputConfig={"S3Bucket": S3_BUCKET_JOEGON, "S3Prefix": S3_TEXTRACT_OUTPUT_PREFIX},
)

print(textract_result)
