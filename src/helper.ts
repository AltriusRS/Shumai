import { Argument } from "./kinds/Argument";
import { App } from "./shumai";

type Container = Array<string | undefined>;

export default function DefaultHelper(application: App, args: Argument[]) {


    let output = `${application.name ? application.name : "Shumai"} - ${application.version ? application.version : application.VERSION}

${application.description ? application.description : "No Description Provided"}

Options:`;

    let processed: Container[] = [];
    let longest = {
        flag: 0,
        name: 0,
        id: 0,
        // description: 0 //unused right now, future implementation.

    }
    for (let argIndex in application.args) {
        let arg = application.args[argIndex];
        if (arg.id && arg.id.length > longest.id) longest.id = arg.id.length;
        processed.push([arg.short, arg.id, "Description Coming Soon"]);
    }

    if (processed.length === 0) {
        output += "No options available.";
    } else {
        for (let index in processed) {
            let [short, long, description] = processed[index];
            output += (`\n  ${padEnd(`-${short},`, longest.flag)} ${padEnd(`--${long}`, longest.id)} -  ${padEnd(`${description}`, longest.flag)}`)
        }
    }

    console.log("\n" + output + "\n\nPowered by Chumai + Bun\n\n")
}


function padEnd(text: string, length: number): string {
    if (text.includes("undefined")) text = "";
    while (text.length < length + 3) {
        text += " ";
    }

    return text;
}