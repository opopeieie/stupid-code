import parser from '@babel/parser';
import tr from '@babel/traverse';
import path from 'node:path';
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import { getCodeSnippet, formatOutputJsontoHTMLList } from '../util/index.js';
import * as glob from 'glob';

const traverse = tr.default;

const findIdentifierLines = (ast, identifierName) => {
    const lines = [];
    
    traverse(ast, {
      Identifier(path) {
        if (path.node.name === identifierName) {
            const { line } = path.node.loc.start;
            lines.push(line);
        }
      }
    });
  
    return lines;
  };

const run = ({
    path: p,
    code,
    output,
    sourceType,
    ignore
}) => {
    const files = glob.sync(`${path.resolve(p)}/**/*.{js,jsx,ts,tsx}`, { ignore });
    const outputs = [];
    for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');
        const ast = parser.parse(content, {
            sourceType,
            plugins: ['typescript', 'jsx'],
        });
        const lines = findIdentifierLines(ast, code);
        const identifiers = [];
        lines.forEach(line => {
            const snippet = getCodeSnippet(file, line);
            let author = 'unknow';
            try {
                const blame = execSync(`git blame -L ${line},${line} ${file}`).toString();
                const commitHash = blame.split(' ')[0];
                author = execSync(`git log -1 --format="%an <%ae>" ${commitHash}`).toString().trim();
              } catch (error) {
                console.error(`Error getting blame for line ${line}: ${error.message}`);
              }
            identifiers.push({
                line,
                snippet,
                author
            });
        })
        
        outputs.push({
            file,
            identifiers,
        })
    }
    const htmlContent = formatOutputJsontoHTMLList(outputs);

    fs.writeFile(output, htmlContent, (err) => {
        if (err) throw err;
        console.log('HTML file has been generated!');
    });
}

export default run;