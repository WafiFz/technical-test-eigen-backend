import { Borrow } from '../entities/borrow.entity';
import { Member } from '../entities/member.entity';

export interface BorrowRepository {
  findByMember(member: Member): Promise<Borrow[] | null>;
}
