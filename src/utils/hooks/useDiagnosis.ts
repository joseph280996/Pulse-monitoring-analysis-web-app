import { useCallback, useEffect, useState } from "react";
import PiezoElectricSensorDiagnosisService from "../infrastructure/services/diagnosisService";
import type Diagnosis from "../domain/models/Diagnosis";

interface UseRecordReturnType {
  record: Diagnosis[];
  isLoading: boolean;
}

type UseDiagnosisType = (recordID?: number) => UseRecordReturnType;

const useDiagnosis: UseDiagnosisType = (recordID) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [record, setRecord] = useState<Diagnosis[]>([]);

  const getRecord = useCallback(async (id: number) => {
    setIsLoading(true);
    const recordedRecord =
      await PiezoElectricSensorDiagnosisService.instance.getWithFilterAsync({
        id,
      });
    setRecord(recordedRecord);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (recordID) {
      void getRecord(recordID);
    }
  }, [getRecord, recordID]);
  return { record, isLoading };
};

export default useDiagnosis;
