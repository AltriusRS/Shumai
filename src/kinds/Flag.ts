import { Argument } from "./Argument";

/**
 * A Flag argument is a way to parse user input into boolean values
 * 
 * @example
 * ```ts
 * let flag = new Flag()
 *              .withName("flag")
 * ```
 */
export default class Flag implements Argument {
    name: string | undefined;
    id: string | undefined;
    short: string | undefined;

    constructor() {
    }


    /**
     * Sets the argument name, this is a required method, otherwise the argument will be skipped over.
     * @param name 
     * @returns The updated value of this argument.
     */
    withName(name: string): Flag {
        this.name = name;
        return this;
    }

    /**
     * Sets the argument id, allowing us to search the input for `--<id>` parameters.
     * @param id 
     * @returns The updated value of this argument.
     */
    withIdentifier(id: string): Flag {
        this.id = id;
        return this;
    }

    /**
     * Sets the argument id, allowing us to search the input for `-<shortId>` parameters.
     * @param shortId 
     * @returns The updated value of this argument.
     */
    withShortIdentifier(shortId: string): Flag {
        this.short = shortId;
        return this;
    }

    /**
     * Takes an array of strings (split at whitespace), and parses them into the resulting arguments based off of internal values set using the builder methods.
     * @param input
     * @returns A boolean representing if the flag is present.
     */
    process(input: string[]): boolean {
        if (this.id) {
            if (input.includes(`--${this.id}`)) return true;
        } else {
            if (input.includes(`--${this.name}`)) return true;
        }

        if (this.short) {
            if (input.includes(`-${this.short}`)) return true;
        }

        return false;
    }
}