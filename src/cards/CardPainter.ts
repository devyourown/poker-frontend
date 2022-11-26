import { CardMaker } from './CardMaker.js';
import { Card, Suit } from "./Card.js";
import { HandPosition, Position } from "./HandPosition.js";

export class CardPainter {
    private allHands: Card[];
    private numOfPlayer: number;
    private context: CanvasRenderingContext2D;
    private midPosition: Position;
    private backImage: HTMLImageElement;
    private playerHands: Card[];

    constructor(numOfPlayer: number, midPosition: Position,
                context: CanvasRenderingContext2D, hands: Card[]) {
        this.midPosition = midPosition;
        this.numOfPlayer = numOfPlayer;
        this.backImage = new Image();
        this.backImage.src = "../../assets/back.png";
        this.context = context;
        this.allHands = this.makeOthersCards().concat(hands);
        this.playerHands = hands;
    }

    private makeOthersCards(): Card[] {
        const result = [];
        let distance = 0;
        for (let i=0; i<(this.numOfPlayer-1)*2; i++) {
            result.push(new Card(
                new Position(100+(i*50)+distance, 100),
                this.midPosition.getX, this.midPosition.getY,
                Suit.NONE, 0));
            if (i % 2 == 1)
                distance += 150;
        }
        return result;
    }

    flipClickedCard(x:number, y:number): void {
        this.playerHands.forEach((value) => {
            if (this.isClicked(value, x, y)) {
                value.changeImage();
                value.moveCardToOpenPosition();
            }
        })
    }

    private isClicked(value: Card, x: number, y: number): boolean {
        return value.x <= x && x <= value.x + 100 &&
        value.y <= y && y <= value.y + 130;
    }

    moveCardToHand() {
        for (let i=0; i<this.numOfPlayer*2; i++) {
            this.moveCard(this.allHands[i].getCurrentPosition,
                        this.allHands[i].getTogoPosition);
        }
    }

    private moveCard(cardPosition: Position, handPosition: Position) {
        cardPosition.moveToTarget(handPosition);
    }

    drawHands() {
        this.context?.beginPath();
        this.allHands.forEach((value) => {
            this.context.rect(value.x, value.y, 100, 130);
            this.context?.drawImage(value.image, value.x, 
                value.y, 100, 130);
        });
        this.context?.closePath();
    }

    public drawDeck() {
        this.context?.beginPath();
        for (let i=0; i<10; i++) {
            this.context?.drawImage(this.backImage,
                this.midPosition.getX + (i * 10), 
                this.midPosition.getY, 100, 130);
        }
        this.context?.closePath();
    }

    isAllSet(): boolean {
        this.allHands.forEach((value) => {
            if (!value.getCurrentPosition
                .isSet(value.getTogoPosition)) {
                return false;
            }
         });
        return true;
    }
}