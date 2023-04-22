import HttpClient from '../infrastructure/clients/HttpClient'
import { IPostService } from './IService';

type EcgSensorServiceResponseType = {
  status: string;
  recordID?: number;
};

type EcgPostParamType = {
  operation_type_id: number;
};

class EcgSensorService
  implements IPostService<EcgPostParamType, EcgSensorServiceResponseType>
{
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(
      // process.env.NODE_ENV === 'development'
      //   ? 'http://localhost:8080'
      // :
      'http://192.168.50.251:8080'
    );
  }

  async postAsync(
    ecgParam: EcgPostParamType
  ): Promise<EcgSensorServiceResponseType> {
    const { data, error } = await this.httpClient.post('/record', { ...ecgParam, status: ecgParam?.operation_type_id});

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}

export default new EcgSensorService();
