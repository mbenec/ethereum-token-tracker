import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { Token } from './entities/token.entity';
import { Logger, NotFoundException } from '@nestjs/common';
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

    public async findLatestToken(): Promise<Token> {
        return this.entityManager
            .createQueryBuilder()
            .select("token")
            .from(Token, "token")
            .limit(1)
            .orderBy('token.timestamp', 'DESC')
            .getOneOrFail();
    }

    public async insertTokens(tokens: Token[]): Promise<Token[]> {
        this.logger.log('Inserted ' + tokens.length + ' tokens.');
        return this.entityManager.save(tokens);
    }

    public async findById(id: string): Promise<Token> {
        try {
            return this.entityManager.findOneOrFail(Token, id);
        } catch (e){
            throw new NotFoundException("Token with id " + id + " was not found.");
        }
    }

    public async findByName(name: string): Promise<Token[]> {
        try {
            return this.entityManager.find(Token, { where: { name }});
        } catch (e){
            throw new NotFoundException("Token with name " + name + " was not found.");
        }
    }

    public async findBySymbol(symbol: string): Promise<Token[]> {
        return this.entityManager.find(Token, { where: { symbol }});
    }
}
