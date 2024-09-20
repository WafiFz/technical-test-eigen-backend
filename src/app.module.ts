import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './infrastructure/database/database.config';
import { LibraryController } from './presentation/controllers/library.controller';
import { LibraryService } from './domain/services/library.service';
import { Book } from './domain/entities/book.entity';
import { Member } from './domain/entities/member.entity';
import { Borrow } from './domain/entities/borrow.entity';
import { BookRepository } from './infrastructure/database/repositories/book.repository';
import { MemberRepository } from './infrastructure/database/repositories/member.repository';
import { BorrowRepository } from './infrastructure/database/repositories/borrow.repository';
import { BorrowBookUseCase } from './application/use-cases/borrow-book.use-case';
import { ReturnBookUseCase } from './application/use-cases/return-book.use-case';
import { CheckBooksUseCase } from './application/use-cases/check-books.use-case';
import { CheckMembersUseCase } from './application/use-cases/check-members.use-case';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(databaseConfig),
    TypeOrmModule.forFeature([
      Book,
      Member,
      Borrow,
    ]),
  ],
  controllers: [LibraryController],
  providers: [
    LibraryService,
    BookRepository,
    MemberRepository,
    BorrowRepository,
    BorrowBookUseCase,
    ReturnBookUseCase,
    CheckBooksUseCase,
    CheckMembersUseCase,
  ],
})
export class AppModule {}
