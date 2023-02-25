import Diagnosis from "../../dataObjects/Diagnosis";

export interface IDiagnosisService {
    getDiagnosisById(id : number): Promise<Diagnosis | undefined>

}
