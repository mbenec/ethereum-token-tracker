import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmSeedDevConfig implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            username: 'ethereum',
            password: 'ethereum',
            database: 'ethereum_dev',
            host: 'localhost',
            port: 5432,
            entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
            dropSchema: true,
            synchronize: true,
            logging: false,
        };
    }
}
