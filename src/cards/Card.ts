import { CardMaker } from './CardMaker.js';
import { Position } from "./HandPosition.js";

export enum Suit {
    CLOVER = "clover",
    HEART = "heart",
    DIAMOND = "diamond",
    SPADE = "spade",
    NONE = "none",
}

export class Card {
    private backImg: HTMLImageElement;
    private togoPosition: Position;
    private currentPosition: Position;
    private suit: Suit;
    private value: number;
    private valueImg: HTMLImageElement;
    
    constructor(togoPosition: Position, midX: number, midY: number,
                suit: Suit, value: number) {
        this.backImg = new Image();
        this.backImg.src = "../../assets/back.png";
        this.togoPosition = togoPosition;
        this.currentPosition = new Position(midX + 90, midY);
        this.suit = suit;
        this.value = value;
        this.valueImg = this.createCardImage(suit, value);
    }

    private createCardImage(suit: Suit, value: number): HTMLImageElement {
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

    get x() {
        return this.currentPosition.getX;
    }

    get y() {
        return this.currentPosition.getY;
    }

    get image() {
        return this.backImg;
    }

    get valueImage() {
        return this.valueImg;
    }
}