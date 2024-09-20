import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from '../../infrastructure/database/repositories/book.repository';
import { MemberRepository } from '../../infrastructure/database/repositories/member.repository';
import { BorrowRepository } from '../../infrastructure/database/repositories/borrow.repository';
import { Book } from '../entities/book.entity';
import { Member } from '../entities/member.entity';
import { Borrow } from '../entities/borrow.entity';

@Injectable()
export class LibraryService {
  constructor(
    private bookRepository: BookRepository,
    private memberRepository: MemberRepository,
    private borrowRepository: BorrowRepository,
  ) {}

  async borrowBook(memberCode: string, bookCode: string): Promise<Borrow> {
    const member = await this.memberRepository.findByCode(memberCode);
    if (!member) {
      throw new Error('Member not found');
    }

    if (member.isPenalized) {
      throw new Error('Member is currently penalized');
    }

    const book = await this.bookRepository.findByCode(bookCode);
    if (!book) {
      throw new Error('Book not found');
    }

    if (book.stock === 0) {
      throw new Error('Book is not available');
    }

    const borrowedBooks = await this.borrowRepository.findByMember(member);
    if (borrowedBooks.length >= 2) {
      throw new Error(
        'Member has already borrowed the maximum number of books',
      );
    }

    book.stock--;
    await this.bookRepository.save(book);

    const borrow = new Borrow();
    borrow.member = member;
    borrow.book = book;
    borrow.borrowDate = new Date();
    return this.borrowRepository.save(borrow);
  }

  async returnBook(memberCode: string, bookCode: string): Promise<Borrow> {
    const member = await this.memberRepository.findByCode(memberCode);
    if (!member) {
      throw new Error('Member not found');
    }

    const book = await this.bookRepository.findByCode(bookCode);
    if (!book) {
      throw new Error('Book not found');
    }

    const borrow = await this.borrowRepository.findBorrowedBook(member, book);

    if (!borrow) {
      throw new Error('Borrow record not found');
    }

    borrow.return();
    book.stock++;
    await this.bookRepository.save(book);

    if (borrow.isOverdue()) {
      member.penalize(3);
      await this.memberRepository.save(member);
    }

    return this.borrowRepository.save(borrow);
  }

  async checkBooks(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }

  async checkMembers(): Promise<any[]> {
    const members = await this.memberRepository.findAll();
    const result = [];

    for (const member of members) {
      const borrowedBooks = await this.borrowRepository.findByMember(member);
      result.push({
        ...member,
        borrowedBooks: borrowedBooks.length,
      });
    }

    return result;
  }
}
