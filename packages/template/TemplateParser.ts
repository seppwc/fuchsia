
interface ITemplateOptions {
    delimiters: FuchsiaTemplateDelimiter
}

type FuchsiaTemplateDelimiter = {
    open: string,
    close: string
}

export class TemplateParser {
    private delimiter : FuchsiaTemplateDelimiter
    private regEx: RegExp

    constructor(options?:Partial<ITemplateOptions>) {
      this.delimiter = options.delimiters || { open: "{{", close: "}}" };
      this.regEx = new RegExp(
        `${this.delimiter.open}(.*?)${this.delimiter.close}`,
        "g"
      );

    }
  
    render(template: string, data: any): string {
  
      let output: string = template;
      let result: RegExpExecArray;
  
      while ((result = this.regEx.exec(template))) {
        let [tmp, callback] = result;
  
        let compiledResult = new Function(["return", callback].join(" ")).apply(data)();
  
        if (Array.isArray(compiledResult)) {
          compiledResult = compiledResult.join(" ");
        }
        output = String(output.replace(tmp, compiledResult));
      }
      return output;
    }
  }