import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { MemberCode } from '../value-objects/member-code.vo';

@Entity()
export class Member {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;

  @Column({ name: 'is_penalized', default: false })
  isPenalized: boolean;

  @Column({ name: 'penalty_end_date', nullable: true })
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
