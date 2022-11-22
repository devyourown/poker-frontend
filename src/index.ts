import { CardPainter } from './cards/CardPainter.js';

const canvas = <HTMLCanvasElement> document.getElementById('pokerCanvas');
const context = <CanvasRenderingContext2D> canvas.getContext("2d");

const club12Image = new Image();
const backImage = new Image();
preload();
const midX = (canvas.width + 100) / 2;
const midY = (canvas.height / 2);
const cardPainter = new CardPainter(3, midX, midY, context, backImage);

function preload() {
    club12Image.src = "../assets/club12.png";
    backImage.src = "../assets/back.png";
}

function draw() {
    context?.clearRect(0, 0, canvas.width, canvas.height);
    cardPainter.drawDeck();
    cardPainter.drawHands();
    cardPainter.moveCardToHand();
}

document.addEventListener('mouseup', mouseUpHandler, false);

function mouseUpHandler(e: MouseEvent) {
    if (!cardPainter.isAllSet())
        return ;
    cardPainter.flipClickedCard(e.clientX, e.clientY);
}

setInterval(draw, 10);