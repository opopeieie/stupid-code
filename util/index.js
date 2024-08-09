import fs from 'node:fs';

export const getCodeSnippet = (filePath, lineNumber, context = 0) => {
    const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
    const start = Math.max(lineNumber - context - 1, 0);
    const end = Math.min(lineNumber + context, lines.length);

    return lines.slice(start, end).join('\n');
};

export const formatOutputJsontoHTMLList = (data) => {
    let html = '<ul>\n';

    data.forEach(fileData => {
        if (fileData.identifiers.length > 0) {
            html += `    <li>\n        <strong>File:</strong> ${fileData.file}\n`;
            html += '        <ul>\n';
            fileData.identifiers.forEach(identifier => {
                html += `            <li><strong>Line:</strong> ${identifier.line} <strong>Snippet:</strong> ${identifier.snippet} <strong>Author:</strong> <span style="background-color: yellow">${identifier.author}</span></li>\n`;
            });
            html += '        </ul>\n';
        }
        html += '    </li>\n';
    });

    html += '</ul>\n';
    return html;
};