import { Position } from "./HandPosition.js";

export class Card {
    private img: HTMLImageElement;
    private position: Position;
    
    constructor(img: HTMLImageElement, midX: number, midY: number) {
        this.img = img;
        this.position = new Position(midX + 90, midY);
    }

    get getPosition() {
        return this.position;
    }

    get getX() {
        return this.position.getX;
    }

    get getY() {
        return this.position.getY;
    }

    get getImage() {
        return this.img;
    }
}