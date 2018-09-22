export class Card {

  constructor(
        public id: number,
        public frontImage: string,
        public backImage: string,
        public matched?: boolean) {
      this.matched = matched || false;
    }
}
