import BasicTable from "../../components/BasicTable";
import { useCallback, useMemo, useRef, useState } from "react";
import * as API from "../../utils/apiservices";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

// Mock PDfs, by right should use AWS service
import AndiePurchonPdf from '../../mocks/resumes/AndiePurchon.pdf';
import LaureDunlapPdf from '../../mocks/resumes/LaureDunlap.pdf';
import QuintaRosenbloomPdf from '../../mocks/resumes/QuintaRosenbloom.pdf';

const CanditateScreening = () => {

  const onFileNameClick = (url) => {

    // Mock PDfs, by right should use AWS service
    console.log(url.getValue());
    switch (url.getValue()) {
      case "AndiePurchon.pdf":
        window.open(AndiePurchonPdf);
        break;
      case "LaureDunlap.pdf":
        window.open(LaureDunlapPdf);
        break;
      case "QuintaRosenbloom.pdf":
        window.open(QuintaRosenbloomPdf);
        break;
      default:
        window.open(url, "_blank");
        break;
    }
    
  };


  const columns = [
    {
      header: "Full Name",
      accessorKey: "full_name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Pdf",
      accessorKey: "pdfUrl",
      cell: (value) => (
        <button
          className="rounded-lg mx-1 my-1 px-3 py-2 bg-primary-light dark:bg-purple-dark dark:text-white"
          onClick={() => onFileNameClick(value)}
        >
          <i className="icon ion-md-document"></i>
        </button>
      ),
    },
  ];

  const searchKeywordRef = useRef("");
  const [shouldFetch, setShouldFetch] = useState(false);
  const [candidateData, setCandidateData] = useState([]);

  const data = useMemo(() => candidateData, [candidateData]);

  const loadSearchKeywordData = useCallback((jsonData) => {
    // Need to double check the jsonData
    setCandidateData(jsonData);
  }, []);

  const resp = API.useAWSSearchCandidateApi(
    () => shouldFetch,
    loadSearchKeywordData,
    searchKeywordRef.current?.value
  );

  function handleSearchClick() {
    if (searchKeywordRef.current?.value) {
      setShouldFetch(true);
      return;
    }
    toast.info("Please enter a value before search.");
  }

  if (resp.isError) {
    toast.error(
      "Something went wrong during fetching data. Please try again later."
    );
  }
  return (
    <div className="flex flex-col items-center gap-2">
      <Spinner show={resp.isLoading} />
      <h1 className="dark:text-white text-lg">Canditate Screening</h1>
      <div className="">
        <input
          className="px-2 "
          placeholder="Search for keywords"
          ref={searchKeywordRef}
        />
        <button
          className=" bg-primary-light dark:bg-purple-dark px-2 "
          onClick={handleSearchClick}
        >
          <i className="icon ion-md-search dark:text-white"></i>
        </button>
      </div>
      {data ? (
        <BasicTable data={data} columns={columns} />
      ) : (
        <div className="dark:text-white">No Results</div>
      )}
    </div>
  );
};
export default CanditateScreening;
