export class MemberCode {
  constructor(public readonly value: string) {
    if (!value.match(/^M\d{3}$/)) {
      throw new Error('Invalid member code format');
    }
  }
}
