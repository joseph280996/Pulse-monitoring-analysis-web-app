import Diagnosis from "../../models/Diagnosis";
import RecordedInstance from "../../models/RecordInstance";
import RecordSession from "../../models/RecordSession";

function map(diagnoses: any[]): Diagnosis[] {
  return diagnoses.map((diagnosis: any) => {
    const piezoRecordSession = mapRecordSessionResponseToModel(
      diagnosis.piezoElectricRecords
    );
    const ecgRecordSession = mapRecordSessionResponseToModel(
      diagnosis.ecgRecords
    );
    return new Diagnosis(
      diagnosis.pulseTypeId,
      diagnosis.patientId,
      diagnosis.dateTimeCreated,
      diagnosis.dateTimeUpdated,
      diagnosis.id,
      piezoRecordSession,
      ecgRecordSession
    );
  });
}

function mapRecordSessionResponseToModel(recordSession: any): RecordSession {
  return new RecordSession(
    recordSession.diagnosisId,
    recordSession.recordTypeId,
    recordSession.id,
    recordSession.dateTimeCreated,
    recordSession.dateTimeUpdated,
    mapRecordResponseToModels(recordSession.records)
  );
}

export function mapRecordResponseToModels(record: any[]) {
  if (!record) {
    return record;
  }

  return record.map((data) => new RecordedInstance(data.timeStamp, data.data));
}

export default {
  map,
};
