import { Card, Suit } from "../cards/Card.js";
import { Position } from "../cards/Position.js";
import { Methods } from "./Methods.js";

const API_END_POINT = "localhost:8080"

function request(method: Methods, path: string): any {
    fetch(API_END_POINT + "/" + path, {
        method: method
    }).then(response => {
        if (response.status !== 200)
            throw new Error("status is not right");
        return response.json();
    }).catch(error => {
        throw new Error("axios Error: " + error);
    });
}

interface CardVO {
    suit: string,
    value: number
}

export function requestHands(deckPos: Position): Card[] {
    const result: Card[] = [];
    const data: CardVO[] = request(Methods.GET, "game/hands");
    let i = 0;
    for (const card of data) {
        result.push(new Card(new Position(500+(i*50), 500), deckPos.getX, deckPos.getY, 
        getSuit(card.suit), card.value));
        i++;
    }
    return result;
}

export function requestHandsTest(deckPos: Position): Card[] {
    const result: Card[] = [];
    const data: CardVO[] = [{suit: "clover", value: 13},
                            {suit: "heart", value: 12}];
    let i = 0;
    for (const card of data) {
        result.push(new Card(new Position(500+(i*50), 500), deckPos.getX, deckPos.getY, 
        getSuit(card.suit), card.value));
        i++;
    }
    return result;
}

function getSuit(suit: string): Suit {
    if (suit === "clover")
        return Suit.CLOVER;
    else if (suit === "heart")
        return Suit.HEART;
    else if (suit === "diamond")
        return Suit.DIAMOND;
    else if (suit === "spade")
        return Suit.SPADE;
    throw new Error("None Suit");
}