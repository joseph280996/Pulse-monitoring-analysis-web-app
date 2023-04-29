import HttpClient from "../clients/HttpClient";
import { type PulsePositionType } from "../common/types";
import { type IGetService } from "./interfaces/IService";

class PulsePositionService implements IGetService<never, PulsePositionType[]> {
  private readonly service: HttpClient<PulsePositionType>;

  constructor() {
    this.service = new HttpClient(
      // process.env.NODE_ENV === 'development'
      //   ? 'http://localhost:8000'
      // :
      "http://192.168.50.251:8000"
    );
  }

  async getAsync(): Promise<PulsePositionType[]> {
    const { data, error: requestError } = await this.service.get(
      "/hand-position"
    );
    if (requestError) {
      throw new Error(
        `Encounter Error requesting API - Message ${requestError.message}`
      );
    }
    if (!data) {
      throw new Error(
        "Cannot Get Pulse Position Type From Piezo Sensor Service."
      );
    }
    return data;
  }

  async getWithFilterAsync(): Promise<PulsePositionType[]> {
    throw new Error("Not yet implemented");
  }
}

export default new PulsePositionService();
