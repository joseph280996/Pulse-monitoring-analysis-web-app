import Diagnosis from "../../models/Diagnosis";
import { IDiagnosisQueryKey } from "./queryKeys/IDiagnosisQueryKeys";
import { IGetService } from "./IGetService";

export interface IDiagnosisService
  extends IGetService<IDiagnosisQueryKey, Diagnosis> {}
