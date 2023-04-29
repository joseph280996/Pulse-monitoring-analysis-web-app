import AppConstants from "../constants/AppConstants";
import type Diagnosis from "../dataObjects/Diagnosis";
import type Record from "../dataObjects/Record";
import HttpClient from "../utils/infrastructure/clients/HttpClient";
import type { IDiagnosisService } from "./interfaces/IDiagnosisService";

class PiezoElectricSensorDiagnosisService implements IDiagnosisService {
  private static _instance?: PiezoElectricSensorDiagnosisService;
  private readonly httpClient!: HttpClient<Diagnosis>;

  static get instance(): PiezoElectricSensorDiagnosisService {
    if (PiezoElectricSensorDiagnosisService._instance == null) {
      PiezoElectricSensorDiagnosisService._instance =
        new PiezoElectricSensorDiagnosisService();
    }

    return PiezoElectricSensorDiagnosisService._instance;
  }

  constructor() {
    console.log("Piezo sensor service constructing");
    this.httpClient = new HttpClient(`${AppConstants.apiBaseUrl}/diagnosis`);
  }

  async getAllDiagnoses(): Promise<{ : Diagnosis[] }> {
    console.log(this);
    console.log(this.httpClient);
    const response = await this.httpClient.get();
    if (response?.data == null) {
            throw new Error("Error sending request to get all diagnoses")
    }

    if (response.error != null) {
      console.error(response.error.message);
      throw response.error;
    }

    return { diagnoses: response.data };
  }

  async getRecordsByDiagnosisId(id: number): Promise<{ records?: Record[] }> {
    const response = await this.httpClient.get<Record[]>(`/${id}/records`);
    if (response?.data == null) {
      return {};
    }

    if (response.error != null) {
      console.error(response.error.message);
      throw response.error;
    }

    return { records: response.data };
  }
}

export default PiezoElectricSensorDiagnosisService;
