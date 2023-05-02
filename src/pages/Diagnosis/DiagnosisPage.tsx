import {
  type ReactElement,
  type SetStateAction,
  useCallback,
  useState,
} from "react";
import { Spinner } from "react-bootstrap";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import LoadingSpinner from "../../components/LoadingSpinner";
import useSensorData from "../../utils/hooks/useSensorData";
import ecgSensorService from "../../utils/infrastructure/services/ecgSensorService";
import { ECG_POST_TYPE } from "../../utils/infrastructure/constants";
import {
  type ReceivedDatum,
  type WSMessageType,
} from "../../utils/infrastructure/common/types";

const setDataFn =
  (newData: WSMessageType): SetStateAction<ReceivedDatum[]> =>
  (prevData: ReceivedDatum[]): ReceivedDatum[] => {
    const newDataArr = [...prevData, ...newData.recordedData];
    if (newDataArr.length > 100) {
      return newDataArr.slice(-100);
    }
    return newDataArr;
  };

function DiagnosisPageContainer(): ReactElement {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [recordedStartTime, setRecordedStartTime] = useState<
    number | undefined
  >();

  const { height, width } = useWindowDimensions(20);

  const { data, error, readyState, recordID, wsController } =
    useSensorData(setDataFn);

  const onStart = useCallback(
    (handPositionID: number) => () => {
      setIsStarted(true);
      wsController?.sendMessage(`start;${JSON.stringify({ handPositionID })}`);
      void ecgSensorService.postAsync({
        operation_type_id: ECG_POST_TYPE.START,
      });
    },
    [wsController]
  );

  const onReset = useCallback(() => {
    setRecordedStartTime(undefined);
    wsController?.sendMessage(`start;`);
    setIsFinished(false);
  }, [wsController]);

  const onRecordHandler = useCallback(() => {
    setRecordedStartTime(data[data.length - 1].timeStamp);
  }, [data]);

  const onStopHandler = useCallback(
    () => () => {
      wsController?.sendMessage(`stop;`);
      void ecgSensorService.postAsync({
        operation_type_id: ECG_POST_TYPE.STOP,
      });
      setIsFinished(true);
    },
    [wsController, recordedStartTime, data]
  );

  if (!readyState || readyState === WebSocket.CONNECTING)
    return <Spinner animation="border" role="status" />;

  if (error) return <LoadingSpinner message={error.message} />;

  return (
    <DiagnosisPageComponent
      isStarted={isStarted}
      height={height}
      width={width}
      isFinished={isFinished}
      data={data}
      onStart={onStart}
      onRecord={onRecordHandler}
      onStop={onStopHandler}
      onReset={onReset}
      recordedStartTime={recordedStartTime}
      recordID={recordID}
    />
  );
}

export default DiagnosisPageContainer;
