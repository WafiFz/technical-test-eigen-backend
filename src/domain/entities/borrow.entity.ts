import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Book } from './book.entity';
import { Member } from './member.entity';

@Entity()
export class Borrow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'bookCode', referencedColumnName: 'code' })
  book: Book;

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'memberCode', referencedColumnName: 'code' })
  member: Member;

  @Column({ name: 'borrow_date' })
  borrowDate: Date;

  @Column({ name: 'return_date', nullable: true })
  returnDate: Date;

  return() {
    this.returnDate = new Date();
  }

  isOverdue(): boolean {
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    return Date.now() - this.borrowDate.getTime() > sevenDaysInMs;
  }
}
