import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../../../domain/entities/book.entity';

@Injectable()
export class BookRepository {
  constructor(
    @InjectRepository(Book)
    private readonly repository: Repository<Book>,
  ) {}

  async findByCode(code: string): Promise<Book | null> {
    return this.repository.findOne({ where: { code } });
  }

  async save(book: Book): Promise<Book> {
    return this.repository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return this.repository.find();
  }
}
