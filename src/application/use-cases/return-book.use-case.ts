import { Injectable } from '@nestjs/common';
import { LibraryService } from '../../domain/services/library.service';

@Injectable()
export class ReturnBookUseCase {
  constructor(private libraryService: LibraryService) {}

  async execute(memberCode: string, bookCode: string) {
    return this.libraryService.returnBook(memberCode, bookCode);
  }
}
