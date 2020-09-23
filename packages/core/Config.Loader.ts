import { Application } from 'express';
import { IConfigOptions } from './interfaces';
import express from 'express';

export class ConfigLoader {
  static async load(
    app: Application,
    options: Partial<IConfigOptions>
  ): Promise<void> {
    options.urlEncoded && ConfigLoader.urlEncoded(app, options);
    options.bodyParser && ConfigLoader.bodyParser(app, options);
    options.static && ConfigLoader.static(app, options);
    // ConfigLoader.set();
  }

  //   private static async set(
  //     app: Application,
  //     options: Partial<IConfigOptions>
  //   ) {}

  private static async static(
    app: Application,
    options: Partial<IConfigOptions>
  ) {
    if (typeof options.static === 'string') {
      app.use(express.static(options.static));
    } else {
      for (let i in options.static) {
        app.use(express.static(options.static[i]));
      }
    }
  }

  private static async bodyParser(
    app: Application,
    options: Partial<IConfigOptions>
  ) {
    app.use(express.json(options.bodyParser));
  }

  private static async urlEncoded(
    app: Application,
    options: Partial<IConfigOptions>
  ) {
    app.use(express.urlencoded({ ...options.urlEncoded }));
  }
}
