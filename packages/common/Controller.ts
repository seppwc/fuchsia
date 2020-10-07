import { Router, Request } from 'express';
import { Route } from './Route';
import { HTTP } from './constants';

interface IControllerProps {
  path: string;
}

export class Controller {
  readonly path: string;
  public router: Router;

  constructor(private props: IControllerProps, public children: Route[]) {
    this.router = Router();
    this.path = this.props.path;
    this.handleRoutes();
  }

  private async handleRoutes(): Promise<void> {
    this.children.forEach((child: Route) => {
      switch (child.method.toUpperCase()) {
        case HTTP.GET:
          this.router.get(child.path, async (req: Request, res) => {
            const response = await child.callback(req);
            res.send(response);
          });
          break;
        case HTTP.POST:
          this.router.post(child.path, async (req: Request, res) => {
            const response = await child.callback(req);
            res.send(response);
          });
          break;
        case HTTP.PUT:
          this.router.put(child.path, async (req: Request, res) => {
            const response = await child.callback(req);
            res.send(response);
          });
          break;
        case HTTP.PATCH:
          this.router.patch(child.path, async (req: Request, res) => {
            const response = await child.callback(req);
            res.send(response);
          });
          break;
        case HTTP.DELETE:
          this.router.delete(child.path, async (req: Request, res) => {
            const response = await child.callback(req);
            res.send(response);
          });
          break;
        default:
          this.router.all(child.path, async (req: Request, res) => {
            const response = await child.callback(req);
            res.send(response);
          });
      }
    });
  }
}
