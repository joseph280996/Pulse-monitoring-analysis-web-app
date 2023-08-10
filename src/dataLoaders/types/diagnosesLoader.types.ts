import Diagnosis from "../../models/Diagnosis";

export interface IAllDiagnosesLoaderReturnType {
  diagnoses: Diagnosis[]
}

export interface ISingleDiagnosesLoaderReturnType {
  diagnosis: Diagnosis
}
