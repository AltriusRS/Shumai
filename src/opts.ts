import DefaultHelper from "./helper";

export interface QualifiedOptions {
    source: string | string[];
    help: Function;

}

export interface ShumaiOpts {
    source?: string | string[];
    help?: Function;
}


export const DefaultOptions: ShumaiOpts = {
    source: process.argv,
    help: DefaultHelper
}



export function validateOptions(opts: ShumaiOpts): QualifiedOptions {
    let final = {
        source: process.argv,
        help: DefaultHelper
    }

    if (opts.source) final.source = opts.source;

    return final;
}