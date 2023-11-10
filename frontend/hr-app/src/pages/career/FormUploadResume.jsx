import { useState } from "react";
import { FileUploader } from "react-drag-drop-files"
import * as API from "../../utils/apiservices"
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

const fileTypes = ["PDF"];

const UploadResume = () => {

  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitResumeClick = async (e) => {
    e.preventDefault();
    if (!uploadedFile) return;

    // API POST to server to submit PDF
    const [data, error] = await API.postAWSPresignedUrlApi(uploadedFile.name);
    if (error) {
      console.error(error);
      toast.error("Something went wrong during uploading. Please try again later.");
      return;
    }

    const { url, fields } = data.URL;
    const formData = new FormData();
    formData.append("key", fields.key);
    formData.append("AWSAccessKeyId", fields.AWSAccessKeyId);
    formData.append("x-amz-security-token", fields["x-amz-security-token"]);
    formData.append("policy", fields.policy);
    formData.append("signature", fields.signature);
    formData.append("file", uploadedFile);

    const [resp2, error2] = await API.postAWSUploadFileApi(url, formData);
    if (error2) {
      console.error(error);
      toast.error("Something went wrong during uploading. Please try again later.");
      return;
    }

    // toast success!
    console.info(resp2);
    toast.success("Your resume is uploaded. Thank you for using our service!");

    setIsLoading(false);
  };

  const onFileNameClick = () => {
    const fileURL = URL.createObjectURL(uploadedFile);
    window.open(fileURL, "_blank");
  }

  return (
    <>
      <Spinner show={isLoading}/>
      <form className="flex items-center flex-col gap-5 dark:text-fourthy-dark" onSubmit={(e) => onSubmitResumeClick(e)}>
        <label className="text-white"> Upload Resume </label>
        <FileUploader
          required={true}
          handleChange={(file) => setUploadedFile(file)}
          name="file"
          types={fileTypes}

        />
        {
          uploadedFile?.name &&
          <label>
            <span
              className="cursor-pointer underline text-blue-500"
              onClick={onFileNameClick}
              onKeyDown={onFileNameClick}
            >
              {uploadedFile.name} </span> was selected. <br />Please review once before submit to us!
          </label>
        }

        <button
          title="Submit Resume"
          className="px-2 py-2 bg-primary-light dark:bg-purple-dark dark:text-white rounded-lg hover:shadow-md"
          onClick={() => setIsLoading(true)}
          type="submit" >
          Submit Resume

        </button>
      </form>
    </>
  )
}
export default UploadResume