import { Request } from 'express';
import { HTTP_METHODS } from './constants';

export interface IRouteProps {
  method?: HTTP_METHODS | string;
  path?: string;
  callback: (req: Request) => Promise<unknown>;
}

export class Route {
  public method: HTTP_METHODS | string;
  public path: string;
  public callback: (req: Request) => Promise<unknown>;

  constructor(public props: IRouteProps) {
    this.method = props.method || HTTP_METHODS.GET;
    this.path = props.path || '/';
    this.callback = props.callback;
  }
}
