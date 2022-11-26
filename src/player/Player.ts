import { Card } from "../cards/Card.js";

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
            throw "베팅 사이즈가 너무 현재 가진 돈보다 큽니다.";
    }

    get getHands() {
        return this.hands;
    }
}