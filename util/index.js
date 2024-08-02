export const getCodeSnippet = (filePath, lineNumber, context = 2) => {
    const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
    const start = Math.max(lineNumber - context - 1, 0);
    const end = Math.min(lineNumber + context, lines.length);

    return lines.slice(start, end).join('\n');
};