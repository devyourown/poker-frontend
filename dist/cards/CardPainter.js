import { Card } from "./Card.js";
import { HandPosition } from "./HandPosition.js";
export class CardPainter {
    constructor(numOfPlayer, midX, midY, context, backOfCard) {
        this.midX = midX;
        this.midY = midY;
        this.numOfPlayer = numOfPlayer;
        this.handPosition = new HandPosition(numOfPlayer);
        this.context = context;
        this.backOfCard = backOfCard;
        this.cards = this.makeCards(numOfPlayer);
    }
    makeCards(numOfPlayer) {
        const result = [];
        for (let i = 0; i < numOfPlayer; i++) {
            result.push(new Card(this.backOfCard, this.midX, this.midY));
        }
        return result;
    }
    flipClickedCard(x, y) {
        this.cards.forEach((value) => {
            if (value.getX <= x && x <= value.getX + 100 &&
                value.getY <= y && y <= value.getY + 130) {
                this.flip(value.getImage, value.getX, value.getY);
            }
        });
    }
    flip(img, x, y) {
        this.context.translate(x + img.width, y);
        this.context.scale(-1, 1);
        this.context.drawImage(img, 0, 0);
        this.context.setTransform(1, 0, 0, 1, 0, 0);
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
            this.context.rect(value.getX, value.getY, 100, 130);
            (_a = this.context) === null || _a === void 0 ? void 0 : _a.drawImage(value.getImage, value.getX, value.getY, 100, 130);
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
