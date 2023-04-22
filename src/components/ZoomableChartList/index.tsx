import ZoomableChartListView from "./ZoomableChartList.view";
import {
  type ChartDomainType,
  type ZoomableChartPropsType,
} from "./ZoomableChartList.types";
import { useState } from "react";
import { type VictoryZoomContainerProps } from "victory";

const getDefaultZoomDomain = (dataList: any[]): [number, number] => {
  let min: number = Number.POSITIVE_INFINITY;
  let max: number = Number.NEGATIVE_INFINITY;
  dataList.forEach((data) => {
    if (data[0].timeStamp < min) min = data[0].timeStamp;
    if (data[data.length - 1].timeStamp > max)
      max = data[data.length - 1].timeStamp;
  });
  return [0, max - min];
};

const ZoomableChartList = ({
  dataList,
}: ZoomableChartPropsType): JSX.Element => {
  const [minZoom, maxZoom] = getDefaultZoomDomain(dataList);
  const [selectedDomain, setSelectedDomain] = useState<ChartDomainType>({
    x: [minZoom, maxZoom],
  });
  const handleZoom = (domain: ChartDomainType): void => {
    setSelectedDomain(domain);
  };
  const [victoryZoomContainerProp] = useState<VictoryZoomContainerProps>({
    responsive: false,
    zoomDimension: "x",
    zoomDomain: selectedDomain,
    onZoomDomainChange: handleZoom,
  });

  return (
    <ZoomableChartListView
      dataList={dataList}
      onZoom={handleZoom}
      zoomDomain={selectedDomain}
      zoomMin={minZoom}
      zoomMax={maxZoom}
      zoomValue={(selectedDomain.x[0] as number) - 0}
      zoomContainerProp={victoryZoomContainerProp}
    />
  );
};

export default ZoomableChartList;
