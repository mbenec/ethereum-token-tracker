import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { Token } from './entities/token.entity';
import { Logger } from '@nestjs/common';
import { TokenType } from './types/token.type';

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly logger: Logger,
    ) {
        super();
    }

    public createToken(input: TokenType): Token {
        const token = new Token();
        token.id = input.id;
        token.name = input.name;
        token.symbol = input.symbol;
        token.timestamp = new Date(input.timestamp * 1000);
        return token;
    }

    public async insertTokens(tokens: Token[]): Promise<Token[]> {
        this.logger.log('Inserting ' + tokens.length + ' tokens.');
        return this.entityManager.save(tokens);
    }
}
