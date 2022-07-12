export interface Argument {
    name?: string;
    description?: string
    shortDescription?: string;

    process(input: string[]): any;
}


export interface AdvancedArgument extends Argument {
    onMissing?(callback: Function): any
}