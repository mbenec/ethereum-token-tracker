import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmTestConfig } from '../../config/typeorm/test';
import { TokenService } from './token.service';
import { AxiosService } from '../axios/axios.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, EntityManager, QueryRunner } from 'typeorm';
import { INestApplication, Logger } from '@nestjs/common';
import { ClassValidatorService } from '../validators/class-validator.service';
import { TokenRepository } from './token.repository';
import { TokenController } from './token.controller';
import { Token } from './entities/token.entity';

describe('TokenService', () => {
    let app: INestApplication;
    let tokenRepository: TokenRepository;
    let tokenService: TokenService;
    let queryRunner: QueryRunner;
    let entityManager: EntityManager;
    const API_URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRootAsync({
                    useClass: TypeOrmTestConfig,
                }),
            ],
            providers: [
                AxiosService,
                TokenService,
                ClassValidatorService,
                TokenRepository,
                Logger,
            ],
            controllers: [TokenController],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        const dbConnection = moduleFixture.get(Connection);
        const manager = moduleFixture.get(EntityManager);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        queryRunner = manager.queryRunner = dbConnection.createQueryRunner('master');
        tokenService = app.get(TokenService);
        tokenRepository = app.get(TokenRepository);
        entityManager = app.get(EntityManager);

        const token = await tokenRepository.createToken({
            name: 'foo',
            symbol: 'foo',
            id: 'foo',
            timestamp: new Date(1576357912).getTime(),
        });
        const token2 = await tokenRepository.createToken({
            name: 'foo',
            symbol: 'foo',
            id: 'foo2',
            timestamp: new Date(1576357912).getTime(),
        });
        await tokenRepository.insertTokens([token, token2]);
    });

    afterAll(async () => {
        await app.close();
    });

    beforeEach(async () => {
        await queryRunner.startTransaction();
    });

    afterEach(async () => {
        await queryRunner.rollbackTransaction();
    });

    describe('tokenService', () => {
        it('should return token by id', async () => {
            const data = await tokenService.getTokenById('foo');
            expect(data.name).toBe('foo');
        });

        it('should return error if token doesn\'t exist', async () => {
            await expect(tokenService.getTokenById('bar')).rejects.toThrow(Error);
        });

        it('should return tokens by name', async () => {
            const data = await tokenService.getTokensByName('foo');
            expect(data.length).toBe(2);
        });

        it('should return empty list if token name doesn\'t exist', async () => {
            const data = await tokenService.getTokensByName('bar');
            expect(data.length).toBe(0);
        });

        it('should return tokens by symbol', async () => {
            const data = await tokenService.getTokensBySymbol('foo');
            expect(data.length).toBe(2);
        });

        it('should return empty list if token symbol doesn\'t exist', async () => {
            const data = await tokenService.getTokensBySymbol('bar');
            expect(data.length).toBe(0);
        })

        it('should fetch tokens where token0 is weth', async () => {
            const query = await tokenService.getQueryData(true, 0, 25);
            const data = await tokenService.fetchTokens(API_URL, query, true);
            expect(data.length).toBe(25);
        });

        it('should fetch tokens where token1 is weth', async () => {
            const query = await tokenService.getQueryData(false, 0, 25);
            const data = await tokenService.fetchTokens(API_URL, query, false);
            expect(data.length).toBe(25);
        });

        it('should return empty list if there are no tokens', async () => {
            const query = await tokenService.getQueryData(false, 50000, 25);
            const data = await tokenService.fetchTokens(API_URL, query, false);
            expect(data.length).toBe(0);
        });

        it('should populate the database with new tokens', async () => {
            await tokenService.checkForNewTokens();
            const count = await entityManager
                .createQueryBuilder()
                .select('token')
                .from(Token, 'token')
                .getCount()
            expect(count).toBeGreaterThan(100);
        });
    });
});