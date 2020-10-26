import { AbstractModel } from "./Abstract.model.component";
import { AllModelPropsInterface } from "./interface";

export class SchemaModelComponent extends AbstractModel {
  model: {};
  constructor(public props: AllModelPropsInterface, public children: any[]) {
    super(props, children);
    this.model = {};
    this.model[this.name] = {};
    this.getChildProps();
  }

  getChildProps() {
    this.children.forEach((child: AbstractModel) => {
      const childProps = child.getProps();
      const childFieldName = child.getFieldName();

      this.model[this.name][childFieldName] = childProps;
    });
  }

  getModel() {
    return this.model[this.name];
  }
}
