export type NodeType = 'Program' | 'NumericLiteral' | 'BinaryExpression' | 'Identifier' | 'CallExpr' | 'UnaryExpr' | 'FunctionDeclaration';

export interface Stmt {
	kind: NodeType;
}

export interface Program extends Stmt {
	kind: 'Program';
	body: Stmt[];
}

export interface Expr extends Stmt {}

export interface BinaryExpression extends Expr {
	kind: 'BinaryExpression';
	operator: string;
	left: Expr;
	right: Expr;
}

export interface Identifier extends Expr {
	kind: 'Identifier';
	symbol: string;
}

export interface NumericLiteral extends Expr {
	kind: 'NumericLiteral';
	value: number;
}
