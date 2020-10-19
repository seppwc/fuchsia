
// Future Api Example

// @Service('app')
// class ApplicationService {

//     @Method()
//     GetOne(): string{
//         return 'Hello'
//     }

// }

// const AppService = createService(AppService)

import {User} from './User'


export const service1 = {
    name: 'app', 
    methods: {
        callback1: ()=> "hi app 1",
        callback2: ()=> "hi app 2"
    }
}

export const service2 = {
    name: 'auth', 
    methods: {
        callback1: ()=> "hi auth 1",
        callback2: ()=> "hi auth 2"
    }
}