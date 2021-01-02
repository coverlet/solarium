export interface IRedux {
  app: IApp;
}

export interface IApp {
  cluster: string;
  count: number;
}
