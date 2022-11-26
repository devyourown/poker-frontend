import { CardPainter } from './cards/CardPainter.js';
import { Player } from './player/Player.js';
class App {
    constructor(canvas, numOfPlayer) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.player = new Player();
        const midX = (this.canvas.width + 100) / 2;
        const midY = (this.canvas.height / 2);
        this.cardPainter = new CardPainter(numOfPlayer, midX, midY, this.context);
    }
    createCardPainter(numOfPlayer) {
        const midX = (this.canvas.width + 100) / 2;
        const midY = (this.canvas.height / 2);
        const result = new CardPainter(numOfPlayer, midX, midY, this.context);
        return result;
    }
    draw() {
        var _a;
        (_a = this.context) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.cardPainter.drawDeck();
        this.cardPainter.drawHands();
        this.cardPainter.moveCardToHand();
        if (this.player.isMyTurn())
            this.showTextInput();
    }
    showTextInput() {
        const input = document.getElementById('bet');
        if (input === null)
            return;
        input.style.display = "block";
        input === null || input === void 0 ? void 0 : input.focus();
    }
    mouseUpHandler(e) {
        if (!this.cardPainter.isAllSet())
            return;
        this.cardPainter.flipClickedCard(e.clientX, e.clientY);
    }
}
const canvas = document.getElementById('pokerCanvas');
const app = new App(canvas, 3);
document.addEventListener('mouseup', (e) => {
    app.mouseUpHandler(e);
}, false);
setInterval(() => {
    app.draw();
}, 10);
