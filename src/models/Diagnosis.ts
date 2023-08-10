import RecordSession from "./RecordSession";

class Diagnosis {
  constructor(
    public pulseTypeId: number,
    public patientId: number,
    public dateTimeCreated: string,
    public dateTimeUpdated: string,
    public id?: number,
    public piezoElectricRecords?: RecordSession,
    public ecgRecords?: RecordSession
  ) {}
}

export default Diagnosis;
