import { Position } from "./HandPosition.js";
export var Suit;
(function (Suit) {
    Suit["CLOVER"] = "clover";
    Suit["HEART"] = "heart";
    Suit["DIAMOND"] = "diamond";
    Suit["SPADE"] = "spade";
})(Suit || (Suit = {}));
export class Card {
    constructor(midX, midY, suit, value) {
        this.backImg = new Image();
        this.backImg.src = "../../assets/back.png";
        this.position = new Position(midX + 90, midY);
        this.suit = suit;
        this.value = value;
        this.valueImg = this.createCardImage(suit, value);
    }
    createCardImage(suit, value) {
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
        this.position.moveX = 80;
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
        return this.backImg;
    }
    get valueImage() {
        return this.valueImg;
    }
}
