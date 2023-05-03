import { PulseType } from "../../models/PulseType";

function map(pulseTypes: any[]): PulseType[]{
  return pulseTypes.map(pulseType => 
  new PulseType(
      pulseType.id,
      pulseType.name
    ))
}

export default {
  map
} 
