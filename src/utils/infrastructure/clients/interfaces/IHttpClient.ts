import { RequestResultType } from "../types/RequestResultType";

export interface IHttpClient {
  get<T>(route?: string, params?: any): Promise<RequestResultType<T>>;
  post<T>(route?: string, params?: any): Promise<RequestResultType<T>>;
}

