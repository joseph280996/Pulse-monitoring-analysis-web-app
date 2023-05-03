import { useCallback, useEffect, useState } from 'react';
import PulseTypeService from '../apis/PulseTypeService';
import { PulseType } from '../models/PulseType';
import { UsePulseType } from './types/usePulseTypes.types';


const usePulseTypes = (): UsePulseType => {
  const [pulseTypes, setPulseTypes] = useState<PulseType[]>([]);
  const [error, setError] = useState<Error | null | undefined>(null);
  const getPulseTypes = useCallback(async () => {
    try {
      const data = await PulseTypeService.instance.getAsync();
      setPulseTypes(data);
    } catch (requestError) {
      setError(requestError as Error);
    }
  }, [setPulseTypes, setError]);
  useEffect(() => {
    getPulseTypes();
  }, [getPulseTypes]);

  return { pulseTypes, error };
};

export default usePulseTypes;
