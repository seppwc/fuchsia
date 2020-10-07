import { Request } from 'express';

export interface IRouteProps {
  method?: string;
  path?: string;
  callback: (req: Request) => Promise<unknown>;
}

export class Route {
  public method: string;
  public path: string;
  public callback: (req: Request) => Promise<unknown>;

  constructor(public props: IRouteProps) {
    this.method = props.method || 'GET';
    this.path = props.path || '/';
    this.callback = props.callback;
  }
}
