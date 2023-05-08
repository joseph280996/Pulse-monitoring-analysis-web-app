import ZoomableChartList from "../../components/Chart/ZoomableChartList";
import { type AnalysisViewPropType } from "./Analysis.types";

const AnalysisView = ({ dataList }: AnalysisViewPropType) => {
  return (
    <div>
      <ZoomableChartList
        dataList={dataList}
        minZoomValue={() => 0}
        maxZoomValue={() => 0}
      />
    </div>
  );
};

export default AnalysisView;
