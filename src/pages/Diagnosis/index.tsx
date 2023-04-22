import type { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useLoaderData } from "react-router-dom";
import type { IDiagnosisViewDataLoader } from "./Diagnosis.types";
import DiagnosisView from "./Diagnosis.view";

const DiagnosisPage = (): ReactJSXElement => {
  const { diagnoses } = useLoaderData() as IDiagnosisViewDataLoader;
  return <DiagnosisView diagnoses={diagnoses} />;
};

export default DiagnosisPage;
