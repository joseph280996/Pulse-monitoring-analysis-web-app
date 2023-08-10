import RecordInstance from "./RecordInstance";

class RecordSession {
  //#region constructor
  constructor(
    public diagnosisId: number,
    public recordTypeId: number,
    public id?: number,
    public dateTimeCreated?: string,
    public dateTimeUpdated?: string,
    public records?: RecordInstance[]
  ) {}
  //#endregion
}

export default RecordSession;
