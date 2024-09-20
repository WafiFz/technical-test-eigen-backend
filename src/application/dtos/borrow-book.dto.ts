import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BorrowBookDto {
  @ApiProperty({ description: 'The unique code of the member', example: 'M001' })
  @IsNotEmpty()
  @IsString()
  memberCode: string;

  @ApiProperty({ description: 'The unique code of the book', example: 'JK-45' })
  @IsNotEmpty()
  @IsString()
  bookCode: string;
}
