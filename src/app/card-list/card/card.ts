export class Card {
  constructor(
    public id: number,
    public frontImage: string,
    public backImage: string,
    public flipped?: boolean,
    public matched?: boolean) {
    this.matched = matched || false;
    this.flipped = flipped || false;
  }
}
