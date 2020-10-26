import { AbstractModel } from "./Abstract.model.component";
import { StringModelPropsInterface } from "./interface";

export class StringModelComponent extends AbstractModel {
  constructor(
    public props: StringModelPropsInterface,
    public children?: any[]
  ) {
    super(props);
  }
}
