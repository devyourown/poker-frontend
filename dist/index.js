import { CardPainter } from './cards/CardPainter.js';
import { Position } from './cards/HandPosition.js';
import { Player } from './player/Player.js';
import { requestHandsTest } from './utils/api.js';
class App {
    constructor(numOfPlayer) {
        this.canvas = document.getElementById('pokerCanvas');
        this.context = this.canvas.getContext("2d");
        this.midPosition = this.createMidPosition();
        this.player = new Player(requestHandsTest(this.midPosition), 1000);
        this.cardPainter = this.createCardPainter(numOfPlayer);
    }
    createMidPosition() {
        const midX = (this.canvas.width + 100) / 2;
        const midY = (this.canvas.height / 2);
        return new Position(midX, midY);
    }
    createCardPainter(numOfPlayer) {
        const result = new CardPainter(numOfPlayer, this.midPosition, this.context, this.player.getHands);
        return result;
    }
    draw() {
        var _a;
        (_a = this.context) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.cardPainter.drawDeck();
        this.cardPainter.drawHands();
        this.cardPainter.moveCardToHand();
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
const app = new App(3);
document.addEventListener('mouseup', (e) => {
    app.mouseUpHandler(e);
}, false);
setInterval(() => {
    app.draw();
}, 10);
