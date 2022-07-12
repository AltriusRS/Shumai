import { describe, expect, it } from "bun:test";

import { TestItem, VERSION } from "./deps";

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

// describe("Shumai.constructor", () => {
//     it("Accepts values for configuration as well as arguments to parse", () => {

//     })
// })