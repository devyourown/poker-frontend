var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "../../node_modules/axios/index";
const API_END_POINT = "localhost:8080";
export function request(method, path) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        try {
            result = yield axios({
                method: method,
                url: API_END_POINT + "/" + path,
                responseType: 'json',
            });
            if (result.status != 200)
                throw new Error("status is not right");
        }
        catch (e) {
            throw new Error("axios failed");
        }
        return result.data;
    });
}
