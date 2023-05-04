import AppConstants from "../constants/AppConstants";
import Diagnosis from "../models/Diagnosis";
import HttpClient from "../utils/HttpClient";
import { IDiagnosisService } from "./interfaces/IDiagnosisService";
import { IDiagnosisQueryKey } from "./interfaces/queryKeys/IDiagnosisQueryKeys";
import DiagnosisResponseToModelsMapper from "./mappers/DiagnosisResponseToModelsMapper";

class DiagnosisService implements IDiagnosisService {
  private static _instance?: DiagnosisService;
  private readonly httpClient!: HttpClient;

  public static get instance() {
    if (!DiagnosisService._instance) {
      DiagnosisService._instance = new DiagnosisService();
    }

    return DiagnosisService._instance;
  }

  constructor() {
    this.httpClient = new HttpClient(AppConstants.apiBaseUrl, "/diagnosis");
  }

  async getAsync(): Promise<Diagnosis[]> {
    const { data, error } = await this.httpClient.get(``);

    if (error) {
      console.error(error.message);
      throw error;
    }

    return DiagnosisResponseToModelsMapper.map(data);
  }

  async getWithFilterAsync(queryKey: IDiagnosisQueryKey): Promise<Diagnosis[]> {
    const { data, error } = await this.httpClient.get(
      `/${queryKey.id}/records`
    );

    if (error) {
      console.error(error.message);
      throw error;
    }

    return DiagnosisResponseToModelsMapper.map(data);
  }
}

export default DiagnosisService;
