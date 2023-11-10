import CardSelectSubmitResume from "../../components/CardSelectSubmitResume"

const Career = () => {
  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap pt-20 lg:gap-16 md:gap-8 items-center justify-center px-5">

        {/* TODO: Add a new input form */}
        {/* <CardSelectSubmitResume disabled={true} navigateTo={"/career/forminput"} cardItem={{ title: "Want to key in your details?", icon:"icon ion-md-keypad", btnText:"Fill In"}} /> */}
        <CardSelectSubmitResume navigateTo={"/career/formupload"} cardItem={{ title: "Want to upload your resume?", icon:"icon ion-md-cloud", btnText:"Upload"}} />

      </div>

    </>
  )
}
export default Career