import { pick } from "lodash";
import { type ExportDataFormValuesType } from "../../../components/forms/ExportDataForm/ExportDataFormTypes";
import HttpClient from "../clients/HttpClient";
import { type IPostService } from "./interfaces/IService";

class ExportDataService
  implements IPostService<ExportDataFormValuesType, boolean>
{
  private readonly service: HttpClient<number>;

  constructor() {
    this.service = new HttpClient(
      // process.env.NODE_ENV === 'development'
      //   ? 'http://localhost:8000'
      //   :
      "http://192.168.50.251:8000"
    );
  }

  async postAsync(
    exportDataFormValues: ExportDataFormValuesType
  ): Promise<boolean> {
    await this.service.post("/data", {
      ...pick(exportDataFormValues, ["startDate", "endDate"]),
    });

    return true;
  }
}

export default new ExportDataService();
