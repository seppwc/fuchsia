import { AbstractModel } from './Abstract.model.component';
import { NumberModelPropsInterface } from './interface';

export class NumberModelComponent extends AbstractModel {
    constructor(public props: NumberModelPropsInterface,public children?: any[]){
        super(props)
    }
}