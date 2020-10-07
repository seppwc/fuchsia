import { Request } from 'express';
import { HTTP } from './constants';

export interface IRouteProps {
  method?: HTTP | string;
  path?: string;
  callback: (req: Request) => Promise<unknown>;
}

export class Route {
  public method: HTTP | string;
  public path: string;
  public callback: (req: Request) => Promise<unknown>;

  constructor(public props: IRouteProps) {
    this.method = props.method || HTTP.GET;
    this.path = props.path || '/';
    this.callback = props.callback;
  }
}
