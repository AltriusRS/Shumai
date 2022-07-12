import { AdvancedArgument } from "./Argument";

/**
 * A String argument is a way to convert user input into a string which can be processed by your application.
 * 
 * @example
 * ```ts
 * let file = new String()
 *              .withName("file")
 * ```
 */
export default class String implements AdvancedArgument {
    name: string | undefined;
    id: string | undefined;
    short: string | undefined;
    takes: string = "string"

    constructor() {
    }

    /**
     * Sets the argument name, this is a required method, otherwise the argument will be skipped over.
     * @param name 
     * @returns The updated value of this argument.
     */
    withName(name: string): String {
        this.name = name;
        return this;
    }

    /**
     * Sets the argument id, allowing us to search the input for `--<id>` parameters.
     * @param id 
     * @returns The updated value of this argument.
     */
    withIdentifier(id: string): String {
        this.id = id;
        return this;
    }

    /**
     * Sets the argument id, allowing us to search the input for `-<shortId>` parameters.
     * @param shortId 
     * @returns The updated value of this argument.
     */
    withShortIdentifier(id: string): String {
        this.short = id;
        return this;
    }

    /**
     * Takes an array of strings (split at whitespace), and parses them into the resulting arguments based off of internal values set using the builder methods.
     * @param input
     * @returns A string representing the value of the flag, if present, or `null` if not.
     */
    process(input: string[]): string | null {
        let value = null;
        if (this.id) {
            value = returnValue(input, input.indexOf(`--${this.id}`))
        } else {
            value = returnValue(input, input.indexOf(`--${this.name}`))
        }

        if (this.short && !value) {
            value = returnValue(input, input.indexOf(`-${this.short}`))
        }

        // Not Implemented feature to prompt the user for 
        // an input if it is not provided
        // if (this.onMissing) {
        //     this.onMissing()
        // }
        return value;
    }
}

// takes the input array, and the position the flag was detected at, 
// and uses this information to extract the argument value.
function returnValue(input: string[], position: number): string | null {
    // check if the argument was actually located
    if (position > -1) {
        // pre-set the value to be the index of the flag + 1
        let value = input[position + 1];
        let offset = 2;

        // If the flag contains a double quote, keep on appending the next entry in the
        // array until it either reaches `length` or finds another double quote.
        while (value.split('"').length === 2 && (position + offset) < input.length) {
            value += " " + input[position + offset]
            offset += 1;
        }

        // Strip value of any double quotes and return it in a single string format.
        return value.split('"').join("");
    } else return null;
}