export enum TokenType {
	// Literal types
	Number,
	Identifier,

	// Keywords
	Let,

	// Grouping + Operators
	BinaryOperator,
	Equals,
	OpenParen,
	CloseParen,

	// Misc
	EoF,
}

const KEYWORDS: Record<string, TokenType> = {
	let: TokenType.Let,
};

export interface Token {
	value: string;
	type: TokenType;
}

function token(value = '', type: TokenType): Token {
	return { value, type };
}

function isAlpha(src: string) {
	return src.toUpperCase() != src.toLowerCase();
}

function isSkippable(str: string) {
	return str == ' ' || str == '\n' || str == '\t';
}

function isInteger(str: string) {
	const c = str.charCodeAt(0);
	const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)];
	return c >= bounds[0] && c <= bounds[1];
}

export function tokenize(sourceCode: string): Token[] {
	const tokens = new Array<Token>();
	const src = sourceCode.split('');

	while (src.length > 0) {
		if (src[0] == '(') {
			tokens.push(token(src.shift(), TokenType.OpenParen));
		} else if (src[0] == ')') {
			tokens.push(token(src.shift(), TokenType.CloseParen));
		} else if (src[0] == '+' || src[0] == '-' || src[0] == '*' || src[0] == '/') {
			tokens.push(token(src.shift(), TokenType.BinaryOperator));
		} else if (src[0] == '=') {
			tokens.push(token(src.shift(), TokenType.Equals));
		} else {
			if (isInteger(src[0])) {
				let num = '';
				while (src.length > 0 && isInteger(src[0])) {
					num += src.shift();
				}

				tokens.push(token(num, TokenType.Number));
			} else if (isAlpha(src[0])) {
				let ident = '';
				while (src.length > 0 && isAlpha(src[0])) {
					ident += src.shift();
				}

				const reserved = KEYWORDS[ident];
				if (reserved) {
					tokens.push(token(ident, reserved));
				} else {
					tokens.push(token(ident, TokenType.Identifier));
				}
			} else if (isSkippable(src[0])) {
				src.shift();
			} else {
				console.error('Unreconized character found in source: ', src[0].charCodeAt(0), src[0]);
				throw Error('Unreconized character found in source: ' + src[0].charCodeAt(0) + ' ' + src[0]);
			}
		}
	}

	tokens.push(token('EndOfTFile', TokenType.EoF));

	return tokens;
}
