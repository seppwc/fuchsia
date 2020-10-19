import express, { Application } from 'express';
import { Controller, Service } from '@fuchsiajs/common';
import { ConfigLoader } from './Config.Loader';
import { IConfigOptions } from './interfaces';

interface IFuchsiaApplicationModules {
  controllers: [()=>Controller];
  services?: Service[]
}

type TemplateRenderer = (filePath: string, options: any, callback: any) => any

export class FuchsiaApplication {
  instance: Application;
  private _settings: Partial<IConfigOptions>;
  private _services: Service[]
  controllers: [()=>Controller];


  constructor(
    modules: IFuchsiaApplicationModules,
    public options: Partial<IConfigOptions>,
    public port: number = 8080
  ) {
    this.instance = express();
    this._settings = {
      ...this.instance.settings,
      port: this.port,
      "view engine" : "html",
      ...options,
      urlEncoded: {
        extended: true,
        ...options.urlEncoded
      },
    };
    this._services = modules.services
    this.controllers = modules.controllers;
    this.loadOptions();
  }

  public get settings() {
    return this._settings;
  }

  public services() {
    return this._services
  }

  
  private async loadOptions(): Promise<void> {
    ConfigLoader.load(this.instance, this.options);
  }

  public async router(): Promise<void> {
    this.controllers.forEach((controller) => {
      const c = controller()
      this.instance.use(c.path, c.router);
    });
  }

  public setTemplateEngine(ext: string, renderer: TemplateRenderer):FuchsiaApplication{
      this.instance.engine(ext, renderer);
      this.instance.set('view engine', ext);
    return this;
  }

  public async listen(): Promise<void> {
    this.instance.listen(this._settings.port, () => {
        console.clear()
        console.log('%cFuchsiaJS Application Started!','color: fuchsia; font-style: italic')
        console.log('-------------------------------')
        console.log('Listening on http://localhost:' + this._settings.port );
      });
  }
}


