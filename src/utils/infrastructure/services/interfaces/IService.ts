export interface IGetService<TParam, TRequest> {
  getAsync: () => Promise<TRequest>;
  getWithFilterAsync: (param: TParam) => Promise<TRequest>;
}
export interface IPostService<P, R> {
  postAsync: (param: P) => Promise<R>;
}

type IService<P, R> = IGetService<P, R> & IPostService<P, R>;

export default IService;
