import { Card } from "../cards/Card";

export class Player {
    private hands: Card[];
    private money: number;
    
    public static createPosition = 1;

    constructor(hands: Card[], money: number) {
        this.hands = hands;
        this.money = money;
    }

    bet(betSize: number) {
        this.validateBetSize(betSize);
        this.money -= betSize;
    }

    private validateBetSize(betSize: number) {
        if (betSize > this.money)
            throw new Error("betSize is too bigger");
    }

    get getHands() {
        return this.hands;
    }
}