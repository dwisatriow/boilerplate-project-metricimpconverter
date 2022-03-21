const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("read a whole number input", function () {
    const input = "2km";
    const num = convertHandler.getNum(input);
    assert.isTrue(Number.isInteger(num));
  });

  test("read a decimal number input", function () {
    const input = "15.2L";
    const num = convertHandler.getNum(input);
    assert.notEqual(num.toString().indexOf("."), -1);
  });

  test("read a fractional input", function () {
    const input = "2/5gal";
    const num = convertHandler.getNum(input);
    assert.notEqual(Number(num).toString().indexOf("."), -1);
  });

  test("read a fractional input with a decimal", function () {
    const input = "35.6/50mi";
    const num = convertHandler.getNum(input);
    assert.notEqual(Number(num).toString().indexOf("."), -1);
  });

  test("return an error on a double-fraction", function () {
    const input = "3/2/3kg";
    const num = convertHandler.getNum(input);
    assert.equal(num, "invalid number");
  });

  test("default to a 1 when there is no numerical input", function () {
    const input = "kg";
    const num = convertHandler.getNum(input);
    assert.equal(num, 1);
  });

  test("read each valid input unit", function () {
    const input = "20gal";
    const unit = convertHandler.getUnit(input);
    assert.equal(unit, "gal");
  });

  test("return an error for an invalid input unit", function () {
    const input = "20ki";
    const unit = convertHandler.getUnit(input);
    assert.equal(unit, "invalid unit");
  });

  test("return the correct return unit for each valid input unit", function () {
    const unitPair = {
      gal: "l",
      L: "gal",
      lbs: "kg",
      kg: "lbs",
      mi: "km",
      km: "mi",
    };

    for (const [key, value] of Object.entries(unitPair)) {
      const initUnit = convertHandler.getUnit("3" + key);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      assert.equal(returnUnit, value);
    }
  });

  test("return the spelled-out string unit for each valid input unit", function () {
    const unitPair = {
      gal: "gallons",
      l: "liters",
      lbs: "pounds",
      kg: "kilograms",
      mi: "miles",
      km: "kilometers",
    };

    for (const [key, value] of Object.entries(unitPair)) {
      const spelledUnit = convertHandler.spellOutUnit(key);
      assert.equal(spelledUnit, value);
    }
  });

  test("convert gal to L", function () {
    const input = "2gal";
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    returnUnit = returnUnit.toUpperCase();
    const result = returnNum.toString() + returnUnit;

    assert.equal(result, "7.57082L");
  });

  test("convert L to gal", function () {
    const input = "5L";
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const result = returnNum.toString() + returnUnit;

    assert.equal(result, "1.32086gal");
  });

  test("convert mi to km", function () {
    const input = "72mi";
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const result = returnNum.toString() + returnUnit;

    assert.equal(result, "115.87248km");
  });

  test("convert km to mi", function () {
    const input = "15km";
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const result = returnNum.toString() + returnUnit;

    assert.equal(result, "9.32059mi");
  });

  test("convert lbs to kg", function () {
    const input = "4lbs";
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const result = returnNum.toString() + returnUnit;

    assert.equal(result, "1.81437kg");
  });

  test(" convert kg to lbs", function () {
    const input = "3kg";
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const result = returnNum.toString() + returnUnit;

    assert.equal(result, "6.61387lbs");
  });
});
