import { h, FuchsiaFactory, FuchsiaApplication } from '../src';
import { AppController } from './AppController';
import config from './Fuchsia.config.json';

export const main = async () => {
  const app: FuchsiaApplication = await FuchsiaFactory.create({
    controllers: [<AppController />],
    config,
  });

  await app.listen();
};

main();
