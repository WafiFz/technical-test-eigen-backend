import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const configModule = ConfigModule.forRoot({
  isGlobal: true,
});

const configService = new ConfigService();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST', 'localhost'),
  port: configService.get('DB_PORT', 5432),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  synchronize: configService.get('DB_SYNCHRONIZE', false),
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
};

export const dataSource = new DataSource(databaseConfig as DataSourceOptions);
