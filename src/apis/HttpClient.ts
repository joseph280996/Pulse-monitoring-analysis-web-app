import { API_ACTION_CONSTANTS } from "../constants/ApiConstants";
import { IHttpClient } from "./interfaces/IHttpClient";
import { RequestResultType } from "./types/HttpClientTypes";

class HttpClient implements IHttpClient {
  private link!: string;

  get url(): string {
    return this.link;
  }

  set url(link: string) {
    this.link = link;
  }

  private controller: AbortController = new AbortController();

  private get abortController(): AbortController {
    return this.controller;
  }

  private set abortController(abortController: AbortController) {
    this.controller = abortController;
  }

  private options: RequestInit = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  };

  private get requestOptions(): RequestInit {
    return this.options;
  }

  private set requestOptions(options: RequestInit) {
    this.options = {
      ...this.options,
      ...options,
    };
  }

  constructor(apiBaseUrl: string, endpoint: string, options?: RequestInit) {
    this.url = `http://${apiBaseUrl}${endpoint}`;
    if (options) this.requestOptions = options;
  }

  async get(route = "", params?: any): Promise<RequestResultType> {
    const options = {
      ...this.requestOptions,
      method: "GET",
      body: params ? JSON.stringify(params) : null,
    };
    try {
      const apiUrl = `${this.url}${route}`;
      const response = await fetch(apiUrl, options);
      this.validateResponse(response, apiUrl, API_ACTION_CONSTANTS.GET);

      const parsedResponse = await response.json();
      return { data: parsedResponse };
    } catch (error) {
      const castedError = error as Error;
      return { error: castedError };
    }
  }

  async post(route = "", params?: any): Promise<RequestResultType> {
    this.abortController = new AbortController();
    const options = {
      ...this.requestOptions,
      signal: this.abortController.signal,
      method: "POST",
      body: params ? JSON.stringify(params) : null,
    };

    try {
      const apiUrl = `${this.url}${route}`;
      const response = await fetch(apiUrl, options);
      setTimeout(() => this.abortController.abort(), 4000);
      this.validateResponse(response, apiUrl, API_ACTION_CONSTANTS.SAVING);

      const parsedResponse = await response.json();
      return { data: parsedResponse };
    } catch (error) {
      const castedError = error as Error;
      return { error: castedError };
    }
  }

  private validateResponse(
    response: Response,
    url: string,
    action: string
  ): void {
    if (response.status !== 200) {
      throw new Error(`Error ${action} Data from ${url}`);
    }
  }
}

export default HttpClient;
