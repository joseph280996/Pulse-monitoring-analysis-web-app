import HttpClient from "../clients/HttpClient";
import {
  type EcgPostParamType,
  type EcgSensorServiceResponseType,
} from "./ecgSensorService.types";
import { type IPostService } from "./interfaces/IService";

class EcgSensorService
  implements IPostService<EcgPostParamType, EcgSensorServiceResponseType>
{
  private readonly httpClient: HttpClient<EcgSensorServiceResponseType>;

  constructor() {
    this.httpClient = new HttpClient(
      // process.env.NODE_ENV === 'development'
      //   ? 'http://localhost:8080'
      // :
      "http://192.168.50.251:8080"
    );
  }

  async postAsync(
    ecgParam: EcgPostParamType
  ): Promise<EcgSensorServiceResponseType> {
    const { data, error } = await this.httpClient.post("/record", {
      ...ecgParam,
      status: ecgParam?.operation_type_id,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error("Cannot post to Ecg Service");
    }

    return data;
  }
}

export default new EcgSensorService();
