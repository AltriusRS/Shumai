import { Argument } from "./kinds/Argument";
import { getRuntime } from "./runtime";


import Flag from "./kinds/Flag";
import String from "./kinds/String";
import { QualifiedOptions, ShumaiOpts, validateOptions } from "./opts";


/**
 * The class that makes the magic happen.
 */
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

    /**
     * Application name. Used in help command.
     */
    name?: string;

    /**
     * Application version. Used in help command.
     */
    version?: string;

    /**
     * Application description. Used in help command.
     */
    description?: string;

    /**
     * Initialize a new application, with all of your arguments.
     */
    constructor(args: Argument[] = [], opts: ShumaiOpts = {}) {
        this.options = validateOptions(opts);
        this.args = args;
    };

    /**
     * Using the arguments provided, take the input source and conver it 
     * into values stored in the `values` key
     */
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