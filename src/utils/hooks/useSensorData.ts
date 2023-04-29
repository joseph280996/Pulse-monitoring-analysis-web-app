import { useState } from "react";
import { type ReceivedDatum } from "../infrastructure/common/types";
import { type UseSensorDataType } from "./useSensorData.types";
import useWebSocket from "./useWebSocket";

const useSensorData: UseSensorDataType = (setDataFn) => {
  const [data, setData] = useState<ReceivedDatum[]>([]);
  const [recordID, setRecordID] = useState<number>();
  const { error, readyState, wsController } = useWebSocket({
    callback,
  });

  return {
    data,
    recordID,
    wsController,
    error,
    readyState,
  };
};
export default useSensorData;
