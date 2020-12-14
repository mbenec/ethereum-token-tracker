export class TokenType {
    timestamp: number;
    id: string;
    symbol: string;
    name: string;

    constructor(token: TokenType) {
        this.id = token.id;
        this.symbol = token.symbol;
        this.name = token.name;
        this.timestamp = token.timestamp;
    }
}
