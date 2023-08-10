import { useLoaderData } from "react-router-dom";
import { DiagnosisUploadLoaderType } from "./DiagnosisUpload.types";
import DiagnosisUploadView from "./DiagnosisUpload.view";

const DiagnosisUploadPage = () => {
  const { diagnoses } = useLoaderData() as DiagnosisUploadLoaderType;
  return <DiagnosisUploadView diagnoses={diagnoses} />;
};

export default DiagnosisUploadPage;
