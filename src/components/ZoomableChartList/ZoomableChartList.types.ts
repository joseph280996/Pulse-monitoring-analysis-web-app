import { type ComponentPropsWithDataType } from "../../common/types";

export interface GetAxisDomainRequestType {
  data: any[];
  from: number;
  to: number;
  ref: string;
  offset: number;
}

export interface ZoomableChartPropsType extends ComponentPropsWithDataType {}
export interface ZoomableChartViewPropsType extends ComponentPropsWithDataType {
  leftBound: string;
  rightBound: string;
  bottomBound: string;
  topBound: string;
  onZoom: (p: any) => any;
  zoomValue: number;
}
