import { ComponentPropsWithDataType } from "../../common/types";
import ZoomableChartList from "../../components/Chart/ZoomableChartList";

const AnalysisView = ({ dataLists }: ComponentPropsWithDataType) => {
  console.log(dataLists);
  return (
    <div>
      <ZoomableChartList dataLists={dataLists} />
    </div>
  );
};

export default AnalysisView;
