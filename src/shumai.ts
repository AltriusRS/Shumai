import { Argument } from "./kinds/Argument";
import { getRuntime } from "./runtime";


import Flag from "./kinds/Flag";
import String from "./kinds/String";
import { DefaultOptions, QualifiedOptions, ShumaiOpts, validateOptions } from "./opts";

class Shumai {
    VERSION: string = "0.0.1";
    values: any = {
        __shumai: {
            version: this.VERSION,
            runtime: getRuntime()
        }
    };
    options: QualifiedOptions;

    args: Argument[];

    name?: string;
    version?: string;
    description?: string;


    constructor(args: Argument[] = [], opts: ShumaiOpts = {}) {
        this.options = validateOptions(opts);
        this.args = args;
    };

    parse() {
        if (this.args.length > 0) {
            if (!(this.options.source instanceof Array)) this.options.source = this.options.source.split(" ");
            for (let argId in this.args) {
                let arg = this.args[argId];

                if (arg.name === undefined) console.log(`Argument cannot be processed, no name...`)
                else if (arg.name === "__quarrel") throw new Error("Illegal argument name: '__quarrel', name reserved for internal usages.")
                else {
                    this.values[arg.name] = arg.process(this.options.source)
                }
            }
        }
    }
}

export default {
    Flag,
    String,
    Shumai
}