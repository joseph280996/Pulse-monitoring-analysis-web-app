import Record from "./Record";

class Diagnosis {
  constructor(
    public pulseTypeId: number,
    public patientId: number,
    public dateTimeCreated: string,
    public dateTimeUpdated: string,
    public id?: number,
    public piezoelectricRecord?: Record
  ) {}
}

export default Diagnosis;
