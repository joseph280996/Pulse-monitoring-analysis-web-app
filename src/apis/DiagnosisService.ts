import { PostDiagnosisFormProps } from "../common/types/forms/PostDiagnosisFormTypes";
import AppConstants from "../constants/AppConstants";
import Diagnosis from "../models/Diagnosis";
import HttpClient from "../common/HttpClient";
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
    const { data, error } = await this.httpClient.get(`/${queryKey.id}`);

    if (error) {
      console.error(error.message);
      throw error;
    }

    console.log(data);

    return DiagnosisResponseToModelsMapper.map([data]);
  }


  // TODO: Implement this function for posting diagnosis data to the piezo service
  async postAsync(formData: PostDiagnosisFormProps){
    throw new Error("This feature has not been implemented")
  }

  // TODO: Implement this function for posting to piezo service for exporting data
  async exportDataAsync(formValues): Promise<number>{
    throw new Error("This feature has not been implemented")
  }
}

export default DiagnosisService;
