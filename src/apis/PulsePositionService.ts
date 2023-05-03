import AppConstants from "../constants/AppConstants";
import { PulsePosition } from "../models/PulsePosition";
import HttpClient from "../utils/HttpClient";
import { IPulsePositionService } from "./interfaces/IPulsePositionService";
import { IPulsePositionQueryKey } from "./interfaces/queryKeys/IPulsePositionQueryKeys";
import PulsePositionResponseToModelMapper from "./mappers/PulsePositionResponseToModelMapper";

class PulsePositionService implements IPulsePositionService {
  private static _instance?: PulsePositionService;
  private readonly httpClient!: HttpClient;

  public static get instance() {
    if (!PulsePositionService._instance) {
      PulsePositionService._instance = new PulsePositionService();
    }

    return PulsePositionService._instance;
  }

  constructor() {
    this.httpClient = new HttpClient(AppConstants.apiBaseUrl, "/diagnosis");
  }

  async getAsync(): Promise<PulsePosition[]> {
    const response = await this.httpClient.get(``);

    if (response.error) {
      console.error(response.error.message);
      throw response.error;
    }

    return PulsePositionResponseToModelMapper.map(response.data);
  }

  async getWithFilterAsync(
    queryKey: IPulsePositionQueryKey
  ): Promise<PulsePosition[]> {
    const response = await this.httpClient.get(`/${queryKey.id}/records`);

    if (response.error) {
      console.error(response.error.message);
      throw response.error;
    }

    return PulsePositionResponseToModelMapper.map(response.data);
  }

}

export default PulsePositionService;
