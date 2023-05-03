export interface IPostService<TParam, TReturn> {
  postAsync(param: TParam): TReturn
}
