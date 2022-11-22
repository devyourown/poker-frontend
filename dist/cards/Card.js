import { Position } from "./HandPosition.js";
export class Card {
    constructor(img, midX, midY) {
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
