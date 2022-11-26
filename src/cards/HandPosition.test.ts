import { Position } from "./Position";

describe("HandPosition test", () => {
  it("test IsSetFromLess", () => {
    const position = new Position(2, 3);
    const target = new Position(9, 9);
    expect(position.isSet(target)).toBe(false);
    position.moveToTarget(target);
    expect(position.getX).toBe(6);
    expect(position.isSet(target)).toBe(true);
  });

  it("test IsSetFromBigger", () => {
    const position = new Position(15, 15);
    const target = new Position(9, 9);
    expect(position.isSet(target)).toBe(false);
    position.moveToTarget(target);
    expect(position.getX).toBe(11);
    expect(position.isSet(target)).toBe(true);
  });
});
