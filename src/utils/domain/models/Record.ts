export default class Record {
  id?: number;
  data: RecordedData[] = [];
  diagnosisID: number = 0;
  dateTimeCreated?: string;
  dateTimeUpdated?: string;
}

type RecordedData = {
  timestamp: number;
  data: number;
};
