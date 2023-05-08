import { ComponentPropsWithDataType } from "../../../common/types";

export interface GetAxisDomainRequestType {
  data: any[];
  from: number;
  to: number;
  ref: string;
  offset: number;
}

export interface ZoomableChartPropsType extends ComponentPropsWithDataType {
  minZoomValue: (dataList: any[]) => number | number;
  maxZoomValue: (dataList: any[]) => number | number;
}
export interface ZoomableChartViewPropsType extends ComponentPropsWithDataType {
  leftBound: string;
  rightBound: string;
  bottomBound: string;
  topBound: string;
  onZoom: (event: Event, newValue: number | number[]) => void;
  zoomValue: number;
}
