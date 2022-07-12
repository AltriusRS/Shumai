import shumai from "../src/shumai";

// Package version, keep in line with package.json, and src/quarrel.ts, 
// otherwise tests will fail;
const VERSION: string = "0.1.2";

// TestItem, used for all static tests (eg: tests which require no input processing)
const TestItem = new shumai.Shumai();

export {
    VERSION,
    TestItem,
    shumai
}

process.env.TEST_PREVENT_EXIT = "true";