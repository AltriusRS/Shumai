import { AdvancedArgument } from "./Argument";

export default class String implements AdvancedArgument {
    name: string | undefined;
    id: string | undefined;
    short: string | undefined;
    takes: string = "string"

    constructor() {
    }

    withName(name: string): String {
        this.name = name;
        return this;
    }

    withIdentifier(id: string): String {
        this.id = id;
        return this;
    }

    withShortIdentifier(id: string): String {
        this.short = id;
        return this;
    }

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

function returnValue(input: string[], position: number): string | null {
    if (position > -1) {
        let value = input[position + 1];
        let offset = 2;
        while (value.split('"').length === 2 && (position + offset) < input.length) {
            value += " " + input[position + offset]
            offset += 1;
        }

        return value.split('"').join("");
    } else return null;
}