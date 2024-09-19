export class BookCode {
  constructor(public readonly value: string) {
    if (!value.match(/^[A-Z]{2,3}-\d{1,3}$/)) {
      throw new Error('Invalid book code format');
    }
  }
}
