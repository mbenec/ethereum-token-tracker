import { Expose, Type } from 'class-transformer';
import { TokenPayload } from './token.payload';

export class PairTwoPayload {
    @Expose()
    createdAtTimestamp!: string;

    @Expose()
    @Type(() => TokenPayload)
    token0!: TokenPayload;
}

export class PairListTwoPayload {
    @Expose()
    @Type(() => PairTwoPayload)
    pairs!: PairTwoPayload[];
}

