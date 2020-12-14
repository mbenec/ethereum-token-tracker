import { Injectable, Logger } from '@nestjs/common';
import { Token } from './entities/token.entity';
import { plainToClass } from 'class-transformer';
import { PairListTwoPayload } from './types/pair-two.payload';
import { AxiosService } from '../axios/axios.service';
import { ClassValidatorService } from '../validators/class-validator.service';
import { TokenRepository } from './token.repository';
import { PairListOnePayload } from './types/pair-one.payload';

@Injectable()
export class TokenService {
    private readonly API_URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';

    constructor(
        private readonly logger: Logger,
        private readonly axiosService: AxiosService,
        private readonly classValidatorService: ClassValidatorService,
        private readonly tokenRepository: TokenRepository,
    ) {
    }

    public async fetchTokens(url: string, data: string, token0: boolean): Promise<Token[]> {
        const response = await this.axiosService.axiosPost(url, data);
        if (response && response.data && response.data.pairs.length === 0) {
            return [];
        }
        const pairList = token0 ? plainToClass(PairListOnePayload, response.data, { excludeExtraneousValues: true })
            : plainToClass(PairListTwoPayload, response.data, { excludeExtraneousValues: true });
        this.classValidatorService.validatePairsFetchData(pairList);
        return this.getTokenList(pairList);
    }

    public async insertAllTokens(): Promise<number> {
        this.logger.log('Inserting tokens when WETH is token0.');
        const tokenZeroCount = await this.insertTokens(true);

        this.logger.log('Inserting tokens when WETH is token1.');
        const tokenOneCount = await this.insertTokens(false);
        return tokenOneCount + tokenZeroCount;
    }

    public async insertTokens(token0 = true): Promise<number> {
        let skip = 0;
        let lastInsertSize = 1000;
        let count = 0;
        while (lastInsertSize === 1000) {
            const data = token0 ? `{"query":"{ pairs(first:1000, skip:${skip}, where:{ token0:\\"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\\"  }, orderBy:createdAtTimestamp, orderDirection:asc){ token1{ id name symbol } createdAtTimestamp }}","variables":null}`
                : `{"query":"{ pairs(first:1000, skip:${skip}, where:{ token1:\\"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\\"  }, orderBy:createdAtTimestamp, orderDirection:asc){ token0{ id name symbol } createdAtTimestamp }}","variables":null}`;
            const tokens = await this.fetchTokens(this.API_URL, data, token0);
            await this.tokenRepository.insertTokens(tokens);
            lastInsertSize = tokens.length;
            count += tokens.length;
            skip += 1000;
        }
        return count;
    }

    private getTokenList(data: PairListOnePayload | PairListTwoPayload): Token[] {
        if (data instanceof PairListOnePayload) {
            return data.pairs.map(pair => this.tokenRepository.createToken({
                ...pair.token1,
                timestamp: parseInt(pair.createdAtTimestamp)
            }))
        } else {
            return data.pairs.map(pair => this.tokenRepository.createToken({
                ...pair.token0,
                timestamp: parseInt(pair.createdAtTimestamp)
            }))
        }
    }
}
