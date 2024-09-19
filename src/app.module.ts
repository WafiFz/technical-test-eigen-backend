import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './infrastructure/database/database.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(databaseConfig),
    TypeOrmModule.forFeature([]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
