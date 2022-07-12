import { Flag, App, String } from "../../src/shumai";

let app = new App()
    .setName("Shumai Test Application")
    .setVersion("0.1.3")
    .setDescription("A testing application designed to flesh out basic API usage of Shumai.");

app.addArg(new Flag("help", "help", "h", false, false));
app.addArg(new Flag("version", "version", "v", false, false));

app.parse();

if (app.values.help) process.exit();