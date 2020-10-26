import { AbstractModelProps } from "./interface";

export abstract class AbstractModel {
  name: string;
  constructor(public props?: AbstractModelProps, public children?: any[]) {
    this.name = props.name;
  }

  getFieldName(): string {
    return this.name;
  }

  getProps() {
    const { name, ...props } = this.props;
    return props;
  }
}
