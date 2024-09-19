import { Member } from '../entities/member.entity';

export interface MemberRepository {
  findByCode(code: string): Promise<Member | null>;
}
