import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BookCode } from '../value-objects/book-code.vo';

@Entity()
export class Book {
  constructor(code: BookCode, title: string, author: string, stock: number) {
    this.code = code.value;
    this.title = title;
    this.author = author;
    this.stock = stock;
  }
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  stock: number;
}
