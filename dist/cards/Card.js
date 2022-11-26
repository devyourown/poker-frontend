import { Position } from "./Position.js";
export var Suit;
(function (Suit) {
    Suit["CLOVER"] = "clover";
    Suit["HEART"] = "heart";
    Suit["DIAMOND"] = "diamond";
    Suit["SPADE"] = "spade";
    Suit["NONE"] = "none";
})(Suit || (Suit = {}));
export class Card {
    constructor(togoPosition, midX, midY, suit, value) {
        this.backImg = new Image();
        this.backImg.src = "../../assets/back.png";
        this.togoPosition = togoPosition;
        this.currentPosition = new Position(midX + 90, midY);
        this.suit = suit;
        this.value = value;
        this.valueImg = this.createCardImage(suit, value);
    }
    createCardImage(suit, value) {
        if (suit === Suit.NONE)
            return this.backImg;
        const result = new Image();
        result.src = "../../assets/" + suit + "/" + suit + value + ".svg";
        return result;
    }
    changeImage() {
        const temp = this.backImg;
        this.backImg = this.valueImage;
        this.valueImg = temp;
    }
    moveCardToOpenPosition() {
        this.currentPosition.moveX = 80;
    }
    get getTogoPosition() {
        return this.togoPosition;
    }
    get getCurrentPosition() {
        return this.currentPosition;
    }
    get getCurrentX() {
        return this.currentPosition.getX;
    }
    get getCurrentY() {
        return this.currentPosition.getY;
    }
    get image() {
        return this.backImg;
    }
    get valueImage() {
        return this.valueImg;
    }
}
