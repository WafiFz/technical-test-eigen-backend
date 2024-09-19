import { Book } from '../entities/book.entity';

export interface BookRepository {
  findByCode(code: string): Promise<Book | null>;
}
