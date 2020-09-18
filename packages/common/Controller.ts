import { Router } from 'express';
import { Route } from './Route';

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

  private handleRoutes(): void {
    this.children.forEach((child: Route) => {
      switch (child.method.toLowerCase()) {
        case 'get':
          this.router.get(child.path, child.callback);
          break;
        case 'post':
          this.router.post(child.path, child.callback);
          break;
        case 'put':
          this.router.put(child.path, child.callback);
          break;
        case 'patch':
          this.router.patch(child.path, child.callback);
          break;
        case 'delete':
          this.router.delete(child.path, child.callback);
          break;
        default:
          this.router.all(child.path, child.callback);
      }
    });
  }
}
