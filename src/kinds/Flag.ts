import { Argument } from "./Argument";

export default class Flag implements Argument {
    name: string | undefined;
    id: string | undefined;
    short: string | undefined;

    constructor() {
    }

    withName(name: string): Flag {
        this.name = name;
        return this;
    }

    withIdentifier(id: string): Flag {
        this.id = id;
        return this;
    }

    withShortIdentifier(id: string): Flag {
        this.short = id;
        return this;
    }

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