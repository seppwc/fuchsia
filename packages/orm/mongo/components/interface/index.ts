// props that are available on all Model Components
export interface AllModelPropsInterface {
  name: string;
  required?: boolean | (() => boolean);
  select?: boolean;
  validate?: () => any;
  get?: () => any;
  set?: () => any;
  alias?: string;
  immutable?: boolean;
  transform?: () => any;

  // index props
  index?: boolean;
  unique?: boolean;
  spare?: boolean;
}

export interface StringModelPropsInterface extends AllModelPropsInterface {
  lowercase?: boolean;
  uppercase?: boolean;
  trim?: boolean;
  match?: string;
  enum?: any[];
  minlength?: number;
  maxlength?: number;
}

export interface NumberModelPropsInterface extends AllModelPropsInterface {
  min?: number;
  max?: number;
  enum?: any[];
}

export interface DateModelPropsInterface extends AllModelPropsInterface {
  min?: Date;
  max?: Date;
}

export type AbstractModelProps =
  | AllModelPropsInterface
  | StringModelPropsInterface
  | NumberModelPropsInterface
  | DateModelPropsInterface;
