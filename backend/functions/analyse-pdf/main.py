import base64
import boto3
import json
from datetime import datetime, timedelta, timezone

TEXTRACT = boto3.client("textract")
RESUME_NAME = "Attorney.pdf"

tz_gmt8 = timezone(timedelta(hours=8), name="GMT+8")
dt_now = datetime.now(tz=tz_gmt8)
str_now = dt_now.strftime("%Y-%m-%d %H:%M:%S")

with open(f"backend/assets/resumes/{RESUME_NAME}", "rb") as pdf:
    encoded_pdf = base64.b64encode(pdf.read())

textract_result = TEXTRACT.detect_document_text(Document={"Bytes": encoded_pdf})

# Output result into a file
json.dump(textract_result, fp=open(f"backend/assets/textract/{str_now}.json"))
