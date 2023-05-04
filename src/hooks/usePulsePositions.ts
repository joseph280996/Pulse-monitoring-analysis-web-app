import { useCallback, useEffect, useState } from 'react';
import PulsePositionService from '../apis/PulsePositionService';
import { PulsePosition } from '../models/PulsePosition';
import { UsePulsePosition } from './types/usePulsePositions.types';

const usePulsePositions = (): UsePulsePosition => {
  const [pulsePositions, setPulsePositions] = useState<PulsePosition[]>([]);
  const [error, setError] = useState<Error | null | undefined>();
  const getPulsePosition = useCallback(async () => {
    try {
      const data = await PulsePositionService.instance.getAsync();
      setPulsePositions(
        [
          new PulsePosition(0, ''),
        ].concat(data)
      );
    } catch (requestError) {
      setError(requestError as Error);
    }
  }, []);
  useEffect(() => {
    getPulsePosition();
  }, [getPulsePosition]);
  return { pulsePositions, error };
};

export default usePulsePositions;
