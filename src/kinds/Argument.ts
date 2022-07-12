/**
 * An interface defining the requirements of all Argument prototypes
 */
export interface Argument {
    name?: string;
    description?: string
    shortDescription?: string;
    required: boolean;
    default?: any

    process(input: string[]): any;
}


export interface AdvancedArgument extends Argument {
    onMissing?(callback: Function): any
}