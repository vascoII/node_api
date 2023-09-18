// src/test/unit/middleware/carValidator.test.js

const {
  carValidationRules,
  validate,
} = require("../../../middleware/carValidator");
const sinon = require("sinon");

describe("carValidator Middleware", () => {
  let mockRequest;

  beforeEach(() => {
    mockRequest = {
      body: {},
    };
  });

  describe("carValidationRules", () => {
    it("should pass validation with correct car details", async () => {
      mockRequest.body = {
        name: "TestCar",
        description: "This is a test car description.",
      };

      const mockResponse = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      const next = sinon.spy();

      const validations = carValidationRules();
      await Promise.all(
        validations.map((validation) => validation.run(mockRequest))
      );

      validate(mockRequest, mockResponse, next);

      sinon.assert.calledOnce(next);
      sinon.assert.notCalled(mockResponse.json);
    });

    it("should fail validation if 'name' is missing", async () => {
      mockRequest.body = {
        description: "description test",
      };

      const mockResponse = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      const next = sinon.spy();

      const validations = carValidationRules();
      await Promise.all(
        validations.map((validation) => validation.run(mockRequest))
      );

      validate(mockRequest, mockResponse, next);

      sinon.assert.notCalled(next);
      sinon.assert.calledWith(mockResponse.status, 400);
      sinon.assert.calledOnce(mockResponse.json);
      sinon.assert.calledWith(mockResponse.json, {
        errors: {
          name: [
            "Give a Name",
            "Name is 4 characters minimum, 20 characters maximum",
          ],
        },
      });
    });

    it("should fail validation if 'name' length is less than 4", async () => {
      mockRequest.body = {
        name: "Aud",
        description: "This is a test car description.",
      };

      const mockResponse = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      const next = sinon.spy();

      const validations = carValidationRules();
      await Promise.all(
        validations.map((validation) => validation.run(mockRequest))
      );

      validate(mockRequest, mockResponse, next);

      sinon.assert.notCalled(next);
      sinon.assert.calledWith(mockResponse.status, 400);
      sinon.assert.calledOnce(mockResponse.json);
      sinon.assert.calledWith(mockResponse.json, {
        errors: {
          name: ["Name is 4 characters minimum, 20 characters maximum"],
        },
      });
    });

    it("should fail validation if 'name' length is more than 20", async () => {
      mockRequest.body = {
        name: "Audi with more than 20 characters",
        description: "This is a test car description.",
      };

      const mockResponse = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      const next = sinon.spy();

      const validations = carValidationRules();
      await Promise.all(
        validations.map((validation) => validation.run(mockRequest))
      );

      validate(mockRequest, mockResponse, next);

      sinon.assert.notCalled(next);
      sinon.assert.calledWith(mockResponse.status, 400);
      sinon.assert.calledOnce(mockResponse.json);
      sinon.assert.calledWith(mockResponse.json, {
        errors: {
          name: ["Name is 4 characters minimum, 20 characters maximum"],
        },
      });
    });

    it("should fail validation if 'description' is missing", async () => {
      mockRequest.body = {
        name: "Audi",
      };

      const mockResponse = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      const next = sinon.spy();

      const validations = carValidationRules();
      await Promise.all(
        validations.map((validation) => validation.run(mockRequest))
      );

      validate(mockRequest, mockResponse, next);

      sinon.assert.notCalled(next);
      sinon.assert.calledWith(mockResponse.status, 400);
      sinon.assert.calledOnce(mockResponse.json);
      sinon.assert.calledWith(mockResponse.json, {
        errors: {
          description: [
            "Give a Description",
            "Description is 4 characters minimum, 200 characters maximum",
          ],
        },
      });
    });

    it("should fail validation if 'description' length is less than 4", async () => {
      mockRequest.body = {
        name: "Audi",
        description: "The",
      };

      const mockResponse = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      const next = sinon.spy();

      const validations = carValidationRules();
      await Promise.all(
        validations.map((validation) => validation.run(mockRequest))
      );

      validate(mockRequest, mockResponse, next);

      sinon.assert.notCalled(next);
      sinon.assert.calledWith(mockResponse.status, 400);
      sinon.assert.calledOnce(mockResponse.json);
      sinon.assert.calledWith(mockResponse.json, {
        errors: {
          description: [
            "Description is 4 characters minimum, 200 characters maximum",
          ],
        },
      });
    });

    it("should fail validation if 'description' length is more than 200", async () => {
      mockRequest.body = {
        name: "Audi",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      };

      const mockResponse = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      const next = sinon.spy();

      const validations = carValidationRules();
      await Promise.all(
        validations.map((validation) => validation.run(mockRequest))
      );

      validate(mockRequest, mockResponse, next);

      sinon.assert.notCalled(next);
      sinon.assert.calledWith(mockResponse.status, 400);
      sinon.assert.calledOnce(mockResponse.json);
      sinon.assert.calledWith(mockResponse.json, {
        errors: {
          description: [
            "Description is 4 characters minimum, 200 characters maximum",
          ],
        },
      });
    });
  });

  describe("patchCarValidationRules", () => {
    it("should fail validation if 'name' length is less than 4", async () => {
      mockRequest.body = {
        name: "Aud",
        description: "This is a test car description.",
      };

      const mockResponse = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      const next = sinon.spy();

      const validations = carValidationRules();
      await Promise.all(
        validations.map((validation) => validation.run(mockRequest))
      );

      validate(mockRequest, mockResponse, next);

      sinon.assert.notCalled(next);
      sinon.assert.calledWith(mockResponse.status, 400);
      sinon.assert.calledOnce(mockResponse.json);
      sinon.assert.calledWith(mockResponse.json, {
        errors: {
          name: ["Name is 4 characters minimum, 20 characters maximum"],
        },
      });
    });

    it("should fail validation if 'name' length is more than 20", async () => {
      mockRequest.body = {
        name: "Audi with more than 20 characters",
        description: "This is a test car description.",
      };

      const mockResponse = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      const next = sinon.spy();

      const validations = carValidationRules();
      await Promise.all(
        validations.map((validation) => validation.run(mockRequest))
      );

      validate(mockRequest, mockResponse, next);

      sinon.assert.notCalled(next);
      sinon.assert.calledWith(mockResponse.status, 400);
      sinon.assert.calledOnce(mockResponse.json);
      sinon.assert.calledWith(mockResponse.json, {
        errors: {
          name: ["Name is 4 characters minimum, 20 characters maximum"],
        },
      });
    });

    it("should fail validation if 'description' is missing", async () => {
      mockRequest.body = {
        name: "Audi",
      };

      const mockResponse = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      const next = sinon.spy();

      const validations = carValidationRules();
      await Promise.all(
        validations.map((validation) => validation.run(mockRequest))
      );

      validate(mockRequest, mockResponse, next);

      sinon.assert.notCalled(next);
      sinon.assert.calledWith(mockResponse.status, 400);
      sinon.assert.calledOnce(mockResponse.json);
      sinon.assert.calledWith(mockResponse.json, {
        errors: {
          description: [
            "Give a Description",
            "Description is 4 characters minimum, 200 characters maximum",
          ],
        },
      });
    });

    it("should fail validation if 'description' length is less than 4", async () => {
      mockRequest.body = {
        name: "Audi",
        description: "The",
      };

      const mockResponse = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      const next = sinon.spy();

      const validations = carValidationRules();
      await Promise.all(
        validations.map((validation) => validation.run(mockRequest))
      );

      validate(mockRequest, mockResponse, next);

      sinon.assert.notCalled(next);
      sinon.assert.calledWith(mockResponse.status, 400);
      sinon.assert.calledOnce(mockResponse.json);
      sinon.assert.calledWith(mockResponse.json, {
        errors: {
          description: [
            "Description is 4 characters minimum, 200 characters maximum",
          ],
        },
      });
    });

    it("should fail validation if 'description' length is more than 200", async () => {
      mockRequest.body = {
        name: "Audi",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      };

      const mockResponse = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      const next = sinon.spy();

      const validations = carValidationRules();
      await Promise.all(
        validations.map((validation) => validation.run(mockRequest))
      );

      validate(mockRequest, mockResponse, next);

      sinon.assert.notCalled(next);
      sinon.assert.calledWith(mockResponse.status, 400);
      sinon.assert.calledOnce(mockResponse.json);
      sinon.assert.calledWith(mockResponse.json, {
        errors: {
          description: [
            "Description is 4 characters minimum, 200 characters maximum",
          ],
        },
      });
    });
  });

  describe("validate", () => {
    it("should call next() if validation passes", () => {
      mockRequest.body = {
        name: "TestCar",
        description: "This is a test car description.",
      };

      const mockResponse = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      const next = sinon.spy();

      const validations = carValidationRules();
      validations.forEach((validation) => validation.run(mockRequest));

      validate(mockRequest, mockResponse, next);

      sinon.assert.calledOnce(next);
      sinon.assert.notCalled(mockResponse.json);
    });
  });
});
