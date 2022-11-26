import { CardPainter } from './cards/CardPainter.js';
import { Player } from './player/Player.js';

class App {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private player: Player;
    private cardPainter: CardPainter;

    constructor(canvas: HTMLCanvasElement, numOfPlayer: number) {
        this.canvas = canvas;
        this.context = <CanvasRenderingContext2D> this.canvas.getContext("2d");
        this.player = new Player();
        const midX = (this.canvas.width + 100) / 2;
        const midY = (this.canvas.height / 2);
        this.cardPainter = new CardPainter(numOfPlayer, midX, midY, this.context);
    }

    private createCardPainter(numOfPlayer: number): CardPainter {
        const midX = (this.canvas.width + 100) / 2;
        const midY = (this.canvas.height / 2);
        const result = new CardPainter(numOfPlayer, midX, midY, this.context);
        return result;
    }
    
    draw() {
        this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.cardPainter.drawDeck();
        this.cardPainter.drawHands();
        this.cardPainter.moveCardToHand();
        if (this.player.isMyTurn())
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

const canvas = <HTMLCanvasElement> document.getElementById('pokerCanvas');
const app = new App(canvas, 3);

document.addEventListener('mouseup', (e) => {
    app.mouseUpHandler(e);
}, false);
setInterval(() => {
    app.draw();
}, 10);