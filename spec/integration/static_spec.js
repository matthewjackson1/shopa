const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3001/";

describe("routes : static", () => {

  //#1
  describe("GET /", () => {

    //#2
    it("should return status code 200 and have 'Free online writing competitions' in the body of the response", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Shopping lists made easy.");
        //#4
        done();
      });
    });

  });
});
