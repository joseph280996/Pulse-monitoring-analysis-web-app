import AppConstants from "../constants/AppConstants";
import { PulseType } from "../models/PulseType";
import HttpClient from "../utils/HttpClient";
import { IGetService } from "./interfaces/IGetService";
import PulseTypeResponseToModelMapper from "./mappers/PulseTypeResponseToModelMapper";

class PulseTypeService implements IGetService<never, PulseType> {
  private static _instance?: PulseTypeService;
  private service: HttpClient;

  public static get instance() {
    if (!PulseTypeService._instance) {
      PulseTypeService._instance = new PulseTypeService();
    }

    return PulseTypeService._instance;
  }

  constructor() {
    this.service = new HttpClient(
      AppConstants.apiBaseUrl,"/pulse-type" 
    );
  }

  async getAsync(): Promise<PulseType[]> {
    const { data, error: requestError } = await this.service.get();
    if (requestError) {
      throw new Error(
        `Encounter Error requesting API - Message ${requestError.message}`
      );
    }
    return PulseTypeResponseToModelMapper.map(data);
  }

  async getWithFilterAsync(): Promise<PulseType[]> {
    throw new Error("Method not implemented")
  }
}

export default PulseTypeService;
