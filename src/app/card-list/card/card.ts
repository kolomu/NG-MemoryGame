export class Card {

  constructor(
    public id: number,
    public frontImage: string,
    public backImage: string,
    public flipped?: boolean,
    public matched?: boolean,
    public amountFlipped?: number) {
    this.matched = matched || false;
    this.flipped = flipped || false;
    this.amountFlipped = amountFlipped || 0;
  }

}
