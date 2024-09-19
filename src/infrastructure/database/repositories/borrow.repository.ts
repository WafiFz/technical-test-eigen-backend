import { Repository } from 'typeorm';
import { Book } from '../../../domain/entities/book.entity';
import { BorrowRepository as IBorrowRepository } from '../../../domain/repositories/borrow.repository.interface';
import { Borrow } from '../../../domain/entities/borrow.entity';
import { Member } from '../../../domain/entities/member.entity';

export class BorrowRepository
  extends Repository<Borrow>
  implements IBorrowRepository
{
  async findByMember(member: Member): Promise<Borrow[]> {
    return this.find({ where: { member }, relations: ['book'] });
  }
}
