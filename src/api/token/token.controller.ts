import {
    Controller,
    Get,
    Param,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { Token } from './entities/token.entity';

@Controller('token')
export class TokenController {
    constructor(private readonly tokenService: TokenService) {}

    @Get('/id/:id')
    findById(@Param('id') id: string): Promise<Token> {
        return this.tokenService.getTokenById(id);
    }

    @Get('/name/:name')
    findByName(@Param('name') name: string): Promise<Token[]> {
        return this.tokenService.getTokensByName(name);
    }

    @Get('/symbol/:symbol')
    findBySymbol(@Param('symbol') symbol: string): Promise<Token[]> {
        return this.tokenService.getTokensBySymbol(symbol);
    }
}
