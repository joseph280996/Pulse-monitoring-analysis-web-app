import { type DomainTuple, type VictoryZoomContainerProps } from "victory";
import { ComponentPropsWithDataType } from "../../../common/types";

export interface GetAxisDomainRequestType {
  data: any[];
  from: number;
  to: number;
  ref: string;
  offset: number;
}

export interface ChartDomainType {
  x: DomainTuple;
  y?: DomainTuple;
}

export interface ZoomableChartViewPropsType extends ComponentPropsWithDataType {
  onZoom: (domain: ChartDomainType, props: VictoryZoomContainerProps) => void;
  zoomDomain: Partial<ChartDomainType>;
  zoomMin: number;
  zoomMax: number;
  zoomValue: number;
  zoomContainerProp: VictoryZoomContainerProps;
}
