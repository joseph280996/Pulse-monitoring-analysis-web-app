import { SetStateAction } from "react";
import WebSocketClient from "../infrastructure/clients/WebSocketClient";
import type {
  WSMessageType,
  ReceivedDatum,
} from "../infrastructure/common/types";

export type UseWebsocketParamsType = (
  existingData: WSMessageType
) => SetStateAction<ReceivedDatum[]>;

export type UseSensorDataType = (
  setDataFn: UseWebsocketParamsType
) => UseSensorDataReturnType;

export type UseSensorDataReturnType = {
  data: ReceivedDatum[];
  error?: ErrorEvent;
  readyState?: number;
  recordID?: number;
  wsController: WebSocketClient | null;
};
