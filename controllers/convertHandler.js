function ConvertHandler() {
  this.getNum = function (input) {
    const charIndex = input.search(/[^\d/.]/);
    let num;

    if (charIndex === 0 || charIndex === -1) {
      num = 1;
      return num;
    } else {
      num = input.substring(0, charIndex);
      if ((num.match(/\//g) || []).length > 1) {
        return "invalid number";
      } else if (num.indexOf(".") !== -1 || num.indexOf("/") !== -1) {
        return Number.parseFloat(eval(num).toFixed(2));
      } else {
        return Number.parseInt(num);
      }
    }
  };

  this.getUnit = function (input) {
    const charIndex = input.search(/[^\d/.]/);
    let unit;

    if (charIndex !== -1) {
      unit = input.substring(charIndex).toLowerCase();

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
        return "l";
      case "l":
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
      case "l":
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
    let returnNum;

    switch (initUnit) {
      case "gal":
        returnNum = initNum * galToL;
        break;
      case "l":
        returnNum = initNum * (1 / galToL);
        break;
      case "lbs":
        returnNum = initNum * lbsToKg;
        break;
      case "kg":
        returnNum = initNum * (1 / lbsToKg);
        break;
      case "mi":
        returnNum = initNum * miToKm;
        break;
      case "km":
        returnNum = initNum * (1 / miToKm);
        break;
      default:
        returnNum = "invalid unit";
        break;
    }

    return Number.parseFloat(returnNum.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let string = `${initNum.toString()} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum.toString()} ${this.spellOutUnit(returnUnit)}`;

    return string;
  };
}

module.exports = ConvertHandler;
