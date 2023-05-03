import { PulseType } from "../../models/PulseType";

export type UsePulseType = {
  pulseTypes: PulseType[];
  error: Error | null | undefined;
};
