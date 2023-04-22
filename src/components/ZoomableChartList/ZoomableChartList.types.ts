import { type ComponentPropsWithDataType } from "../../common/types";
import { type DomainTuple, type VictoryZoomContainerProps } from "victory";

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

export interface ZoomableChartPropsType extends ComponentPropsWithDataType {}
export interface ZoomableChartViewPropsType extends ComponentPropsWithDataType {
  onZoom: (domain: ChartDomainType, props: VictoryZoomContainerProps) => void;
  zoomDomain: Partial<ChartDomainType>;
  zoomMin: number;
  zoomMax: number;
  zoomValue: number;
  zoomContainerProp: VictoryZoomContainerProps;
}
