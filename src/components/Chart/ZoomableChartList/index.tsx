import ZoomableChartListView from "./ZoomableChartList.view";
import { type ChartDomainType } from "./ZoomableChartList.types";
import { useState } from "react";
import { type VictoryZoomContainerProps } from "victory";
import RecordInstance from "../../../models/RecordInstance";
import RecordSession from "../../../models/RecordSession";
import { ComponentPropsWithDataType } from "../../../common/types";

const getDefaultZoomDomain = (dataList: RecordSession[]): [number, number] => {
  let min: number = Number.POSITIVE_INFINITY;
  let max: number = Number.NEGATIVE_INFINITY;
  dataList.forEach((data) => {
    const records = data.records as RecordInstance[];
    if (records[0].timeStamp < min) min = records[0].timeStamp;
    if (records[records.length - 1].timeStamp > max)
      max = records[records.length - 1].timeStamp;
  });
  return [0, max - min];
};

const ZoomableChartList = ({
  dataLists,
}: ComponentPropsWithDataType): JSX.Element => {
  const [minZoom, maxZoom] = getDefaultZoomDomain(dataLists);
  const [selectedDomain, setSelectedDomain] = useState<ChartDomainType>({
    x: [minZoom, maxZoom],
  });
  const handleZoom = (domain: ChartDomainType): void => {
    console.log(domain);
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
      dataLists={dataLists}
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
