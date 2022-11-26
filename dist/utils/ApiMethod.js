export class ApiMethod {
    constructor(method) {
        this.validateMethod(method);
        this.method = method;
    }
    validateMethod(method) {
        if (method === "get")
            return;
        else if (method === "post")
            return;
        else if (method === "put")
            return;
        else if (method === "delete")
            return;
        throw new Error("Not Accepted Method");
    }
    get getMethod() {
        return this.method;
    }
}
