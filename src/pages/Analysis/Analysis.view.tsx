import ZoomableChartList from "../../components/ZoomableChartList";
import { type AnalysisViewPropType } from "./Analysis.types";

const AnalysisView = ({ dataList }: AnalysisViewPropType): JSX.Element => {
  return (
    <div>
      <ZoomableChartList dataList={dataList} />
    </div>
  );
};

export default AnalysisView;
