export class Position {
    constructor(x, y) {
        this.RANGE = 4;
        this.x = x;
        this.y = y;
    }
    get getX() {
        return this.x;
    }
    get getY() {
        return this.y;
    }
    set moveX(num) {
        this.x = this.x + num;
    }
    moveToTarget(target) {
        if (!this.isInRange(this.x, target.x))
            this.moveXAsRange(target.x);
        if (!this.isInRange(this.y, target.y))
            this.moveYAsRange(target.y);
    }
    isSet(target) {
        if (!this.isInRange(this.x, target.x))
            return false;
        if (!this.isInRange(this.y, target.y))
            return false;
        return true;
    }
    isInRange(thisOne, target) {
        if (Math.abs(thisOne - target) < this.RANGE)
            return true;
        return false;
    }
    moveXAsRange(target) {
        this.x += target > this.x ? this.RANGE : -this.RANGE;
    }
    moveYAsRange(target) {
        this.y += target > this.y ? this.RANGE : -this.RANGE;
    }
}
export class HandPosition {
    constructor(numOfPlayer) {
        this.positions = new Array();
        let distance = 0;
        for (let i = 0; i < numOfPlayer * 2; i++) {
            this.positions.push(new Position(100 + (i * 50) + distance, 100));
            if (i % 2 == 1)
                distance += 200;
        }
    }
    getPositionOf(index) {
        return this.positions[index];
    }
}
