import { Injectable } from '@nestjs/common';
import { LibraryService } from '../../domain/services/library.service';

@Injectable()
export class BorrowBookUseCase {
  constructor(private libraryService: LibraryService) {}

  async execute(memberCode: string, bookCode: string) {
    return this.libraryService.borrowBook(memberCode, bookCode);
  }
}
