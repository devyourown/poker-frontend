import { Card } from './cards/Card.js';
import { CardPainter } from './cards/CardPainter.js';
import { Position } from './cards/HandPosition.js';
import { Player } from './player/Player.js';
import { requestHandsTest } from './utils/api.js';

class App {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private player: Player;
    private cardPainter: CardPainter;
    private midPosition: Position;

    constructor(numOfPlayer: number) {
        this.canvas = <HTMLCanvasElement> document.getElementById('pokerCanvas');
        this.context = <CanvasRenderingContext2D> this.canvas.getContext("2d");
        this.midPosition = this.createMidPosition();
        this.player = new Player(requestHandsTest(this.midPosition), 1000);
        this.cardPainter = this.createCardPainter(numOfPlayer);
    }

    private createMidPosition() {
        const midX = (this.canvas.width + 100) / 2;
        const midY = (this.canvas.height / 2);
        return new Position(midX, midY);
    }

    private createCardPainter(numOfPlayer: number): CardPainter {
        const result = new CardPainter(numOfPlayer, 
            this.midPosition, this.context);
        return result;
    }
    
    draw() {
        this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.cardPainter.drawDeck();
        this.cardPainter.drawHands();
        this.cardPainter.moveCardToHand();
        this.showTextInput();
    }

    private showTextInput() {
        const input = document.getElementById('bet');
        
        if (input === null)
            return ;
        input.style.display = "block";
        input?.focus();
    }

    mouseUpHandler(e: MouseEvent) {
        if (!this.cardPainter.isAllSet())
            return ;
        this.cardPainter.flipClickedCard(e.clientX, e.clientY);
    }
}

const app = new App(3);

document.addEventListener('mouseup', (e) => {
    app.mouseUpHandler(e);
}, false);
setInterval(() => {
    app.draw();
}, 10);