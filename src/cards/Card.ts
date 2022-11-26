import { Position } from "./HandPosition.js";

export enum Suit {
    CLOVER = "clover",
    HEART = "heart",
    DIAMOND = "diamond",
    SPADE = "spade",
}

export class Card {
    private img: HTMLImageElement;
    private position: Position;
    private suit: Suit;
    private value: number;
    private valueImg: HTMLImageElement;
    
    constructor(img: HTMLImageElement, midX: number, midY: number,
                suit: Suit, value: number) {
        this.img = img;
        this.position = new Position(midX + 90, midY);
        this.suit = suit;
        this.value = value;
        this.valueImg = this.createCardImage(suit, value);
    }

    private createCardImage(suit: Suit, value: number): HTMLImageElement {
        const result = new Image();
        result.src = "../../assets/" + suit + "/" + suit + value + ".svg";
        return result;
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