import { Card, Suit } from "./Card.js";
import { HandPosition } from "./HandPosition.js";
export class CardPainter {
    constructor(numOfPlayer, midX, midY, context, backOfCard) {
        this.midX = midX;
        this.midY = midY;
        this.numOfPlayer = numOfPlayer;
        this.handPosition = new HandPosition(numOfPlayer);
        this.context = context;
        this.backOfCard = backOfCard;
        this.cards = this.makeCards();
    }
    makeCards() {
        const result = [];
        for (let i = 0; i < this.numOfPlayer * 2; i++) {
            result.push(new Card(this.backOfCard, this.midX, this.midY, Suit.CLOVER, 13));
        }
        return result;
    }
    flipClickedCard(x, y) {
        this.cards.forEach((value) => {
            if (this.isClicked(value, x, y)) {
                value.changeImage();
                value.moveCardToOpenPosition();
            }
        });
    }
    isClicked(value, x, y) {
        return value.x <= x && x <= value.x + 100 &&
            value.y <= y && y <= value.y + 130;
    }
    moveCardToHand() {
        for (let i = 0; i < this.numOfPlayer * 2; i++) {
            this.moveCard(this.cards[i].getPosition, this.handPosition.getPositionOf(i));
        }
    }
    moveCard(cardPosition, handPosition) {
        cardPosition.moveToTarget(handPosition);
    }
    drawHands() {
        var _a, _b;
        (_a = this.context) === null || _a === void 0 ? void 0 : _a.beginPath();
        this.cards
            .forEach((value) => {
            var _a;
            this.context.rect(value.x, value.y, 100, 130);
            (_a = this.context) === null || _a === void 0 ? void 0 : _a.drawImage(value.image, value.x, value.y, 100, 130);
        });
        (_b = this.context) === null || _b === void 0 ? void 0 : _b.closePath();
    }
    drawDeck() {
        var _a, _b, _c;
        (_a = this.context) === null || _a === void 0 ? void 0 : _a.beginPath();
        for (let i = 0; i < 10; i++) {
            (_b = this.context) === null || _b === void 0 ? void 0 : _b.drawImage(this.backOfCard, this.midX + (i * 10), this.midY, 100, 130);
        }
        (_c = this.context) === null || _c === void 0 ? void 0 : _c.closePath();
    }
    isAllSet() {
        this.cards.forEach((value, index) => {
            if (!value.getPosition
                .isSet(this.handPosition.getPositionOf(index))) {
                return false;
            }
        });
        return true;
    }
}
