import { CardPainter } from './cards/CardPainter.js';
import { Position } from './cards/Position.js';
import { Player } from './player/Player.js';
import { requestHandsTest } from './utils/api.js';
class App {
    constructor(numOfPlayer) {
        this.canvas = document.getElementById('pokerCanvas');
        this.context = this.canvas.getContext("2d");
        this.deckPosition = this.createDeckPosition();
        this.player = new Player(requestHandsTest(this.deckPosition), 1000);
        this.cardPainter = this.createCardPainter(numOfPlayer);
    }
    createDeckPosition() {
        const midX = (this.canvas.width + 100) / 2;
        const midY = (this.canvas.height / 2);
        return new Position(midX, midY);
    }
    createCardPainter(numOfPlayer) {
        const result = new CardPainter(numOfPlayer, this.deckPosition, this.context, this.player.getHands);
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
    submitHandler(e) {
        e.preventDefault();
        console.log("dasd");
        const input = document.getElementById('bet');
        try {
            this.validateBetInput(input.value);
            const betSize = Number(input.value);
            this.player.bet(betSize);
        }
        catch (e) {
            window.alert(e);
            return;
        }
        console.log("yes");
        input.style.display = "none";
    }
    validateBetInput(input) {
        if (isNaN(Number(input)))
            throw "숫자만 입력해 주세요.";
        console.log(Number(input));
    }
}
const app = new App(3);
document.addEventListener('submit', (e) => {
    app.submitHandler(e);
});
document.addEventListener('mouseup', (e) => {
    app.mouseUpHandler(e);
}, false);
setInterval(() => {
    app.draw();
}, 10);
