// src/test/services/carService.test.js

const chai = require("chai");
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");

const expect = chai.expect;

chai.use(chaiAsPromised); // Integrate chai-as-promised

const CarService = require("../../services/carService");
const Car = require("../../models/car");

describe("CarService", () => {
  describe("getAll", () => {
    let findAllStub;

    beforeEach(() => {
      findAllStub = sinon.stub(Car, "find");
    });

    afterEach(() => {
      findAllStub.restore();
    });

    it("should retrieve all cars", async () => {
      const mockCars = [
        { name: "Audi", description: "Some description" },
        { name: "BMW", description: "Another description" },
      ];
      findAllStub.resolves(mockCars);

      const carService = new CarService(Car);
      const result = await carService.getAll();

      expect(result).to.be.an("array").that.deep.equals(mockCars);
    });
  });

  describe("getByName", () => {
    let findOneStub;

    beforeEach(() => {
      findOneStub = sinon.stub(Car, "findOne");
    });

    afterEach(() => {
      findOneStub.restore();
    });

    it("should retrieve a car by its name", async () => {
      const mockCar = { name: "Audi", description: "Some description" };
      findOneStub.resolves(mockCar);

      const carService = new CarService(Car);
      const result = await carService.getByName("Audi");

      expect(result).to.deep.equal(mockCar);
    });
  });

  describe("create", () => {
    let sandbox, findOneStub, saveStub;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      findOneStub = sandbox.stub(Car, "findOne");
      saveStub = sandbox.stub(Car.prototype, "save");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("should save a new car if it doesn't exist", async () => {
      console.log("Before calling create...");

      const mockCar = { name: "Audi", description: "Some description" };
      findOneStub.resolves(null); // mock that car doesn't exist yet
      saveStub.resolves(mockCar);

      const carService = new CarService(Car);
      const result = await carService.create(mockCar);

      expect(result).to.deep.equal(mockCar);
    });

    it("should throw an error if car already exists", async () => {
      findOneStub.resolves({
        name: "Audi",
        description: "Existing description",
      });

      const carService = new CarService(Car);
      await expect(
        carService.create({
          name: "Audi",
          description: "New description",
        })
      ).to.eventually.be.rejectedWith("Car with the given name already exists");
    });
  });

  describe("updateByName", () => {
    let findOneAndUpdateStub;

    beforeEach(() => {
      findOneAndUpdateStub = sinon.stub(Car, "findOneAndUpdate");
    });

    afterEach(() => {
      findOneAndUpdateStub.restore();
    });

    it("should update a car by its name", async () => {
      const updatedCar = { name: "Audi", description: "Updated description" };
      findOneAndUpdateStub.resolves(updatedCar);

      const carService = new CarService(Car);
      const result = await carService.updateByName("Audi", {
        description: "Updated description",
      });

      expect(result).to.deep.equal(updatedCar);
    });
  });
});
