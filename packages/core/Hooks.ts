import {Service, ServiceMethods} from '@fuchsiajs/common'
import {FuchsiaApplication} from './FuchsiaApplication'

export const {useService, useApplication} = (function(){

    let services: Service[]

    return {
        useApplication: function(app: FuchsiaApplication) {
            services =  app.services()
            app.router()
            app.listen()
        },
        useService: function(str: string): ServiceMethods{
            return services.find((i)=> i.name === str).methods
        }
    }

})()



