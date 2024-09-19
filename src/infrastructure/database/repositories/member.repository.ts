import { Repository } from 'typeorm';
import { Member } from '../../../domain/entities/member.entity';
import { MemberRepository as IMemberRepository } from '../../../domain/repositories/member.repository.interface';

export class MemberRepository
  extends Repository<Member>
  implements IMemberRepository
{
  async findByCode(code: string): Promise<Member | null> {
    return await this.findOne({ where: { code } });
  }
}
