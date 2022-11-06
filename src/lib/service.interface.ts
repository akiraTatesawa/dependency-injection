export interface ServiceExecute<I, O> {
  execute(data: I): Promise<O>;
}
