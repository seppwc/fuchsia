// Future Api Example

// @Service('app')
// class ApplicationService {

//     @Method()
//     GetOne(): string{
//         return 'Hello'
//     }

// }

// const AppService = createService(AppService)

import { User } from "./Model";

export const service1 = {
  name: "app",
  methods: {
    GetOne: async (): Promise<any> => {
      console.log(process.env.NODE_ENV);
      const users = User.find();
      return users;
    },
    GetMany: async (): Promise<any> => "hi app 2",
  },
};

export const service2 = {
  name: "auth",
  methods: {
    GetOne: async (): Promise<any> => "hi auth 1",
    GetMany: async (): Promise<any> => "hi auth 2",
  },
};
