import { FormEvent } from "react";
import RecordedData from "../models/RecordInstance";

export type FormikHandleSubmitType = (
  e?: FormEvent<HTMLFormElement> | undefined
) => void;

export interface ObjectWithStringIndexing {
  [key: string]: any;
}

export interface IWsMessageType {
  type: string;
}

export type WSMessageType = {
  type: string;
  recordedData: RecordedData[];
};
