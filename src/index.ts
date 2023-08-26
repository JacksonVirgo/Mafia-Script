import { readFileSync } from 'fs';
import { tokenize } from './lexer';

const sourceCode = readFileSync('./src/_code.txt', 'utf-8');
for (const token of tokenize(sourceCode)) {
	console.log(token);
}
