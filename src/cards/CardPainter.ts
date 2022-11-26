import { CardMaker } from './CardMaker';
import { Card, Suit } from "./Card.js";
import { HandPosition, Position } from "./HandPosition.js";

export class CardPainter {
    private cards: Card[];
    private handPosition: HandPosition;
    private numOfPlayer: number;
    private context: CanvasRenderingContext2D;
    private midPosition: Position;

    constructor(numOfPlayer: number, midPosition: Position,
                context: CanvasRenderingContext2D) {
        this.midPosition = midPosition;
        this.numOfPlayer = numOfPlayer;
        this.handPosition = new HandPosition(numOfPlayer);
        this.context = context;
        this.cards = this.makeCards();
    }

    private makeCards(): Card[] {
        const result = [];
        for (let i=0; i<this.numOfPlayer*2; i++) {
            result.push(new Card(
                this.midPosition.getX, this.midPosition.getY,
                Suit.CLOVER, 13));
        }
        return result;
    }

    flipClickedCard(x:number, y:number): void {
        this.cards.forEach((value) => {
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
            this.moveCard(this.cards[i].getPosition,
                        this.handPosition.getPositionOf(i));
        }
    }

    private moveCard(cardPosition: Position, handPosition: Position) {
        cardPosition.moveToTarget(handPosition);
    }

    drawHands() {
        this.context?.beginPath();
        this.cards
            .forEach((value) => {
            this.context.rect(value.x, value.y, 100, 130);
            this.context?.drawImage(value.image, value.x, 
                value.y, 100, 130);
        });
        this.context?.closePath();
    }

    public drawDeck() {
        this.context?.beginPath();
        for (let i=0; i<10; i++) {
            this.context?.drawImage(CardMaker.makeBack(),
                this.midPosition.getX + (i * 10), 
                this.midPosition.getY, 100, 130);
        }
        this.context?.closePath();
    }

    isAllSet(): boolean {
        this.cards.forEach((value, index) => {
            if (!value.getPosition
                .isSet(this.handPosition.getPositionOf(index))) {
                return false;
            }
         });
        return true;
    }
}