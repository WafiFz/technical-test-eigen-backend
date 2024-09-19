import { Entity, Column, PrimaryColumn } from 'typeorm';
import { BookCode } from '../value-objects/book-code.vo';

@Entity()
export class Book {  
  @PrimaryColumn()
  code: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  stock: number;
}
