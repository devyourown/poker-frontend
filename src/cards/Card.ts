import { Position } from "./HandPosition.js";

export enum Suit {
    CLOVER,
    HEART,
    DIAMOND,
    SPACE
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