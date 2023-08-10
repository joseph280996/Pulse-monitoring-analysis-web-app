import { ReactElement } from "react";
import { useLoaderData } from "react-router-dom";
import { ISingleDiagnosesLoaderReturnType } from "../../dataLoaders/types/diagnosesLoader.types";
//import Diagnosis from "../../models/Diagnosis";
import AnalysisView from "./Analysis.view";

const Analysis = (): ReactElement => {
  const { diagnosis } = useLoaderData() as ISingleDiagnosesLoaderReturnType;
  return (
    <AnalysisView
      dataLists={[
        diagnosis?.piezoElectricRecords || [],
        diagnosis?.ecgRecords || [],
      ]}
    />
  );
};

export default Analysis;
