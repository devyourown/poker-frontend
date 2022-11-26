import { Card, Suit } from "./Card.js";
import { Position } from "./Position.js"

export class CardPainter {
    private allHands: Card[];
    private numOfPlayer: number;
    private context: CanvasRenderingContext2D;
    private deckPosition: Position;
    private backImage: HTMLImageElement;
    private playerHands: Card[];

    constructor(numOfPlayer: number, deckPos: Position,
                context: CanvasRenderingContext2D, hands: Card[]) {
        this.deckPosition = deckPos;
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
                this.deckPosition.getX, this.deckPosition.getY,
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
        return value.getCurrentX <= x && x <= value.getCurrentX + 100 &&
        value.getCurrentY <= y && y <= value.getCurrentY + 130;
    }

    moveCardToHand() {
        this.allHands.forEach((value) => {
            this.moveCard(value.getCurrentPosition,
                value.getTogoPosition);
        });
    }

    private moveCard(cardPosition: Position, handPosition: Position) {
        cardPosition.moveToTarget(handPosition);
    }

    drawHands() {
        this.context?.beginPath();
        this.allHands.forEach((value) => {
            this.context.rect(value.getCurrentX, value.getCurrentY, 100, 130);
            this.context?.drawImage(value.image, value.getCurrentX, 
                value.getCurrentY, 100, 130);
        });
        this.context?.closePath();
    }

    public drawDeck() {
        this.context?.beginPath();
        for (let i=0; i<10; i++) {
            this.context?.drawImage(this.backImage,
                this.deckPosition.getX + (i * 10), 
                this.deckPosition.getY, 100, 130);
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