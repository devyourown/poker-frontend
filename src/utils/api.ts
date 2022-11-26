import axios, { AxiosResponse } from "../../node_modules/axios/index";
import { Card, Suit } from "../cards/Card.js";
import { Position } from "../cards/HandPosition.js";
import { Methods } from "./Methods.js";

const API_END_POINT = "localhost:8080"

function request(method: Methods, path: string): any {
    axios({
        method: method,
        url: API_END_POINT + "/" + path,
        responseType: 'json',
    }).then(response => {
        if (response.status !== 200)
            throw new Error("status is not right");
        return response.data;
    }).catch(error => {
        throw new Error("axios Error: " + error);
    });
}

interface CardVO {
    suit: string,
    value: number
}

export function requestHands(position: Position): Card[] {
    const result: Card[] = [];
    const data: CardVO[] = request(Methods.GET, "game/hands");
    for (const card of data) {
        result.push(new Card(position.getX, position.getY, getSuit(card.suit), card.value));
    }
    return result;
}

export function requestHandsTest(position: Position): Card[] {
    const result: Card[] = [];
    const data: CardVO[] = [{suit: "clover", value: 13},
                            {suit: "heart", value: 12}];
    for (const card of data) {
        result.push(new Card(position.getX, position.getY, getSuit(card.suit), card.value));
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