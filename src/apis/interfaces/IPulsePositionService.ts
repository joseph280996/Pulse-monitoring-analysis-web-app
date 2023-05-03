import { PulsePosition } from "../../models/PulsePosition";
import { IGetService } from "./IGetService";
import { IPulsePositionQueryKey } from "./queryKeys/IPulsePositionQueryKeys";

export interface IPulsePositionService extends IGetService<IPulsePositionQueryKey, PulsePosition>{}
