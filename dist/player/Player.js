export class Player {
    constructor(hands, money) {
        this.hands = hands;
        this.money = money;
        this.shouldBet = false;
    }
    betTurn() {
        this.shouldBet = true;
    }
    bet(betSize) {
        this.validateBetSize(betSize);
        this.money -= betSize;
        this.shouldBet = false;
    }
    validateBetSize(betSize) {
        if (betSize > this.money)
            throw new Error("betSize is too bigger");
    }
    isMyTurn() {
        return this.shouldBet;
    }
}
Player.createPosition = 1;
