import boto3
import requests 

def generate_presigned_post(event, context):
    try:
        s3 = boto3.client('s3')
        object_key = event['queryStringParameters']['objectKey']
        filename = event['queryStringParameters']['filename']
        
        file_data = event['body']
        
        post_url = s3.generate_presigned_url(
            'put_object',
            Params={'Bucket': object_key, 'Key': "uploaded-resume/" + filename},
            ExpiresIn=3600  # URL expiration time in seconds (1 hour in this example)
        )
        
        response = requests.post(post_url, data=file_data)
        if response.status_code == 200:
            return('success')
        else:
            # Handle different HTTP status codes and display corresponding error messages
            if response.status_code == 400:
                return "Bad Request: The request is invalid."
            elif response.status_code == 403:
                return "Access Denied: You don't have permission to upload the file."
            elif response.status_code == 404:
                return "File Not Found: The S3 bucket or object doesn't exist."
            # Add more status code handlers as needed
            else:
                return f"HTTP Error {response.status_code}: An unknown error occurred."

    except Exception as e:
        response = {
            "statusCode": 500,
            "body": f"Internal Server Error: {str(e)}"
        }
    
    return response
