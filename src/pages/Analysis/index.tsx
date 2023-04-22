import type { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useLoaderData } from "react-router-dom";
import type Record from "../../dataObjects/Record";
import AnalysisView from "./Analysis.view";

const Analysis = (): ReactJSXElement => {
  const { records: piezoSensorData } = useLoaderData() as { records: Record[] };
  const piezoSensorDataToDisplay = piezoSensorData.flat(Infinity);

  return <AnalysisView dataList={[piezoSensorDataToDisplay]} />;
};

export default Analysis;
