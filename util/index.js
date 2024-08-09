import fs from 'node:fs';

export const getCodeSnippet = (filePath, lineNumber, context = 0) => {
    const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
    const start = Math.max(lineNumber - context - 1, 0);
    const end = Math.min(lineNumber + context, lines.length);

    return lines.slice(start, end).join('\n');
};

export const formatOutputJsontoHTMLList = (data) => {
    let html = '<!DOCTYPE html>\n';
    html += '<html lang="en">\n';
    html += '<head>\n';
    html += '    <meta charset="utf-8">\n';
    html += '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
    html += '    <title>Formatted Output</title>\n';
    html += '</head>\n';
    html += '<body>\n';
    html += '<ul>\n';
    const rankAuthors = new Map();

    data.forEach(fileData => {
        if (fileData.identifiers.length > 0) {
            html += '    <li>\n';
            html += `        <strong>File:</strong> ${fileData.file}\n`;
            html += '        <ul>\n';
            fileData.identifiers.forEach(identifier => {
                rankAuthors.set(identifier.author, (rankAuthors.get(identifier.author) || 0) + 1);
                html += `            <li><strong>Line:</strong> ${identifier.line} <strong>Snippet:</strong> ${identifier.snippet} <strong>Author:</strong> <span style="background-color: yellow">${identifier.author}</span></li>\n`;
            });
            html += '        </ul>\n';
            html += '    </li>\n';
        }
    });

    html += '</ul>\n';
    const sortedEntries = Array.from(rankAuthors.entries()).sort(([, valueA], [, valueB]) => valueB - valueA);
    const sortedMap = new Map(sortedEntries);

    sortedMap.forEach((value, key) => {
        html += `    <div><strong>Author:</strong> ${key} <strong>Count:</strong> ${value}</div>\n`;
    })
    html += '</body>\n';
    html += '</html>\n';

    return html;
};

