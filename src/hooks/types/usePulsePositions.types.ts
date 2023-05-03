import { PulsePosition } from "../../models/PulsePosition";

export type UsePulsePosition = {
  pulsePositions: PulsePosition[];
  error: Error | null | undefined;
};

