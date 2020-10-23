import {AbstractModelProps} from './interface'

export abstract class AbstractModel {
    name: string
    constructor(public props?: AbstractModelProps, public children?: any[]){
        this.name = props.name
        console.log(props, children)
    }

    getFieldName(): string{
        return this.name
    }

    getProps(){
        return this.props
    }

}