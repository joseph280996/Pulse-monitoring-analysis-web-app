import { Dispatch, SetStateAction } from 'react';
import { ReceivedDatum, WSMessageType } from '../utils/infrastructure/common/types';

export type OnRecordedDataWSMessageConfigType = {
  setData: Dispatch<SetStateAction<any>>;
  setDataFn: (newData: WSMessageType) => SetStateAction<ReceivedDatum[]>;
};

export default (
  data: WSMessageType,
  { setData, setDataFn }: OnRecordedDataWSMessageConfigType
) => {
  setData(setDataFn(data));
};
