import { Card } from "../cards/Card";

export class Player {
    private hands: Card[];
    private money: number;
    private shouldBet: boolean;
    
    public static createPosition = 1;

    constructor(hands: Card[], money: number) {
        this.hands = hands;
        this.money = money;
        this.shouldBet = false;
    }

    betTurn() {
        this.shouldBet = true;
    }

    bet(betSize: number) {
        this.validateBetSize(betSize);
        this.money -= betSize;
        this.shouldBet = false;
    }

    private validateBetSize(betSize: number) {
        if (betSize > this.money)
            throw new Error("betSize is too bigger");
    }

    isMyTurn(): boolean {
        return this.shouldBet;
    }
}