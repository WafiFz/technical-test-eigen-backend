import { Injectable } from '@nestjs/common';
import { LibraryService } from '../../domain/services/library.service';

@Injectable()
export class CheckMembersUseCase {
  constructor(private libraryService: LibraryService) {}

  async execute() {
    return this.libraryService.checkMembers();
  }
}
