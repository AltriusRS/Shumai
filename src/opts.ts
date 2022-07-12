import DefaultHelper from "./helper";

export interface QualifiedOptions {
    source: string | string[];
    help: Function;

}


// Docs coming soon
export interface ShumaiOpts {
    source?: string | string[];
    help?: Function;
}


export const DefaultOptions: ShumaiOpts = {
    source: process.argv,
    help: DefaultHelper
}


// Converts the user-provided options from the ShumaiOpts format to 
// the QualifiedOptions format, used internally for logic and parsing.
export function validateOptions(opts: ShumaiOpts): QualifiedOptions {
    let final = {
        source: process.argv,
        help: DefaultHelper
    }

    if (opts.source) final.source = opts.source;

    return final;
}