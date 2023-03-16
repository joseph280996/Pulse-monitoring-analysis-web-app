import ZoomableChartListView from "./ZoomableChartList.view";
import {
  type GetAxisDomainRequestType,
  type ZoomableChartPropsType,
} from "./ZoomableChartList.types";
import { useCallback, useMemo, useState } from "react";

const getAxisYDomain = ({
  data,
  from,
  to,
  ref,
  offset,
}: GetAxisDomainRequestType) => {
  const refData: any[] = data.slice(from - 1, to);
  let [bottom, top] = [refData[0][ref], refData[0][ref]];

  refData.forEach((datum) => {
    if (datum[ref] > top) top = datum[ref];
    if (datum[ref] < bottom) bottom = datum[ref];
  });

  return [(bottom | 0) - offset, (top | 0) + offset];
};

const ZoomableChartList = ({
  dataList: initialData,
  minZoomValue,
  maxZoomValue,
}: ZoomableChartPropsType) => {
  const [left, setLeft] = useState<string>("dataMin");
  const [right, setRight] = useState<string>("dataMax");
  const [top, setTop] = useState<string>("dataMax+1");
  const [bottom, setBottom] = useState<string>("dataMax-1");
  const [data, setData] = useState<any[]>(initialData);
  const [zoomValue, setZoomValue] = useState<number>(0);

  const [minZoom, maxZoom] = useMemo(() => {
    let minZoomVal: number, maxZoomVal: number;

    if (typeof minZoomValue === "function") {
      minZoomVal = minZoomValue(initialData);
    } else {
      minZoomVal = minZoomValue;
    }

    if (typeof maxZoomValue === "function") {
      maxZoomVal = maxZoomValue(initialData);
    } else {
      maxZoomVal = maxZoomValue;
    }

    return [minZoomVal, maxZoomVal];
  }, [minZoomValue, initialData]);

  const onZoom = useCallback(
    (event: Event, newValue: number | number[]) => {
      const [newBottom, newTop] = getAxisYDomain({
        data,
        from: Number(refAreaLeft),
        to: Number(refAreaRight),
        ref: "data",
        offset: 1,
      });

      setData((data) => data.slice());
      setBottom(newBottom.toString());
      setTop(newTop.toString());
    },
    [data]
  );

  return (
    <ZoomableChartListView
      dataList={data}
      leftBound={left}
      rightBound={right}
      topBound={top}
      bottomBound={bottom}
      onZoom={onZoom}
      zoomValue={zoomValue}
    />
  );
};

export default ZoomableChartList;
