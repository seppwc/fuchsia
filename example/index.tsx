import { JSX, FuchsiaFactory, FuchsiaApplication, useApplication } from '../packages/core';
import { MongooseAdapter } from '../packages/orm';
import { AppController } from './AppController';
import {TemplateRenderer} from '../packages/template'
import {service1,service2} from './AppServices'


export const main = async () => {
  const app: FuchsiaApplication = await FuchsiaFactory.create({
    controllers: [AppController],
    services: [service1, service2],
    database: {
      adapter: <MongooseAdapter />,
      uri: process.env.DB_URI,
    },
  })
  

  useApplication(app.setTemplateEngine('html', TemplateRenderer))
 
};

main();
