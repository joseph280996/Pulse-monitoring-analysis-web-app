import { type Params } from "react-router-dom";
import Diagnosis from "../../utils/domain/models/Diagnosis";

export interface IDiagnosisDetailsViewDataLoader {
  diagnoses: Diagnosis[];
}

export interface IDiagnosisDetailsViewProps extends IDiagnosisDetailsViewDataLoader {}

export type GetRecordLoaderParamType = Params<string> & {
  id: number;
};
