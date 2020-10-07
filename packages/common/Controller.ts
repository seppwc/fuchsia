import { Router, Request } from 'express';
import { Route } from './Route';

interface IControllerProps {
  path: string;
}

export class Controller {
  readonly path: string;
  public router: Router;

  constructor(private props: IControllerProps, public children: Route[]) {
    this.router = Router();
    this.path = this.props.path || '/';
    this.handleRoutes();
  }

  private async handleRoutes(): Promise<void> {
    this.children.forEach((child: Route) => {
      switch (child.method.toLowerCase()) {
        case 'get':
          this.router.get(child.path, async (req: Request, res) => {
            const response = await child.callback(req);
            res.send(response);
          });
          break;
        case 'post':
          this.router.post(child.path, async (req: Request, res) => {
            const response = await child.callback(req);
            res.send(response);
          });
          break;
        case 'put':
          this.router.put(child.path, async (req: Request, res) => {
            const response = await child.callback(req);
            res.send(response);
          });
          break;
        case 'patch':
          this.router.patch(child.path, async (req: Request, res) => {
            const response = await child.callback(req);
            res.send(response);
          });
          break;
        case 'delete':
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
