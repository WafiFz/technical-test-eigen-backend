import { Test, TestingModule } from '@nestjs/testing';
import { CheckMembersUseCase } from '../check-members.use-case';
import { LibraryService } from '@app/domain/services/library.service';

describe('CheckMembersUseCase', () => {
  let checkMembersUseCase: CheckMembersUseCase;
  let libraryService: jest.Mocked<LibraryService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckMembersUseCase,
        {
          provide: LibraryService,
          useValue: {
            checkMembers: jest.fn(),
          },
        },
      ],
    }).compile();

    checkMembersUseCase = module.get<CheckMembersUseCase>(CheckMembersUseCase);
    libraryService = module.get(LibraryService);
  });

  describe('', () => {
    it('should show all existing members', async () => {
      const expectedMembers = [
        { code: 'M001', name: 'John Doe', borrowedBooks: 0 },
        { code: 'M002', name: 'Jane Smith', borrowedBooks: 0 },
      ];
      libraryService.checkMembers.mockResolvedValue(expectedMembers);

      const result = await checkMembersUseCase.execute();

      expect(result).toEqual(expectedMembers);
    });

    it('should show the number of books being borrowed by each member', async () => {
      const expectedMembers = [
        { code: 'M001', name: 'John Doe', borrowedBooks: 2 },
        { code: 'M002', name: 'Jane Smith', borrowedBooks: 1 },
      ];
      libraryService.checkMembers.mockResolvedValue(expectedMembers);

      const result = await checkMembersUseCase.execute();

      expect(result).toEqual(expectedMembers);
    });
  });
});
