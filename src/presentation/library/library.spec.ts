import { Test, TestingModule } from '@nestjs/testing';
import { LibraryController } from './library.controller';
import { BorrowBookUseCase } from '@app/application/use-cases/borrow-book.use-case';
import { ReturnBookUseCase } from '@app/application/use-cases/return-book.use-case';
import { CheckBooksUseCase } from '@app/application/use-cases/check-books.use-case';
import { CheckMembersUseCase } from '@app/application/use-cases/check-members.use-case';
import { Book } from '@app/domain/entities/book.entity';
import { Borrow } from '@app/domain/entities/borrow.entity';
import { Member } from '@app/domain/entities/member.entity';

describe('LibraryController', () => {
  let controller: LibraryController;
  let borrowBookUseCase: BorrowBookUseCase;
  let returnBookUseCase: ReturnBookUseCase;
  let checkBooksUseCase: CheckBooksUseCase;
  let checkMembersUseCase: CheckMembersUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibraryController],
      providers: [
        {
          provide: BorrowBookUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: ReturnBookUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: CheckBooksUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: CheckMembersUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<LibraryController>(LibraryController);
    borrowBookUseCase = module.get<BorrowBookUseCase>(BorrowBookUseCase);
    returnBookUseCase = module.get<ReturnBookUseCase>(ReturnBookUseCase);
    checkBooksUseCase = module.get<CheckBooksUseCase>(CheckBooksUseCase);
    checkMembersUseCase = module.get<CheckMembersUseCase>(CheckMembersUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllBooks', () => {
    it('should return all books', async () => {
      const result: Book[] = [
        {
          code: 'BOOK-001',
          title: 'Sample Book Title',
          author: 'John Doe',
          stock: 5,
        },
      ];

      jest.spyOn(checkBooksUseCase, 'execute').mockResolvedValue(result);

      const resultTest = await controller.getAllBooks();
      expect(resultTest).toBe(result);
    });
  });

  describe('getAllMembers', () => {
    it('should return all members', async () => {
      const result = ['member1', 'member2'];
      jest.spyOn(checkMembersUseCase, 'execute').mockResolvedValue(result);

      expect(await controller.getAllMembers()).toBe(result);
    });
  });

  describe('borrowBook', () => {
    it('should borrow a book successfully', async () => {
      const dto = { memberCode: 'M001', bookCode: 'JK-45' };
      const result: Borrow = {
        id: '1',
        member: { code: 'M001' } as Member,
        book: { code: 'JK-45' } as Book,
        borrowDate: new Date(),
        returnDate: null,
        isOverdue: () => false,
        return: jest.fn(),
      };
      jest.spyOn(borrowBookUseCase, 'execute').mockResolvedValue(result);

      expect(await controller.borrowBook(dto)).toBe(result);
    });

    it('should throw an error if borrowing fails', async () => {
      const dto = { memberCode: 'M001', bookCode: 'JK-45' };
      jest
        .spyOn(borrowBookUseCase, 'execute')
        .mockRejectedValue(new Error('Borrowing failed'));

      await expect(controller.borrowBook(dto)).rejects.toThrow(
        'Borrowing failed',
      );
    });
  });

  describe('returnBook', () => {
    it('should return a book successfully', async () => {
      const dto = { memberCode: 'M001', bookCode: 'JK-45' };
      const result: Borrow = {
        id: '1',
        member: { code: 'M001' } as Member,
        book: { code: 'JK-45' } as Book,
        borrowDate: new Date(),
        returnDate: new Date(),
        isOverdue: () => false,
        return: jest.fn(),
      };
      jest.spyOn(returnBookUseCase, 'execute').mockResolvedValue(result);

      expect(await controller.returnBook(dto)).toBe(result);
    });
    it('should throw an error if returning fails', async () => {
      const dto = { memberCode: 'M001', bookCode: 'JK-45' };
      jest
        .spyOn(returnBookUseCase, 'execute')
        .mockRejectedValue(new Error('Returning failed'));

      await expect(controller.returnBook(dto)).rejects.toThrow(
        'Returning failed',
      );
    });
  });
});
