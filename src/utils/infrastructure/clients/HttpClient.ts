interface RequestResultType<T> {
  data?: T;
  error?: Error;
}

interface IHttpClient<T> {
  get: (route: string, params?: any) => Promise<RequestResultType<T[]>>;
  post: (route: string, params?: any) => Promise<RequestResultType<T>>;
}

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
      ...(requestConfigEx || {}),
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

  private validatingResponse(response: Response): void {
    if (!response.ok) {
      throw new Error(
        `Post request respond with status ${response.status} - ${response.statusText}`
      );
    }
  }
}

export default HttpClient;
