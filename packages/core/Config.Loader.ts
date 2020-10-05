import { Application } from 'express';
import {
  IConfigOptions,
  IJsonOptions,
  IStaticOptions,
  IUrlEncodedOptions,
} from './interfaces';
import express from 'express';

export class ConfigLoader {
  static async load(
    app: Application,
    options: Partial<IConfigOptions>
  ): Promise<void> {
    options.urlEncoded && ConfigLoader.urlEncoded(app, options.urlEncoded);
    options.json && ConfigLoader.json(app, options.json);
    options.static && ConfigLoader.static(app, options.static);
    // ConfigLoader.set(app, options);
  }

  // private static async set(
  //   app: Application,
  //   options: Partial<IConfigOptions>
  // ) {}

  private static async static(
    app: Application,
    options: Partial<IStaticOptions> | string
  ) {
    if (typeof options === 'string') {
      app.use(express.static(options));
      app.settings.static = options;
    } else {
      const { root, ...rest } = options;
      app.use(express.static(root, rest));
      app.settings.static = options;
    }
  }

  private static async json(
    app: Application,
    options: Partial<IJsonOptions> | boolean
  ) {
    if (typeof options === 'boolean') {
      app.use(express.json());
    } else {
      app.use(express.json(options));
    }
  }

  private static async urlEncoded(
    app: Application,
    options: Partial<IUrlEncodedOptions>
  ) {
    app.use(express.urlencoded({ ...options }));
  }
}
