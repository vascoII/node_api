// src/test/middleware/errorHandler.test.js

const errorHandler = require("../../middleware/errorHandler");
const sinon = require("sinon");

describe("errorHandler Middleware", () => {
  let mockResponse;

  beforeEach(() => {
    mockResponse = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
  });

  function testErrorHandling(error, expectedStatus, expectedMessage) {
    errorHandler(error, {}, mockResponse);

    sinon.assert.calledWith(mockResponse.status, expectedStatus);
    sinon.assert.calledOnce(mockResponse.json);
    sinon.assert.calledWith(mockResponse.json, {
      error: expectedMessage,
    });
  }

  it("should handle ValidationError and return status 400", async () => {
    testErrorHandling(
      { name: "ValidationError", message: "Test validation error" },
      400,
      "Test validation error"
    );
  });

  it("should handle CastError and return status 400 with 'Invalid ID format' message", async () => {
    testErrorHandling(
      { name: "CastError", message: "Invalid ID format" },
      400,
      "Invalid ID format"
    );
  });

  it("should handle generic errors and return status 500 with 'Internal Server Error' message", async () => {
    testErrorHandling(
      { name: "InternalServerError", message: "Internal Server Error" },
      500,
      "Internal Server Error"
    );
  });
});
