import { Test, TestingModule } from '@nestjs/testing';
import { CheckBooksUseCase } from '../check-books.use-case';
import { LibraryService } from '@app/domain/services/library.service';

describe('CheckBooksUseCase', () => {
  let checkBooksUseCase: CheckBooksUseCase;
  let libraryService: jest.Mocked<LibraryService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckBooksUseCase,
        {
          provide: LibraryService,
          useValue: {
            checkBooks: jest.fn(),
          },
        },
      ],
    }).compile();

    checkBooksUseCase = module.get<CheckBooksUseCase>(CheckBooksUseCase);
    libraryService = module.get(LibraryService);
  });

  describe('execute', () => {
    it('should show all existing books and quantities', async () => {
      const expectedBooks = [
        { code: 'BK-001', title: 'Book 1', stock: 3, author: 'Author 1' },
        { code: 'BK-002', title: 'Book 2', stock: 2, author: 'Author 2' },
      ];
      libraryService.checkBooks.mockResolvedValue(expectedBooks);

      const result = await checkBooksUseCase.execute();

      expect(result).toEqual(expectedBooks);
    });
    it('should not count books that are being borrowed', async () => {
      const expectedBooks = [
        { code: 'BK-001', title: 'Book 1', stock: 1, author: 'Author 1' },
        { code: 'BK-002', title: 'Book 2', stock: 1, author: 'Author 2' },
      ];
      libraryService.checkBooks.mockResolvedValue(expectedBooks);

      const result = await checkBooksUseCase.execute();

      expect(result).toEqual(expectedBooks);
    });  });
});
