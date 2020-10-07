import express, { Application } from 'express';
import { Controller } from '@fuchsiajs/common';
import { ConfigLoader } from './Config.Loader';
import { IConfigOptions } from './interfaces';

interface IFuchsiaApplicationModules {
  controllers: [Controller];
}

export class FuchsiaApplication {
  instance: Application;
  private _settings: Partial<IConfigOptions>;
  controllers: [Controller];
  constructor(
    modules: IFuchsiaApplicationModules,
    public options: Partial<IConfigOptions>,
    public port: number = 8080
  ) {
    this.instance = express();
    this._settings = {
      ...this.instance.settings,

      port: this.port,

      ...options,
    };

    this.controllers = modules.controllers;
    this.loadOptions();

    this.handle();
  }

  public get settings() {
    return this._settings;
  }

  private async loadOptions(): Promise<void> {
    ConfigLoader.load(this.instance, this.options);
  }

  private async handle(): Promise<void> {
    this.controllers.forEach((c) => {
      this.instance.use(c.path, c.router);
    });
  }

  public async listen(): Promise<void> {
    this.instance.listen(this._settings.port, () => {
      console.log('listening on port ' + this._settings.port);
    });
  }
}
