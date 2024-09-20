import { Test, TestingModule } from '@nestjs/testing';
import { ReturnBookUseCase } from '../return-book.use-case';
import { Borrow } from '../../../domain/entities/borrow.entity';
import { LibraryService } from '@app/domain/services/library.service';

describe('ReturnBookUseCase', () => {
  let returnBookUseCase: ReturnBookUseCase;
  let libraryService: jest.Mocked<LibraryService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReturnBookUseCase,
        {
          provide: LibraryService,
          useValue: {
            returnBook: jest.fn(),
          },
        },
      ],
    }).compile();

    returnBookUseCase = module.get<ReturnBookUseCase>(ReturnBookUseCase);
    libraryService = module.get(LibraryService);
  });

  describe('execute', () => {
    it('should allow a member to return a borrowed book', async () => {
      const memberCode = 'M001';
      const bookCode = 'BK-001';
      const mockBorrow = { returnDate: new Date() } as Borrow;
      libraryService.returnBook.mockResolvedValue(mockBorrow);

      const result = await returnBookUseCase.execute(memberCode, bookCode);
      expect(result).toEqual(mockBorrow);
      expect(libraryService.returnBook).toHaveBeenCalledWith(
        memberCode,
        bookCode,
      );
    });

    it('should throw an error if the book is not borrowed by the member', async () => {
      const memberCode = 'M001';
      const bookCode = 'BK-001';
      libraryService.returnBook.mockRejectedValue(
        new Error('Book not borrowed by this member'),
      );

      await expect(
        returnBookUseCase.execute(memberCode, bookCode),
      ).rejects.toThrow('Book not borrowed by this member');
    });

    it('should handle late returns and potential penalties', async () => {
      const memberCode = 'M001';
      const bookCode = 'BK-001';
      const mockBorrow = {
        returnDate: new Date(),
        isOverdue: () => true,
      } as Borrow;
      libraryService.returnBook.mockResolvedValue(mockBorrow);

      const result = await returnBookUseCase.execute(memberCode, bookCode);
      expect(result).toEqual(mockBorrow);
      expect(result.isOverdue()).toBe(true);
    });
  });
});
