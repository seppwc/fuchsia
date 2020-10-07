import { JSX, FuchsiaFactory, FuchsiaApplication } from '../packages/core';
import { MongooseAdapter } from '../packages/orm';
import { AppController } from './AppController';

export const main = async () => {
  const app: FuchsiaApplication = await FuchsiaFactory.create({
    controllers: [<AppController />],
    database: {
      adapter: <MongooseAdapter />,
      uri: process.env.DB_URI,
    },
  });

  await app.listen();
};

main();
