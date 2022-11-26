import { CardMaker } from './CardMaker.js';
import { Position } from "./HandPosition.js";

export enum Suit {
    CLOVER = "clover",
    HEART = "heart",
    DIAMOND = "diamond",
    SPADE = "spade",
}

export class Card {
    private backImg: HTMLImageElement;
    private position: Position;
    private suit: Suit;
    private value: number;
    private valueImg: HTMLImageElement;
    
    constructor(midX: number, midY: number,
                suit: Suit, value: number) {
        this.backImg = new Image();
        this.backImg.src = "../../assets/back.png";
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