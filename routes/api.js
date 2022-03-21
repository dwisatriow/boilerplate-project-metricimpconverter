"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  app.route("/api/convert").get((req, res) => {
    let convertHandler = new ConvertHandler();
    let result;

    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnUnit = convertHandler.getReturnUnit(initUnit);

    if (initNum === "invalid number" || initUnit === "invalid unit") {
      if (initNum === "invalid number" && initUnit === "invalid unit") {
        result = "invalid number and unit";
      } else if (initNum === "invalid number") {
        result = initNum;
      } else {
        result = initUnit;
      }
    } else {
      const returnNum = convertHandler.convert(initNum, initUnit);
      const string = convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      );

      if (initUnit === "l") initUnit = "L";

      result = {
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string,
      };
    }

    res.json(result);
  });
};
