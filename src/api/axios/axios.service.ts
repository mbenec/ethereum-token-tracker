import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import axios from 'axios';

@Injectable()
export class AxiosService {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly logger: Logger,
    ) {}

    public async axiosPost(url: string, data: string): Promise<any> {
        this.logger.log('Axios post request on ' + url + ' with data: ' + data);
        return axios
            .post(url, data)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                throw new BadRequestException('Could not fetch data!', error);
            });
    }
}
