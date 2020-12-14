import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmTestConfig implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            autoLoadEntities: true,
            keepConnectionAlive: true,
            type: 'postgres',
            username: 'ethereum',
            password: 'ethereum',
            database: 'ethereum_test',
            host: 'localhost',
            port: 5432,
            entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
            synchronize: true,
            dropSchema: true,
        };
    }
}