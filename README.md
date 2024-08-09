# Stupid Code

`stupid-code` is a tool that helps developers scan and identify code in their projects that they consider to be poorly written or "stupid." 

## Installation

You can install `stupid-code` globally or as a development dependency in your project.

### Global Installation

\`\`\`bash
npm install -g stupid-code
\`\`\`

### Local Installation

\`\`\`bash
npm install --save-dev stupid-code
\`\`\`

## Usage

You can run `stupid-code` using the command line interface.

### Command Line Options

- `-p, --path <name>`: Specify the directory path to scan.
- `-c, --code <code>`: Specify the code snippet to search for.
- `-s, --sourceType <type>`: Specify the JavaScript source type. Defaults to `'module'`.
- `-o, --output <name>`: Specify the output file path. Defaults to `'output.html'`.
- `-i, --ignore <name>`: Specify the ignore pattern. Defaults to `'node_modules/**'`.

### Example Commands

1. **Scan a directory for "stupid" code:**

   \`\`\`bash
   stupidcode -p ./src -c "console.log('debug')"
   \`\`\`

   This command scans the `./src` directory for occurrences of `console.log('debug')`.

2. **Specify the JavaScript source type:**

   \`\`\`bash
   stupidcode -p ./src -c "var x = 1;" -s script
   \`\`\`

   This command scans the `./src` directory for the code `var x = 1;` in files considered as JavaScript scripts.

3. **Output results to a custom file:**

   \`\`\`bash
   stupidcode -p ./src -c "debugger;" -o results.html
   \`\`\`

   This command scans the `./src` directory for occurrences of `debugger;` and writes the output to `results.html`.

4. **Ignore specific patterns:**

   \`\`\`bash
   stupidcode -p ./src -c "eval(" -i "test/**"
   \`\`\`

   This command scans the `./src` directory for occurrences of `eval(` while ignoring files in the `test` directory.

## Repository

You can find the source code and contribute to this project at [GitHub - opopeieie/stupid-code](https://github.com/opopeieie/stupid-code).

