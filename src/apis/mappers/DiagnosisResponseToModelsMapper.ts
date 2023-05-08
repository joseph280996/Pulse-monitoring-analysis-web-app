import Diagnosis from "../../models/Diagnosis";
import Record from "../../models/Record";
import RecordedData from "../../models/RecordedData";

function map(diagnoses: any[]): Diagnosis[] {
  return diagnoses.map((diagnosis: any) => {
    return new Diagnosis(
      diagnosis.pulseTypeId,
      diagnosis.patientId,
      diagnosis.dateTimeCreated,
      diagnosis.dateTimeUpdated,
      diagnosis.id,
      mapRecordResponseToModels(diagnosis.piezoelectricRecord)
    );
  });
}

export function mapRecordResponseToModels(record: any) {
  if (!record) {
    return record;
  }

  return new Record(
    record.dateTimeCreated,
    record.dateTimeUpdated,
    record.id,
    mapRecordDataResponseToModels(record.data),
    record.diagnosisID
  );
}

export function mapRecordDataResponseToModels(recordedData: any[]) {
  return recordedData.map(
    (data) => new RecordedData(data.timeStamp, data.data)
  );
}

export default {
  map,
};
