import { Injectable } from '@nestjs/common';
import { LibraryService } from '../../domain/services/library.service';

@Injectable()
export class CheckBooksUseCase {
  constructor(private libraryService: LibraryService) {}

  async execute() {
    return this.libraryService.checkBooks();
  }
}
