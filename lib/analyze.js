import parser from '@babel/parser';
import tr from '@babel/traverse';
import path from 'node:path';
import fs from 'node:fs';
import * as glob from 'glob';

const traverse = tr.default;

const findIdentifier = (ast, identifierName) => {
    const identifieres = {lines: []};
    
    traverse(ast, {
      Identifier(path) {
        if (path.node.name === identifierName) {
            const { line } = path.node.loc.start;
            identifieres.lines.push(line);
        }
      }
    });
  
    return identifieres;
  };

const run = ({
    path: p,
    code,
    output,
    sourceType
}) => {
    const files = glob.sync(`${path.resolve(p)}/**/*.{js,jsx,ts,tsx}`);
    const outputs = [];
    for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');
        const ast = parser.parse(content, {
            sourceType,
            plugins: ['typescript', 'jsx'],
        });
        const identifieres = findIdentifier(ast, code);
        outputs.push({
            file,
            lines: identifieres.lines
        })
    }
    console.log(outputs);
}

export default run;