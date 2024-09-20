import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { BorrowBookUseCase } from '../../application/use-cases/borrow-book.use-case';
import { ReturnBookUseCase } from '../../application/use-cases/return-book.use-case';
import { CheckBooksUseCase } from '../../application/use-cases/check-books.use-case';
import { CheckMembersUseCase } from '../../application/use-cases/check-members.use-case';
import { BorrowBookDto } from 'src/application/dtos/borrow-book.dto';
import { ReturnBookDto } from 'src/application/dtos/return-book.dto';

@ApiTags('Library')
@Controller('library')
export class LibraryController {
  constructor(
    private borrowBookUseCase: BorrowBookUseCase,
    private returnBookUseCase: ReturnBookUseCase,
    private checkBooksUseCase: CheckBooksUseCase,
    private checkMembersUseCase: CheckMembersUseCase,
  ) {}

  @Get('books')
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Return all books.' })
  async getAllBooks() {
    return await this.checkBooksUseCase.execute();
  }

  @Get('members')
  @ApiOperation({ summary: 'Get all members' })
  @ApiResponse({
    status: 200,
    description: 'Return all members with their borrowed books count.',
  })
  async getAllMembers() {
    return await this.checkMembersUseCase.execute();
  }

  @Post('borrow')
  @ApiOperation({ summary: 'Borrow a book' })
  @ApiBody({
    type: BorrowBookDto,
    examples: {
      example1: {
        value: {
          memberCode: 'M001',
          bookCode: 'JK-45',
        },
        summary: 'Borrow Harry Potter',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully borrowed.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async borrowBook(@Body() borrowBookDto: BorrowBookDto) {
    try {
      return await this.borrowBookUseCase.execute(
        borrowBookDto.memberCode,
        borrowBookDto.bookCode,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('return')
  @ApiOperation({ summary: 'Return a book' })
  @ApiBody({
    type: ReturnBookDto,
    examples: {
      example1: {
        value: {
          memberCode: 'M001',
          bookCode: 'JK-45',
        },
        summary: 'Return Harry Potter',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully returned.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async returnBook(@Body() returnBookDto: ReturnBookDto) {
    try {
      return await this.returnBookUseCase.execute(
        returnBookDto.memberCode,
        returnBookDto.bookCode,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
