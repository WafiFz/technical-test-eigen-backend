import { Test, TestingModule } from '@nestjs/testing';
import { BorrowBookUseCase } from '../borrow-book.use-case';
import { BookRepository } from '../../../infrastructure/database/repositories/book.repository';
import { MemberRepository } from '../../../infrastructure/database/repositories/member.repository';
import { BorrowRepository } from '../../../infrastructure/database/repositories/borrow.repository';
import { Book } from '../../../domain/entities/book.entity';
import { Member } from '../../../domain/entities/member.entity';
import { Borrow } from '../../../domain/entities/borrow.entity';
import { BookCode } from '../../../domain/value-objects/book-code.vo';
import { MemberCode } from '../../../domain/value-objects/member-code.vo';
import { LibraryService } from '@app/domain/services/library.service';

describe('BorrowBookUseCase', () => {
  let borrowBookUseCase: BorrowBookUseCase;
  let bookRepository: jest.Mocked<BookRepository>;
  let memberRepository: jest.Mocked<MemberRepository>;
  let borrowRepository: jest.Mocked<BorrowRepository>;
  let libraryService: jest.Mocked<LibraryService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BorrowBookUseCase,
        {
          provide: LibraryService,
          useValue: {
            borrowBook: jest.fn(),
          },
        },
        {
          provide: BookRepository,
          useValue: {
            findByCode: jest.fn(),
          },
        },
        {
          provide: MemberRepository,
          useValue: {
            findByCode: jest.fn(),
          },
        },
        {
          provide: BorrowRepository,
          useValue: {
            findByMember: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    borrowBookUseCase = module.get<BorrowBookUseCase>(BorrowBookUseCase);
    bookRepository = module.get(BookRepository);
    memberRepository = module.get(MemberRepository);
    borrowRepository = module.get(BorrowRepository);
    libraryService = module.get(LibraryService);
  });

  it('should not allow members to borrow more than 2 books', async () => {
    const member = new Member();
    member.code = 'M001';
    const book = new Book();
    book.code = 'BK-001';

    memberRepository.findByCode.mockResolvedValue(member);
    bookRepository.findByCode.mockResolvedValue(book);
    borrowRepository.findByMember.mockResolvedValue([
      {} as Borrow,
      {} as Borrow,
    ]);
    libraryService.borrowBook.mockRejectedValue(
      new Error('Member cannot borrow more than 2 books'),
    );

    await expect(borrowBookUseCase.execute('M001', 'BK-001')).rejects.toThrow(
      'Member cannot borrow more than 2 books',
    );
  });

  it('should not allow borrowing of books already borrowed by other members', async () => {
    const member = new Member();
    member.code = 'M001';
    const book = new Book();
    book.code = 'BK-001';

    memberRepository.findByCode.mockResolvedValue(member);
    bookRepository.findByCode.mockResolvedValue(book);
    borrowRepository.findByMember.mockResolvedValue([]);
    libraryService.borrowBook.mockRejectedValue(
      new Error('Book is already borrowed'),
    );

    await expect(borrowBookUseCase.execute('M001', 'BK-001')).rejects.toThrow(
      'Book is already borrowed',
    );
  });

  it('should not allow borrowing if member is penalized', async () => {
    const member = new Member();
    member.code = 'M001';
    member.penaltyEndDate = new Date(Date.now() + 86400000); // Penalized for 1 day
    const book = new Book();
    book.code = 'BK-001';

    memberRepository.findByCode.mockResolvedValue(member);
    bookRepository.findByCode.mockResolvedValue(book);
    borrowRepository.findByMember.mockResolvedValue([]);
    libraryService.borrowBook.mockRejectedValue(
      new Error('Member is currently penalized'),
    );

    await expect(borrowBookUseCase.execute('M001', 'BK-001')).rejects.toThrow(
      'Member is currently penalized',
    );
  });

  it('should successfully borrow a book when all conditions are met', async () => {
    const member = new Member();
    member.code = 'M001';
    const book = new Book();
    book.code = 'BK-001';

    memberRepository.findByCode.mockResolvedValue(member);
    bookRepository.findByCode.mockResolvedValue(book);
    borrowRepository.findByMember.mockResolvedValue([]);
    libraryService.borrowBook.mockResolvedValue({} as Borrow);

    await expect(
      borrowBookUseCase.execute('M001', 'BK-001'),
    ).resolves.not.toThrow();
  });
});
