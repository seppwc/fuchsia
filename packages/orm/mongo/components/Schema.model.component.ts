import { AbstractModel } from './Abstract.model.component';
import { AllModelPropsInterface } from './interface';

export class SchemaModelComponent extends AbstractModel {
    constructor(public props: AllModelPropsInterface, public children: []){
        super(props, children)
        this.getChildProps()
    }

    getChildProps(){
        this.children.forEach((child: AbstractModel) => {
            child.getProps
        })
    }
}