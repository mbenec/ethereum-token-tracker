import { Expose } from 'class-transformer';

export class TokenPayload {
    @Expose()
    id!: string;

    @Expose()
    name!: string;

    @Expose()
    symbol!: string;
}