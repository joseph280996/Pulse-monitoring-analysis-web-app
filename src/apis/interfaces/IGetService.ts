export interface IGetService<TKey, TReturn> {
  getAsync(): Promise<TReturn[]>
  getWithFilterAsync(param: TKey): Promise<TReturn[]>
}
