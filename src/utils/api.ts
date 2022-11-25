import axios, { AxiosResponse } from "../../node_modules/axios/index";
import { ApiMethod } from "./ApiMethod";

const API_END_POINT = "localhost:8080"

export async function request(method: ApiMethod, path: string) {
    let result: AxiosResponse;
    try {
        result = await axios({
            method: method.getMethod,
            url: API_END_POINT + "/" + path,
            responseType: 'json',
        });
        if (result.status != 200)
            throw new Error("status is not right");
    } catch (e) {
        throw new Error("axios failed");
    }
    return result.data;
}