
import { Router, Request, Response } from 'express';
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


  private async handleRoutes(): Promise<void> {
    this.children.forEach((child: Route) => {
        this.router[child.method.toLowerCase()](child.path, async (req: Request, res: Response ) => {
          const response = await child.callback(req);
          if(child.json) {
            res.json(response)
          } else if(child.render) {
            res.render(child.render, response as object)
          } else {
            res.send(response)
          }
        });
    });
  }
}
