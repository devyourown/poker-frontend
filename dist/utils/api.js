import { Card, Suit } from "../cards/Card.js";
import { Methods } from "./Methods.js";
const API_END_POINT = "localhost:8080";
function request(method, path) {
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
export function requestHands(position) {
    const result = [];
    const data = request(Methods.GET, "game/hands");
    for (const card of data) {
        result.push(new Card(position.getX, position.getY, getSuit(card.suit), card.value));
    }
    return result;
}
export function requestHandsTest(position) {
    const result = [];
    const data = [{ suit: "clover", value: 13 },
        { suit: "heart", value: 12 }];
    for (const card of data) {
        result.push(new Card(position.getX, position.getY, getSuit(card.suit), card.value));
    }
    return result;
}
function getSuit(suit) {
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
