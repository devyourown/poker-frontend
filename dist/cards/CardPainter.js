import { Card, Suit } from "./Card.js";
import { Position } from "./Position.js";
export class CardPainter {
    constructor(numOfPlayer, deckPos, context, hands) {
        this.deckPosition = deckPos;
        this.numOfPlayer = numOfPlayer;
        this.backImage = new Image();
        this.backImage.src = "../../assets/back.png";
        this.context = context;
        this.allHands = this.makeOthersCards().concat(hands);
        this.playerHands = hands;
    }
    makeOthersCards() {
        const result = [];
        let distance = 0;
        for (let i = 0; i < (this.numOfPlayer - 1) * 2; i++) {
            result.push(new Card(new Position(100 + (i * 50) + distance, 100), this.deckPosition.getX, this.deckPosition.getY, Suit.NONE, 0));
            if (i % 2 == 1)
                distance += 150;
        }
        return result;
    }
    flipClickedCard(x, y) {
        this.playerHands.forEach((value) => {
            if (this.isClicked(value, x, y)) {
                value.changeImage();
                value.moveCardToOpenPosition();
            }
        });
    }
    isClicked(value, x, y) {
        return value.getCurrentX <= x && x <= value.getCurrentX + 100 &&
            value.getCurrentY <= y && y <= value.getCurrentY + 130;
    }
    moveCardToHand() {
        this.allHands.forEach((value) => {
            this.moveCard(value.getCurrentPosition, value.getTogoPosition);
        });
    }
    moveCard(cardPosition, handPosition) {
        cardPosition.moveToTarget(handPosition);
    }
    drawHands() {
        var _a, _b;
        (_a = this.context) === null || _a === void 0 ? void 0 : _a.beginPath();
        this.allHands.forEach((value) => {
            var _a;
            this.context.rect(value.getCurrentX, value.getCurrentY, 100, 130);
            (_a = this.context) === null || _a === void 0 ? void 0 : _a.drawImage(value.image, value.getCurrentX, value.getCurrentY, 100, 130);
        });
        (_b = this.context) === null || _b === void 0 ? void 0 : _b.closePath();
    }
    drawDeck() {
        var _a, _b, _c;
        (_a = this.context) === null || _a === void 0 ? void 0 : _a.beginPath();
        for (let i = 0; i < 10; i++) {
            (_b = this.context) === null || _b === void 0 ? void 0 : _b.drawImage(this.backImage, this.deckPosition.getX + (i * 10), this.deckPosition.getY, 100, 130);
        }
        (_c = this.context) === null || _c === void 0 ? void 0 : _c.closePath();
    }
    isAllSet() {
        this.allHands.forEach((value) => {
            if (!value.getCurrentPosition
                .isSet(value.getTogoPosition)) {
                return false;
            }
        });
        return true;
    }
}
