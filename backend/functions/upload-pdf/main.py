import boto3

def generate_presigned_post(event, context):
    try:
        s3 = boto3.client('s3')        
        bucket_name = "gdg-joegon"
        object_key = 'resumes' + event['queryStringParameters']['filename'].strip('"\\')  # You can use variables like ${filename} to specify object keys

        # Generate a pre-signed POST URL valid for 1 hour
        url = s3.generate_presigned_post(
            bucket_name,
            object_key,
            Fields=None,  # Additional form fields if needed
            Conditions=None,  # Conditions that must be met for the POST request
            ExpiresIn=3600  # URL expiration time in seconds (1 hour in this case)
        )

        return {"URL":url}


    except Exception as e:
        response = {
            "statusCode": 500,
            "body": f"Internal Server Error: {str(e)}"
        }
    
    return response