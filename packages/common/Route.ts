import { Request } from 'express';
import { HTTP } from './constants';

export interface IRouteProps {
  method?: HTTP | string;
  path?: string;
  render?: string | false
  json?: boolean
  callback: (req: Request) => Promise<unknown>;
}

export class Route {
  public method: HTTP | string;
  public path: string;
  public render: string | false;
  public json: boolean
  public callback: (req: Request) => Promise<unknown>;

  constructor(public props: IRouteProps) {
    this.method = props.method || HTTP.GET;
    this.path = props.path || '/';
    this.callback = props.callback;
    this.render = props.render || false;
    this.json = props.json || false;
  }
}
