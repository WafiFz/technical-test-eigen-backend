import { Repository } from 'typeorm';
import { Member } from '../../../domain/entities/member.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MemberRepository {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,
  ) {}

  async findByCode(code: string): Promise<Member | null> {
    return await this.repository.findOne({ where: { code } });
  }

  async save(member: Member): Promise<Member> {
    return this.repository.save(member);
  }

  async findAll(): Promise<Member[]> {
    return this.repository.find();
  }
}
