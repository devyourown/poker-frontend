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

    moveToTarget(target: Position): void {
        if (!this.isInRange(this.x, target.x))
            this.moveX(target.x);
        if (!this.isInRange(this.y, target.y))
            this.moveY(target.y);
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

    private moveX(target: number): void {
        this.x += target > this.x ? this.RANGE : -this.RANGE;
    }

    private moveY(target: number): void {
        this.y += target > this.y ? this.RANGE : -this.RANGE;
    }
}

export class HandPosition {
    positions:Position[] = new Array();

    constructor(numOfPlayer:number) {
        let distance = 0;
        for (let i=0; i<numOfPlayer*2; i++) {
            this.positions.push(new Position(100+(i*50)+distance, 100));
            if (i % 2 == 1)
                distance += 200;
        }
    }

    getPositionOf(index: number) {
        return this.positions[index];
    }
}