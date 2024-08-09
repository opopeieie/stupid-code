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
    ignore,
}) => {
    const rootDir = path.resolve(p);
    const files = glob.sync(`${rootDir}/**/*.{js,jsx,ts,tsx}`, { ignore: `${rootDir}/${ignore}` });
    const outputs = [];
    for (const file of files) {
        try {
          const content = fs.readFileSync(file, 'utf-8');
          const ast = parser.parse(content, {
              sourceType,
              plugins: ['typescript', 'jsx', 'decorators'],
          });
          const lines = findIdentifierLines(ast, code);
          const identifiers = [];
          lines.forEach(line => {
              const snippet = getCodeSnippet(file, line);
              let author = 'unknow';
              const blame = execSync(`git blame -L ${line},${line} ${file}`, { cwd: rootDir }).toString();
              const commitHash = blame.split(' ')[0];
              author = execSync(`git log -1 --format="%an <%ae>" ${commitHash}`, { cwd: rootDir }).toString().trim();
              identifiers.push({
                  line,
                  snippet,
                  author
              });
          })
          
          outputs.push({
              file,
              identifiers,
          });
          console.log(`Analyzed ${file}`);
        } catch(err) {
            console.error(`Error analyzing ${file}: ${err.message}`);
        }
    }
    const htmlContent = formatOutputJsontoHTMLList(outputs);

    fs.writeFile(output, htmlContent, (err) => {
        if (err) throw err;
        console.log('HTML file has been generated!');
    });
}

export default run;