import { describe, expect, it } from "bun:test";

import { TestItem, VERSION, shumai } from "./deps";

let { String, Shumai } = shumai

describe("Shumai.values__shumai.version", () => {
    it("stores the package version", () => {
        expect(TestItem.values.__shumai.version)
            .toBe(VERSION);
    })
})

describe("Shumai.values__shumai.runtime", () => {
    it("informs the package which methods to use for processing", () => {
        expect(TestItem.values.__shumai.runtime[0])
            .toBe("Bun");
    })
})

describe("Shumai.constructor", () => {
    it("Accepts values for configuration as well as arguments to parse", () => {
        expect(TestItem.args.length)
            .toBe(0)
    })
})

describe("Shumai.defineArgument", () => {
    it("Accepts values for configuration as well as arguments to parse", () => {
        let arg = new String("testArg", "testArg", "t", true, "eco");

        let bakery = new Shumai();
        expect(bakery.args.length)
            .toBe(0)

        bakery.defineArgument(arg);

        expect(bakery.args.length)
            .toBe(1)
    })
})

describe("Shumai.addArg", () => {
    it("alias for defineArgument", () => {
        let arg = new String("testArg", "testArg", "t", true, "eco");

        let bakery = new Shumai();
        expect(bakery.args.length)
            .toBe(0)

        bakery.addArg(arg);

        expect(bakery.args.length)
            .toBe(1)
    })
})