import { Argument } from "./kinds/Argument";
import { getRuntime } from "./runtime";


import Flag from "./kinds/Flag";
import String from "./kinds/String";
import { QualifiedOptions, ShumaiOpts, validateOptions } from "./opts";


/**
 * The class that makes the magic happen.
 */
class App {
    VERSION: string = "0.1.2";
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
     * Takes an argument as its only parameter, and installs it 
     * into the application for display either in the help menu, 
     * or for use by you, the user.
     */
    defineArgument(argument: Argument) {
        this.args.push(argument);
    }

    /**
     * Takes an argument as its only parameter, and installs it 
     * into the application for display either in the help menu, 
     * or for use by you, the user.
     * 
     * Alias for Shumai.
     */
    addArg = this.defineArgument;

    /**
     * Sets the application name shown in the stock help view.
     * @param name 
     * @returns the modified application
     */
    setName(name: string): App {
        this.name = name;
        return this;
    }

    /**
     * Sets the application description shown in the stock help view.
     * @param description 
     * @returns the modified application
     */
    setDescription(description: string): App {
        this.description = description;
        return this;
    }

    /**
     * Sets the application version shown in the stock help view, 
     * and version view.
     * @param version 
     * @returns the modified application
     */
    setVersion(version: string): App {
        this.version = version;
        return this;
    }


    /**
     * Using the arguments provided, take the input source and conver it 
     * into values stored in the `values` key.
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
                    if (arg.name === "help" && this.options.help && this.values.help) {
                        this.options.help(this, this.options.source);
                        process.exit();
                    }
                    if (arg.name === "version" && this.values.version) {
                        console.log(`\n${this.name ? this.name : "Unknown Application"}\nVersion: ${this.version ? this.version : this.VERSION}\n`)
                        process.exit();
                    }
                }
            }
        }
    }
}

export {
    Flag,
    String,
    App
}