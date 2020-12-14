import { Expose, Type } from 'class-transformer';
import { TokenPayload } from './token.payload';

export class PairOnePayload {
    @Expose()
    createdAtTimestamp!: string;

    @Expose()
    @Type(() => TokenPayload)
    token1!: TokenPayload;
}

export class PairListOnePayload {
    @Expose()
    @Type(() => PairOnePayload)
    pairs!: PairOnePayload[];
}