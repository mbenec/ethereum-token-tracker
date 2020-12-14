import { BadRequestException, Injectable } from '@nestjs/common';
import { PairListOnePayload } from '../token/types/payload/pair-one.payload';
import { PairListTwoPayload } from '../token/types/payload/pair-two.payload';
import { TokenPayload } from '../token/types/payload/token.payload';

@Injectable()
export class ClassValidatorService {

    public validatePairsFetchData(data: PairListOnePayload | PairListTwoPayload): boolean {
        if (data instanceof PairListOnePayload) {
            if (data && data.pairs && !data.pairs.every((pair) =>
                    this.validatePairs(pair.token1, pair.createdAtTimestamp))) {
                throw new BadRequestException("Invalid fetch data.");
            }
        } else {
            if (data && data.pairs && !data.pairs.every((pair) =>
                    this.validatePairs(pair.token0, pair.createdAtTimestamp))) {
                throw new BadRequestException("Invalid fetch data.");
            }
        }
        return true;
    }

    private validatePairs(token: TokenPayload, timestamp: string): boolean {
        // Specifically checking if the value is not null or undefined
        return timestamp != null && this.validateToken(token);
    }

    private validateToken(token: TokenPayload): boolean {
        // Specifically checking if any value is not null or undefined
        return token && token.symbol != null && token.name != null && token.id != null;
    }
}
