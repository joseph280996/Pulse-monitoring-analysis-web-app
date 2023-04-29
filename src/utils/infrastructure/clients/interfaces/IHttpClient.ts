import { type RequestResultType } from "../types/HttpClientTypes";

export interface IHttpClient<T> {
  get: (route: string, params?: any) => Promise<RequestResultType<T[]>>;
  post: (route: string, params?: any) => Promise<RequestResultType<T>>;
  constructingQueryParam: (queryKey: any) => string;
}
