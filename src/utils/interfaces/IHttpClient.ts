import { RequestResultType } from "../types/RequestResultType";

export interface IHttpClient {
  get(route?: string, params?: any): Promise<RequestResultType>;
  post(route?: string, params?: any): Promise<RequestResultType>;
}

