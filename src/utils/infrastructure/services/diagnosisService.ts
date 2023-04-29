import { omit, pick } from "lodash";
import type Diagnosis from "../../domain/models/Diagnosis";
import AppConstants from "../constants/appConstants";
import HttpClient from "../clients/HttpClient";
import type { IGetService, IPostService } from "./interfaces/IService";
import { type PiezoElectricQueryKey } from "./types/diagnosisServiceTypes";
import { type PostDiagnosisFormProps } from "../../../components/forms/PostDiagnosisForm/PostDiagnosisFormTypes";

class DiagnosisService
  implements
    IGetService<PiezoElectricQueryKey, Diagnosis[]>,
    IPostService<PostDiagnosisFormProps, boolean>
{
  private static _instance?: DiagnosisService;
  private readonly httpClient!: HttpClient<Diagnosis>;

  static get instance(): DiagnosisService {
    if (DiagnosisService._instance == null) {
      DiagnosisService._instance = new DiagnosisService();
    }

    return DiagnosisService._instance;
  }

  constructor() {
    console.log("Piezo sensor service constructing");
    this.httpClient = new HttpClient(`${AppConstants.API_BASE_URL}/diagnosis`);
  }

  async getAsync(): Promise<Diagnosis[]> {
    const response = await this.httpClient.get("/");
    if (response.error != null) {
      console.error(response.error.message);
      throw response.error;
    }

    if (!response?.data) {
      throw new Error("Cannot get diagnoses from piezo sensor service.");
    }

    return response.data;
  }

  async getWithFilterAsync(
    queryKey: PiezoElectricQueryKey
  ): Promise<Diagnosis[]> {
    const queryParam = this.httpClient.constructingQueryParam(
      omit(queryKey, "id")
    );
    const response = await this.httpClient.get(
      `${!queryKey.id ? "" : `/${queryKey.id}?`}${queryParam}`
    );
    if (!response?.data) {
      throw new Error(
        `Cannot Get diagnosis data with query key [${queryParam}]`
      );
    }

    if (response.error != null) {
      console.error(response.error.message);
      throw response.error;
    }

    return response.data;
  }

  async postAsync(values: PostDiagnosisFormProps): Promise<boolean> {
    await this.httpClient.post("/record", {
      ...pick(values, ["pulseTypeID", "handPositionID", "patientName"]),
    });

    return true;
  }
}

export default DiagnosisService;
