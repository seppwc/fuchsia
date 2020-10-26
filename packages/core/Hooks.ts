import { Service, ServiceMethods } from "@fuchsiajs/common";
import { FuchsiaApplication } from "./FuchsiaApplication";
import { Schema } from "@fuchsiajs/orm";
import mongoose from "mongoose";

export const { useService, createModel, useApplication } = (function () {
  let services: Service[];
  // let singletons: any[];
  // let stratagies: any[];
  // let request: any

  return {
    useApplication: function (app: FuchsiaApplication) {
      services = app.services();
      app.router();
      app.listen();
    },
    useService: function (str: string): ServiceMethods {
      return services.find((i) => i.name === str).methods;
    },

    // createService: function(){}, // Transforms either Object or Class to Service Object
    // useRequest: function(){}, // Returns Request
    // createGuard: function(){}, // Transform Object or Class to Stratagy Object
    // useGuard: function(){}, // returns Stratagy
    // createPipe: function(){}, // Transform Object or Class to Stratagy Object
    // usePipe: function(){}, // returns Stratagy
    createModel: function (Schema: () => Schema) {
      // creates a single global instances of Class
      const s = Schema();
      const name = s.getFieldName();
      const model = s.getModel();

      return mongoose.model(name, model);
    },
    // useModel: function(){} // returns the registered singleton instance of class
  };
})();
