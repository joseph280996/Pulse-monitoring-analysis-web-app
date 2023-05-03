import { PulsePosition } from "../../models/PulsePosition";

function map(pulseTypes: any[]): PulsePosition[] {
  return pulseTypes.map(
    (pulseType: any) => new PulsePosition(pulseType.id, pulseType.name)
  );
}

export default {
  map
}
