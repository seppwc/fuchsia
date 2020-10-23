import { AbstractModel } from './Abstract.model.component';
import { AllModelPropsInterface } from './interface';

export class ArrayModelComponent extends AbstractModel {
    constructor(public props: AllModelPropsInterface,public children?: any[]){
        super(props)
    }

 
}

