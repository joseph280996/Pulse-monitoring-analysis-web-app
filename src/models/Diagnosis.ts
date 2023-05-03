import Record from "./Record";

class Diagnosis {
  constructor(
    public pulseTypeId: number,
    public patientId: number,
    public piezoelectricRecord: Record,
    public dateTimeCreated: string,
    public dateTimeUpdated: string,
    public id?: number
  ) {}
}

export default Diagnosis;
