export class Player {
    constructor(hands, money) {
        this.hands = hands;
        this.money = money;
    }
    bet(betSize) {
        this.validateBetSize(betSize);
        this.money -= betSize;
    }
    validateBetSize(betSize) {
        if (betSize > this.money)
            throw "betSize is too bigger";
    }
    get getHands() {
        return this.hands;
    }
}
Player.createPosition = 1;
