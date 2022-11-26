import { Position } from "./HandPosition.js";
export var Suit;
(function (Suit) {
    Suit[Suit["CLOVER"] = 0] = "CLOVER";
    Suit[Suit["HEART"] = 1] = "HEART";
    Suit[Suit["DIAMOND"] = 2] = "DIAMOND";
    Suit[Suit["SPACE"] = 3] = "SPACE";
})(Suit || (Suit = {}));
export class Card {
    constructor(img, midX, midY, suit, value) {
        this.img = img;
        this.position = new Position(midX + 90, midY);
        this.suit = suit;
        this.value = value;
        this.valueImg = new Image();
        this.valueImg.src = "../../assets/club12.png";
    }
    get getPosition() {
        return this.position;
    }
    get x() {
        return this.position.getX;
    }
    get y() {
        return this.position.getY;
    }
    get image() {
        return this.img;
    }
    get valueImage() {
        return this.valueImg;
    }
    changeImage() {
        const temp = this.img;
        this.img = this.valueImage;
        this.valueImg = temp;
    }
    moveCardToOpenPosition() {
        this.position.moveX = 80;
    }
}
