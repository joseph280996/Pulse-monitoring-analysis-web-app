import type Diagnosis from "../../dataObjects/Diagnosis";
import Record from "../../dataObjects/Record";

export interface IDiagnosisService {
  getRecordsByDiagnosisId: (id: number) => Promise<{ records?: Record[] }>;
  getAllDiagnoses: () => Promise<{ diagnoses?: Diagnosis[] }>;
}
