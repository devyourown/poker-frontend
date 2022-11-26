import axios from "../../node_modules/axios/index";

export class CardMaker {
    static makeHands() {
    }

    static makeBack(): HTMLImageElement {
        const result = new Image();
        result.src = "../../assets/back.png";
        return result;
    }
}