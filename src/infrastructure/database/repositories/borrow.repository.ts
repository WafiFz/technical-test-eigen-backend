import { Repository } from 'typeorm';
import { Book } from '../../../domain/entities/book.entity';
import { Borrow } from '../../../domain/entities/borrow.entity';
import { Member } from '../../../domain/entities/member.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BorrowRepository {
  constructor(
    @InjectRepository(Borrow)
    private readonly repository: Repository<Borrow>,
  ) {}

  async findByMember(member: Member): Promise<Borrow[]> {
    return this.repository.find({ where: { member }, relations: ['book'] });
  }

  async save(book: Borrow): Promise<Borrow> {
    return this.repository.save(book);
  }

  async findBorrowedBook(member: Member, book: Book): Promise<Borrow | null> {
    return this.repository.findOne({
      where: { member, book, returnDate: null },
      relations: ['book', 'member'],
    });
  }
}
