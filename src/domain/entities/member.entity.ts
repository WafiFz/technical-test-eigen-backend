import { Entity, Column, PrimaryColumn } from 'typeorm';
import { MemberCode } from '../value-objects/member-code.vo';

@Entity()
export class Member {
  constructor(code: MemberCode, name: string) {
    this.code = code.value;
    this.name = name;
  }

  @PrimaryColumn()
  code: string;

  @Column()
  name: string;

  @Column({ default: false })
  isPenalized: boolean;

  @Column({ nullable: true })
  penaltyEndDate: Date;

  penalize(days: number) {
    this.isPenalized = true;
    this.penaltyEndDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }

  removePenalty() {
    this.isPenalized = false;
    this.penaltyEndDate = null;
  }
}
