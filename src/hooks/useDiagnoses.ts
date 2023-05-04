import { useCallback, useEffect, useState } from "react";
import DiagnosisService from "../apis/DiagnosisService";
import Diagnosis from "../models/Diagnosis";

const useDiagnoses = () => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [error, setError] = useState<Error | null | undefined>();
  const getPulsePosition = useCallback(async () => {
    try {
      const data = await DiagnosisService.instance.getAsync();
      setDiagnoses(data);
    } catch (requestError) {
      setError(requestError as Error);
    }
  }, []);

  useEffect(() => {
    getPulsePosition();
  }, [getPulsePosition]);

  return { diagnoses, error };
};

export default useDiagnoses;
