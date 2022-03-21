const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("Test GET /api/convert with a valid input", function (done) {
    const input = "10L";

    chai
      .request(server)
      .get(`/api/convert?input=${input}`)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.equal(res.body.returnNum, 2.64172);
        assert.equal(res.body.returnUnit, "gal");
        done();
      });
  });

  test("Test GET /api/convert with an invalid  input", function (done) {
    const input = "32g";

    chai
      .request(server)
      .get(`/api/convert?input=${input}`)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, "invalid unit");
        done();
      });
  });

  test("Test GET /api/convert with an invalid  number", function (done) {
    const input = "3/7.2/4kg";

    chai
      .request(server)
      .get(`/api/convert?input=${input}`)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, "invalid number");
        done();
      });
  });

  test("Test GET /api/convert with an invalid  number and unit", function (done) {
    const input = "3/7.2/4kilomegagram";

    chai
      .request(server)
      .get(`/api/convert?input=${input}`)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, "invalid number and unit");
        done();
      });
  });

  test("Test GET /api/convert with no number", function (done) {
    const input = "kg";

    chai
      .request(server)
      .get(`/api/convert?input=${input}`)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.equal(res.body.returnNum, 2.20462);
        assert.equal(res.body.returnUnit, "lbs");
        done();
      });
  });
});
