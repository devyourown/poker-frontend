import { Card } from "./Card.js";
import { HandPosition, Position } from "./HandPosition.js";

export class CardPainter {
    private cards: Card[];
    private handPosition: HandPosition;
    private numOfPlayer: number;
    private context: CanvasRenderingContext2D;
    private backOfCard: HTMLImageElement;
    private midX;
    private midY;

    constructor(numOfPlayer: number, midX: number, midY: number,
                context: CanvasRenderingContext2D,
                backOfCard: HTMLImageElement) {
        this.midX = midX;
        this.midY = midY;
        this.numOfPlayer = numOfPlayer;
        this.handPosition = new HandPosition(numOfPlayer);
        this.context = context;
        this.backOfCard = backOfCard;
        this.cards = this.makeCards(numOfPlayer);
    }

    private makeCards(numOfPlayer: number): Card[] {
        const result = [];
        for (let i=0; i<numOfPlayer*2; i++) {
            result.push(new Card(this.backOfCard, this.midX, this.midY));
        }
        return result;
    }

    flipClickedCard(x:number, y:number): void {
        this.cards.forEach((value) => {
            if (value.getX <= x && x <= value.getX + 100 &&
                value.getY <= y && y <= value.getY + 130) {
                    this.flip(value.getImage, value.getX, value.getY);
                }
        })
    }

    private flip(img: HTMLImageElement, x: number, y: number) {
        this.context.translate(x+img.width, y);
        this.context.scale(-1, 1);
        this.context.drawImage(img, 0, 0);
        this.context.setTransform(1, 0, 0, 1, 0, 0);
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
            this.context.rect(value.getX, value.getY, 100, 130);
            this.context?.drawImage(value.getImage, value.getX, 
                value.getY, 100, 130);
        });
        this.context?.closePath();
    }

    drawDeck() {
        this.context?.beginPath();
        for (let i=0; i<10; i++) {
            this.context?.drawImage(this.backOfCard, 
                this.midX + (i * 10), 
                this.midY, 100, 130);
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