# Shumai

An argument management library with some smart abilities!

*A note from the developer: Shumai is an early access package, if you have features you would like to see, please open an issue, I will work to implement all of the features within the scope of this project, and fix issues with current features as I go.*

> This project is only tested and developed for [Bun](https://bun.sh), any support for NodeJS, or Deno is coincidental and not intentional, please do not submit bug reports for those runtimes (at this time). Support for these runtimes is planned, but not in progress at this time.

## Getting Started

To install, firstly ensure you have the [Bun](https://bun.sh) runtime installed on your system. Then, you can use the following command to add to your project.

```sh
bun install shumai
```

> ### **Using WSL?**
>
> One known issue with Bun on WSL is that it fails to install packages due to a "NotSameFilesystem" error, this can be fixed by appending the `install` command with  --backend=copyfile`

## Basic application

### Importing

To import Shumai into your project, simply include the following line to your project.

```ts
import shumai from "shumai";
```

Shumai currently provides two argument types, `Flag`, which returns a boolean value, and `String`, which returns a string value, or `null` if not present.

All of our argument types use "builder patterns" to provide a consistent API across all types.

---

**Example Flag Argument:**

```ts
// Generate a new Flag argument.
let help = new shumai.Flag()
                .withName("help")          // Call it "help"
                .withIdentifier("help")    // make it capture "--help"
                .withShortIdentifier("h"); // make it caputre "-h"
```

This results in a `Flag` argument, which can be passed to the `Shumai Client`, or you can use it completely independant of this library, on your own data inputs.

---

**Example String Argument:**

```ts
// Generate a new String argument.
let file = new shumai.String()
                .withName("file")          // Call it "file"
                .withIdentifier("file")    // make it capture "--file <text>"
                .withShortIdentifier("f"); // make it caputre "-f <text>"
```

This results in a `String` argument

---

In order to process your arguments into something you can use, we can take our example arguments from before, and carry them into the following code.

```ts
// Create our client.
let client = new shumai.Shumai([help, file]);

// Run our arguments through the processor.
client.parse();
```

It is as simple as that, now you can access your command flags using `client.values`, an example of this field can be seen below:

```
bun src/app.ts -- --file "/path/to/file.png" -h
```

would result in

```ts
{
    help: true,
    file: "/path/to/file.png"
}
```

## Roadmap

Here is a list of things that are either unfinished, or desireable. Got a feature you fancy? [Create an issue] to possibly see it added to this list:

| Status | Name | Description |
|:------:|:----:|:-----------:|
| Pending|required arguments|Adds the ability to mark an argument as required, causing Shumai to log the issue to the console and pre-emptively exit the application.|
| Pending|onMissing event|A method which is called on required arguments, if no argument is present, but exiting is undesireable|
| Pending|multi-value argument|An argument kind which takes a command-seperated list of values, and returns them as an array|
| Pending|per-argument event hooks|Adds the ability to implement custom processing logic for just one argument at a time|
