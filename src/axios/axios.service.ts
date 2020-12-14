import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import axios from 'axios';
import { TokenRepository } from '../token/token.repository';

@Injectable()
export class AxiosService {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly tokenRepository: TokenRepository,
        private readonly logger: Logger,
    ) {
    }

    async axiosPost(url: string, data: string): Promise<any> {
        this.logger.log('Axios post on ' + url);
        return axios
            .post(url, data)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                throw new BadRequestException('Could not fetch data!', error);
            });
    }
}
