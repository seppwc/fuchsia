import { Handler } from 'express';

export interface IRouteProps {
  method: string;
  path: string;
}

export class Route {
  public method: string;
  public path: string;
  public callback: Handler;

  constructor(public props: IRouteProps, public handler: Handler) {
    this.method = props.method || 'get';
    this.path = props.path || '/';
    this.callback = handler;
  }
}
