import { pick } from 'lodash';
import { PostDiagnosisFormProps } from '../../../components/forms/PostDiagnosisForm/PostDiagnosisFormTypes';
import HttpClient from '../clients/HttpClient';
import { RecordType } from '../common/types';
import { IGetService, IPostService } from './interfaces/IService';

class PiezoelectricSensorRecordService
  implements
    IPostService<PostDiagnosisFormProps, number>,
    IGetService<number, RecordType>
{
  private service: HttpClient<RecordType>;

  constructor() {
    this.service = new HttpClient(
      // process.env.NODE_ENV === 'development'
      //   ? 'http://localhost:8000'
      //   :
      'http://192.168.50.251:8000'
    );
  }

  async getAsync(recordID: number): Promise<RecordType> {
    const { data, error } = await this.service.get(`/record/${recordID}`);
    if (error) {
      throw new Error(`Error getting Record for recordID [${recordID}]`);
    }

    if (!data || data.length == 0){
            throw new Error("Cannot Get Record from piezo sensor service.");
        }

    return data[0];
  }

  async postAsync(values: PostDiagnosisFormProps): Promise<number> {
    const response = await this.service.post('/record', {
      ...pick(values, ['pulseTypeID', 'handPositionID', 'patientName']),
      data: JSON.stringify(values.data),
    });

    return response.data.status;
  }
}

export default new PiezoelectricSensorRecordService();
