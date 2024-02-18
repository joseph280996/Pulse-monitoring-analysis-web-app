import { RequestResultType } from "../types/HttpClientTypes";

export interface IHttpClient {
  get(route?: string, params?: any): Promise<RequestResultType>;
  post(route?: string, params?: any): Promise<RequestResultType>;
}

