import RecordedData from "./RecordedData";

export default class Record {
  constructor(
    public dateTimeCreated?: string,
    public dateTimeUpdated?: string,
    public id?: number,
    public data: RecordedData[] = [],
    public diagnosisID: number = 0
  ) {}
}
