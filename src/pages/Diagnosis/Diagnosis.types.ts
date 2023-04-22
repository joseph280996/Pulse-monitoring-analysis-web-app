import { type Params } from "react-router-dom";
import type Diagnosis from "../../dataObjects/Diagnosis";

export interface IDiagnosisViewDataLoader {
  diagnoses: Diagnosis[];
}

export interface IDiagnosisViewProps extends IDiagnosisViewDataLoader {}

export type GetRecordLoaderParamType = Params<string> & {
  id: number;
};
