export class Position {
    private x: number;
    private y: number;
    private RANGE = 4;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    
    get getX(): number {
        return this.x;
    }
    
    get getY(): number {
        return this.y;
    }

    set moveX(num: number) {
        this.x = this.x + num;
    }

    moveToTarget(target: Position): void {
        if (!this.isInRange(this.x, target.x))
            this.moveXAsRange(target.x);
        if (!this.isInRange(this.y, target.y))
            this.moveYAsRange(target.y);
    }

    isSet(target: Position): boolean {
        if (!this.isInRange(this.x, target.x))
            return false;
        if (!this.isInRange(this.y, target.y))
            return false;
        return true;
    }

    private isInRange(thisOne: number, target: number): boolean {
        if (Math.abs(thisOne - target) < this.RANGE)
            return true;
        return false;
    }

    private moveXAsRange(target: number): void {
        this.x += target > this.x ? this.RANGE : -this.RANGE;
    }

    private moveYAsRange(target: number): void {
        this.y += target > this.y ? this.RANGE : -this.RANGE;
    }
}