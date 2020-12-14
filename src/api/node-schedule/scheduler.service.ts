import { Injectable } from '@nestjs/common';
import { RecurrenceRule, scheduleJob } from 'node-schedule';
import { TokenService } from '../token/token.service';

@Injectable()
export class ScheduleService {
    constructor(private readonly tokenService: TokenService) {
        this.insertNewTokens();
    }

    insertNewTokens() {
        const rule = new RecurrenceRule();
        rule.second = [0];
        scheduleJob(rule, async () => {
            // eslint-disable-next-line no-console
            console.log('Fetching new tokens.');
            await this.tokenService.insertNewTokens();
        });
    }
}
