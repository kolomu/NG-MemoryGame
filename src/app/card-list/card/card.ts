export class Card {
    constructor(
        public frontImage: string,
        public backImage: string,
        public matched?: boolean) {
            this.matched = matched || false;
    }
}
