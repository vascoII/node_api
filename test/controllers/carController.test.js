// src/test/controllers/carController.test.js

const {
  expectResponseStatus,
  expectResponseJson,
  expectStatusCalledWith,
  expectJsonCalledWith,
} = require("../testHelpers/testHelpersUtils");

const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const carController = require("../../controllers/carController");
const CarService = require("../../services/carService");

// Mock express's `res` object methods.
function getResponseObject() {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
}

describe("carController", () => {
  let carServiceStub;

  afterEach(() => {
    if (carServiceStub) {
      carServiceStub.restore();
    }
  });

  describe("getAllCars", () => {
    beforeEach(() => {
      carServiceStub = sinon.stub(CarService.prototype, "getAll");
    });

    it("should retrieve all cars and return status 200", async () => {
      const mockCars = [
        { name: "Audi", description: "Some description" },
        { name: "BMW", description: "Another description" },
      ];

      carServiceStub.resolves(mockCars);

      const req = {};
      const res = getResponseObject();

      await carController.getAllCars(req, res);

      expectResponseStatus(res, 200);
      expectResponseJson(res, mockCars);
    });
  });

  // Repeated logic for different routes can be abstracted
  function testControllerMethod(
    controllerMethod,
    serviceMethod,
    successStatus = 200
  ) {
    beforeEach(() => {
      carServiceStub = sinon.stub(CarService.prototype, serviceMethod);
    });

    it(`should return status ${successStatus}`, async () => {
      const mockData = { name: "Audi", description: "Test description" };
      carServiceStub.resolves(mockData);

      const req = {
        params: { name: "Audi" },
        body: { description: "Test description" },
      };
      const res = getResponseObject();

      await controllerMethod(req, res);

      expectResponseStatus(res, successStatus);
      expectResponseJson(res, mockData);
    });

    it("should return status 404 if car is not found", async () => {
      carServiceStub.resolves(null);

      const req = { params: { name: "Audi" }, body: {} };
      const res = getResponseObject();

      await controllerMethod(req, res);

      expectResponseStatus(res, 404);
      expectResponseJson(res, { error: "Car not found" });
    });

    it("should handle errors and return status 400", async () => {
      carServiceStub.rejects(new Error("Realistic error scenario"));

      const req = { params: { name: "Audi" }, body: {} };
      const res = getResponseObject();

      await controllerMethod(req, res);

      expectResponseStatus(res, 400);
      expectResponseJson(res, { error: "Realistic error scenario" });
    });
  }

  describe("getCarByName", () => {
    testControllerMethod(carController.getCarByName, "getByName");
  });

  describe("createCar", () => {
    let carServiceStub;

    beforeEach(() => {
      carServiceStub = sinon.stub(CarService.prototype, "create");
    });

    afterEach(() => {
      carServiceStub.restore();
    });

    it("should create a car and return status 200 with created car", async () => {
      const createdCar = { name: "Audi", description: "Updated description" };
      carServiceStub.resolves(createdCar);

      const req = {
        params: {},
        body: {
          name: "Audi",
          description: "description",
        },
      };
      const res = getResponseObject();

      await carController.createCar(req, res);

      expectStatusCalledWith(res, 200);
      expectJsonCalledWith(res, { car: createdCar });
    });

    it("should handle errors and return status 400", async () => {
      carServiceStub.rejects(new Error("Some error"));

      const req = {
        params: {},
        body: {
          name: "Audi",
          description: "description",
        },
      };
      const res = getResponseObject();

      await carController.createCar(req, res);

      expectStatusCalledWith(res, 400);
      expectJsonCalledWith(res, { error: "Some error" });
    });
  });

  describe("updateCarByName", () => {
    testControllerMethod(carController.updateCarByName, "updateByName");
  });

  describe("patchCarByName", () => {
    testControllerMethod(carController.patchCarByName, "patchByName");
  });
});
