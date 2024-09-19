import { Repository } from 'typeorm';
import { Book } from '../../../domain/entities/book.entity';
import { BookRepository as IBookRepository } from '../../../domain/repositories/book.repository.interface';

export class BookRepository
  extends Repository<Book>
  implements IBookRepository
{
  async findByCode(code: string): Promise<Book | null> {
    return this.findOne({ where: { code } });
  }
}
