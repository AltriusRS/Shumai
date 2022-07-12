import { describe, expect, it } from "bun:test";
import { shumai } from "../deps";

let { Flag, Shumai } = shumai;


describe("Flag#constructor", () => {
    it("Creates a new empty flag argument.", () => {
        expect(new Flag().name)
            .toBe(undefined);
    })
})

describe("Flag.withName -> Flag", () => {
    it("the name for this argument, used to define it's output in 'Shumai.values'", () => {
        let flag = new Flag()
            .withName("test");

        expect(flag.name)
            .toBe("test");
    })
})

describe("Flag.withIdentifier -> Flag", () => {
    it("the argument identifier to search for (uses name if not set)", () => {
        let flag = new Flag()
            .withName("test")
            .withIdentifier("testflag");

        expect(flag.id)
            .toBe("testflag");
    })
})

describe("Flag.withShortIdentifier -> Flag", () => {
    it("the short argument to search for, if identifier isn't found", () => {
        let flag = new Flag()
            .withName("test")
            .withShortIdentifier("t");

        expect(flag.short)
            .toBe("t");
    })
})

describe("Flag.process -> Boolean", () => {
    it("returns true if flag is present in input", () => {
        let flag = new Flag()
            .withName("test")
            .withIdentifier("testflag")
            .withShortIdentifier("t");

        let testLong = new Shumai([flag], { source: "--testflag" });
        let testShort = new Shumai([flag], { source: "-t" });
        let testAbsent = new Shumai([flag]);

        expect(testLong.values.test)
            .toBe(true)

        expect(testShort.values.test)
            .toBe(true)

        expect(testAbsent.values.test)
            .toBe(false)
    })
})