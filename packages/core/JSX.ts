export const JSX = (name: any, props: {}, ...children: any[]): any => {
  if (typeof name === 'function' && name.toString().indexOf('class') === 0) {
    return new name(props, children);
  } else {
    return name(props, children);
  }
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      Controller: any;
      Route: any;
    }
  }
}
