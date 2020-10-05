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
    const { json, urlEncoded, static: stat, ...rest } = options;
    urlEncoded && (await ConfigLoader.urlEncoded(app, urlEncoded));
    json && (await ConfigLoader.json(app, json));
    stat && (await ConfigLoader.static(app, stat));
    rest && (await ConfigLoader.set(app, rest));
  }

  private static async set(app: Application, options: Partial<IConfigOptions>) {
    for (let i in options) {
      app.set(i, options[i]);
    }
  }

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
