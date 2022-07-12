// Determine runtime environment and use `logWarning` to log warnings, if appropriate.
export function getRuntime(): any {
    if (typeof Bun !== "undefined") return runtimes.BUN;
    if (typeof Deno !== "undefined") {
        logWarning(runtimes.DENO);
        return runtimes.DENO;
    }

    logWarning(runtimes.NODE);
    return runtimes.NODE;
}


const runtimes: any = {
    DENO: ["Deno", ""], // Not Supported
    NODE: ["Node", ""], // Not Tested
    BUN: ["Bun", ""] // Primary Focus
}

function logWarning(runtime: any) {
    if (runtime == runtimes.DENO) {
        if (Deno.isTTY()) {
            console.log(`\x1b[33mWARNING\x1b[0m - Quarrel is not supported in Deno.\nThis library will not work as expected, if at all.`)
        } else {
            console.log(`WARNING - Quarrel is not supported in Deno.\nThis library will not work as expected, if at all.`)
        }
    } else if (runtime == runtimes.NODE) {
        if (process.stdout.isTTY()) {
            console.log(`\x1b[33mWARNING\x1b[0m - Quarrel is not supported in Node.\nThis library will not work as expected, if at all.`)
        } else {
            console.log(`WARNING - Quarrel is not supported in Node.\nThis library will not work as expected, if at all.`)
        }
    }
}