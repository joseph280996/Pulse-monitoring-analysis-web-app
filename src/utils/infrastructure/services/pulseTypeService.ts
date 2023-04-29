import HttpClient from "../clients/HttpClient";
import { type PulseType } from "../common/types";
import { type IGetService } from "./interfaces/IService";

class PulseTypeService implements IGetService<never, PulseType[]> {
  private readonly service: HttpClient<PulseType>;

  constructor() {
    this.service = new HttpClient<PulseType>(
      // process.env.NODE_ENV === 'development'
      //   ? 'http://localhost:8000'
      //   :
      "http://192.168.50.251:8000"
    );
  }

  async getAsync(): Promise<PulseType[]> {
    const { data, error: requestError } = await this.service.get("/pulse-type");
    if (requestError) {
      throw new Error(
        `Encounter Error requesting API - Message ${requestError.message}`
      );
    }

    if (!data) {
      throw new Error(`Cannot Get Pulse Type From Piezo Sensor Service`);
    }

    return data;
  }

  async getWithFilterAsync(): Promise<PulseType[]> {
    throw new Error("Not yet implemented");
  }
}

export default new PulseTypeService();
