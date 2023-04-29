import { type IHttpClient } from "./interfaces/IHttpClient";
import { type RequestResultType } from "./types/HttpClientTypes";

class HttpClient<T> implements IHttpClient<T> {
  private readonly DEFAULT_OPTIONS: RequestInit = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  };

  private readonly url!: string;
  private readonly requestOptions: Partial<RequestInit>;
  private readonly abortController!: AbortController;

  constructor(url: string, requestConfigEx?: RequestInit) {
    this.url = url;
    this.requestOptions = {
      ...this.DEFAULT_OPTIONS,
      ...(requestConfigEx ?? {}),
    };
    this.abortController = new AbortController();
  }

  async get(route: string, params?: any): Promise<RequestResultType<T[]>> {
    const options = {
      ...this.requestOptions,
      method: "GET",
      body: params ? JSON.stringify(params) : null,
    };
    try {
      const response = await fetch(`${this.url}${route}`, options);

      this.validatingResponse(response);
      const parsedResponse = await response.json();

      return { data: parsedResponse };
    } catch (error) {
      const castedError = error as Error;
      return { error: castedError };
    }
  }

  async post(route: string, params?: any): Promise<RequestResultType<T>> {
    const options = {
      ...this.requestOptions,
      signal: this.abortController.signal,
      method: "POST",
      body: params ? JSON.stringify(params) : null,
    };
    try {
      const response = await fetch(`${this.url}${route}`, options);
      setTimeout(() => {
        this.abortController.abort();
      }, 4000);

      this.validatingResponse(response);
      const parsedResponse = await response.json();

      return { data: parsedResponse };
    } catch (error) {
      return { error: error as Error };
    }
  }

  constructingQueryParam(queryKey: any): string {
    if (queryKey == null) {
      return "";
    }

    return Object.entries(queryKey).reduce(
      (queryParam: string, [key, value]: [string, any]) => {
        return `${queryParam}&${key}=${this.getQueryKeyValue(value)}`;
      },
      ""
    );
  }

  private getQueryKeyValue(value: any): string {
    if (value instanceof Array) {
      return value.toString();
    }
    return value;
  }

  private validatingResponse(response: Response): void {
    if (!response.ok) {
      throw new Error(
        `Post request respond with status ${response.status} - ${response.statusText}`
      );
    }
  }
}

export default HttpClient;
