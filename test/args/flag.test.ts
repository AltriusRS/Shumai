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

describe("Flag.setRequired -> Flag", () => {
    it("ensures the argument is required, or optional, depending on it's value", () => {
        let flag = new Flag()
            .withName("test")
            .setRequired(true);

        let flag2 = new Flag()
            .withName("test")

        expect(flag.required)
            .toBe(true);

        expect(flag2.required)
            .toBe(false);
    })
})

describe("Flag.setDefault -> Flag", () => {
    it("sets the default value to return if the flag is not present", () => {
        let flag = new Flag()
            .withName("test")
            .setDefault(true);

        let flag2 = new Flag()
            .withName("test")

        expect(flag.default)
            .toBe(true);

        expect(flag2.default)
            .toBe(undefined);
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

        testLong.parse()
        testShort.parse()
        testAbsent.parse()

        expect(testLong.values.test)
            .toBe(true)

        expect(testShort.values.test)
            .toBe(true)

        expect(testAbsent.values.test)
            .toBe(false)
    })
})


describe("Flag.process (required) -> Boolean", () => {
    it("returns true if flag is present in input", () => {
        let flag = new Flag()
            .withName("test")
            .withIdentifier("testflag")
            .withShortIdentifier("t")
            .setRequired(true)
            .setDefault(true);
        let testAbsent = new Shumai([flag]);

        testAbsent.parse()

        expect(testAbsent.values.test)
            .toBe(true)
    })
})

describe("Flag.process (required no defualt) -> Boolean", () => {
    it("returns true if flag is present in input", () => {
        let flag = new Flag()
            .withName("test")
            .withIdentifier("testflag")
            .withShortIdentifier("t")
            .setRequired(true)
        let testAbsent = new Shumai([flag]);

        console.log("\x1b[32mTHIS TEST SHOULD 'THROW' AN ERROR, BUT NOT EXIT (AND SHOULD PASS)\x1b[0m")

        testAbsent.parse()

        expect(testAbsent.values.test)
            .toBe(null)
    })
})