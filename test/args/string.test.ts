import { describe, expect, it } from "bun:test";
import { shumai } from "../deps";

let { String, Shumai } = shumai;


describe("String#constructor", () => {
    it("Creates a new empty string argument.", () => {
        expect(new String().name)
            .toBe(undefined);
    })
})

describe("String.withName -> String", () => {
    it("the name for this flag, used to define it's output in 'Shumai.values'", () => {
        let string = new String()
            .withName("test");

        expect(string.name)
            .toBe("test");
    })
})

describe("String.withIdentifier -> String", () => {
    it("the argument identifier to search for (uses name if not set)", () => {
        let string = new String()
            .withName("test")
            .withIdentifier("testArgument");

        expect(string.id)
            .toBe("testArgument");
    })
})

describe("String.withShortIdentifier -> String", () => {
    it("the short argument to search for, if identifier isn't found", () => {
        let string = new String()
            .withName("test")
            .withShortIdentifier("t");

        expect(string.short)
            .toBe("t");
    })
})

describe("String.process (single word)", () => {
    it("returns the value of the argument requested, or null if unavailable", () => {
        let string = new String()
            .withName("test")
            .withIdentifier("testArgument")
            .withShortIdentifier("t");

        let testLong = new Shumai([string], { source: "--testArgument variable" });
        let testShort = new Shumai([string], { source: "-t variable" });
        let testAbsent = new Shumai([string]);

        testLong.parse()
        testShort.parse()
        testAbsent.parse()

        expect(testLong.values.test)
            .toBe("variable")

        expect(testShort.values.test)
            .toBe("variable")

        expect(testAbsent.values.test)
            .toBe(null)
    })
})

describe("String.setRequired -> String", () => {
    it("ensures the argument is required, or optional, depending on it's value", () => {
        let string = new String()
            .withName("test")
            .setRequired(true);
        String
        let string2 = new String()
            .withName("test")

        expect(string.required)
            .toBe(true);

        expect(string2.required)
            .toBe(false);
    })
})

describe("String.setDefault -> String", () => {
    it("sets the default value to return if the argument is not present", () => {
        let string = new String()
            .withName("test")
            .setDefault("default");

        let string2 = new String()
            .withName("test")

        expect(string.default)
            .toBe("default");

        expect(string2.default)
            .toBe(undefined);
    })
})

describe("String.process (double quotes)", () => {
    it("returns the value of the argument requested, or null if unavailable", () => {
        let string = new String()
            .withName("test")
            .withIdentifier("testArgument")
            .withShortIdentifier("t");

        let testLong = new Shumai([string], { source: "--testArgument \"longer variable\"" });
        let testShort = new Shumai([string], { source: "-t \"longer variable\"" });
        let testAbsent = new Shumai([string]);

        testLong.parse()
        testShort.parse()
        testAbsent.parse()

        expect(testLong.values.test)
            .toBe("longer variable")

        expect(testShort.values.test)
            .toBe("longer variable")

        expect(testAbsent.values.test)
            .toBe(null)
    })
})

describe("String.process (double quotes no ending)", () => {
    it("returns the value of the argument requested, or null if unavailable", () => {
        let string = new String()
            .withName("test")
            .withIdentifier("testArgument")
            .withShortIdentifier("t");

        let testLong = new Shumai([string], { source: "--testArgument \"longer variable with no end" });
        let testShort = new Shumai([string], { source: "-t \"longer variable with no end" });
        let testAbsent = new Shumai([string]);

        testLong.parse()
        testShort.parse()
        testAbsent.parse()

        expect(testLong.values.test)
            .toBe("longer variable with no end")

        expect(testShort.values.test)
            .toBe("longer variable with no end")

        expect(testAbsent.values.test)
            .toBe(null)
    })
})


describe("String.process (required no default)", () => {
    it("returns the value of the argument requested, or null if unavailable", () => {
        let string = new String()
            .withName("test")
            .withIdentifier("testArgument")
            .withShortIdentifier("t")
            .setRequired(true);

        let testAbsent = new Shumai([string]);

        console.log("\x1b[32mTHIS TEST SHOULD 'THROW' AN ERROR, BUT NOT EXIT (AND SHOULD PASS)\x1b[0m")

        testAbsent.parse()

        expect(testAbsent.values.test)
            .toBe(null)
    })
})


describe("String.process (required with default)", () => {
    it("returns the value of the argument requested, or null if unavailable", () => {
        let string = new String()
            .withName("test")
            .withIdentifier("testArgument")
            .withShortIdentifier("t")
            .setRequired(true)
            .setDefault("testing");

        let testAbsent = new Shumai([string]);

        testAbsent.parse()

        expect(testAbsent.values.test)
            .toBe("testing")
    })
})