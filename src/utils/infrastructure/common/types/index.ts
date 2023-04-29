import { type FormEvent } from "react";

export type FormikHandleSubmitType = (
  e?: FormEvent<HTMLFormElement> | undefined
) => void;

export type ObjectWithStringIndexing = Record<string, any>;

export interface ReceivedDatum {
  timeStamp: number;
  data: number;
}

export interface IWsMessageType {
  type: string;
}

export interface PulseType {
  id: number;
  name: string;
}

export interface PulsePositionType {
  id: number;
  name: string;
}

export interface RecordType {
  id: number;
  pulseTypeID?: number;
  handPositionID?: number;
  data: ReceivedDatum[];
  patientID?: number;
}

export interface WSMessageType {
  type: string;
  recordedData: ReceivedDatum[];
}
