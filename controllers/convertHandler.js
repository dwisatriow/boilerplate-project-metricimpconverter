function ConvertHandler() {
  this.getNum = function (input) {
    const charIndex = input.search(/[^\d/.]/);
    let num;

    if (charIndex === 0 || charIndex === -1) {
      num = 1;
    } else {
      num = input.substring(0, charIndex);
      if (Number(num)) {
        num = Number(num);
      } else {
        return "invalid number";
      }
    }

    return num;
  };

  this.getUnit = function (input) {
    const charIndex = input.search(/[^\d/.]/);
    let unit;

    if (charIndex !== -1) {
      unit = input.substring(charIndex);

      if (this.getReturnUnit(unit) === "invalid unit") {
        return "invalid unit";
      } else {
        return unit;
      }
    } else {
      return "invalid unit";
    }
  };

  this.getReturnUnit = function (initUnit) {
    switch (initUnit) {
      case "gal":
        return "L";
      case "L":
        return "gal";
      case "lbs":
        return "kg";
      case "kg":
        return "lbs";
      case "mi":
        return "km";
      case "km":
        return "mi";
      default:
        return "invalid unit";
    }
  };

  this.spellOutUnit = function (unit) {
    switch (unit) {
      case "gal":
        return "gallons";
      case "L":
        return "liters";
      case "lbs":
        return "pounds";
      case "kg":
        return "kilograms";
      case "mi":
        return "miles";
      case "km":
        return "kilometers";
      default:
        return;
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit) {
      case "gal":
        return initNum * galToL;
      case "L":
        return initNum * (1 / galToL);
      case "lbs":
        return initNum * lbsToKg;
      case "kg":
        return initNum * (1 / lbsToKg);
      case "mi":
        return initNum * miToKm;
      case "km":
        return initNum * (1 / miToKm);
      default:
        return "invalid unit";
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let string = `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

    return string;
  };
}

module.exports = ConvertHandler;
