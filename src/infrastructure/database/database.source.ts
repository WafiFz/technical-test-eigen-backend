import { DataSource, DataSourceOptions } from 'typeorm';
import { databaseConfig } from './database.config';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

const configService = new ConfigService();
const options = databaseConfig.useFactory(configService);

export const dataSource = new DataSource(options as DataSourceOptions);
