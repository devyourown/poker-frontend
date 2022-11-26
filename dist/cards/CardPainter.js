import { Card, Suit } from "./Card.js";
import { Position } from "./HandPosition.js";
export class CardPainter {
    constructor(numOfPlayer, midPosition, context, hands) {
        this.midPosition = midPosition;
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
            result.push(new Card(new Position(100 + (i * 50) + distance, 100), this.midPosition.getX, this.midPosition.getY, Suit.NONE, 0));
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
        return value.x <= x && x <= value.x + 100 &&
            value.y <= y && y <= value.y + 130;
    }
    moveCardToHand() {
        for (let i = 0; i < this.numOfPlayer * 2; i++) {
            this.moveCard(this.allHands[i].getCurrentPosition, this.allHands[i].getTogoPosition);
        }
    }
    moveCard(cardPosition, handPosition) {
        cardPosition.moveToTarget(handPosition);
    }
    drawHands() {
        var _a, _b;
        (_a = this.context) === null || _a === void 0 ? void 0 : _a.beginPath();
        this.allHands.forEach((value) => {
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
            (_b = this.context) === null || _b === void 0 ? void 0 : _b.drawImage(this.backImage, this.midPosition.getX + (i * 10), this.midPosition.getY, 100, 130);
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
