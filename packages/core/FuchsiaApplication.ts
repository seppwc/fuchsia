import express, { Application } from 'express';
import { Controller } from '../common/Controller';

interface IFuchsiaApplicationOptions {
  controllers: Controller[];
}

export class FuchsiaApplication {
  app: Application;

  controllers: Controller[];
  constructor(options: IFuchsiaApplicationOptions, public port: number = 8000) {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.controllers = options.controllers;
    this.handle();
  }

  private async handle(): Promise<void> {
    this.controllers.forEach((c) => {
      this.app.use(c.path, c.router);
    });
  }

  public async listen(): Promise<void> {
    this.app.listen(this.port, () => {
      console.log('listening on port ' + this.port);
    });
  }
}
