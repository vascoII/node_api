// src/test/integration/middleware/carValidator.test.js

const request = require("supertest");
const expect = require("chai").expect;
const app = require("../../../app"); // Adjust the path according to your folder structure

describe("Car Routes Integration Tests", () => {
  const carData = {
    name: "Audi",
    description: "Some description of the car as it is a nice one",
  };

  it("POST - Create a new car", async () => {
    const response = await request(app)
      .post("/cars") // Adjust endpoint if different
      .send(carData);

    expect(response.status).to.equal(201);
    expect(response.body.car.name).to.equal(carData.name);
  });

  it("GET - Retrieve all cars", async () => {
    const response = await request(app).get("/cars");

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
    expect(response.body[0].name).to.equal(carData.name);
  });

  it("GET - Retrieve a specific car by name", async () => {
    const response = await request(app).get(`/cars/${carData.name}`);

    expect(response.status).to.equal(200);
    expect(response.body.name).to.equal(carData.name);
  });

  it("PUT - Update a car completely by its name", async () => {
    const updatedData = { name: "Audi", description: "Updated description" };
    const response = await request(app)
      .put(`/cars/${carData.name}`)
      .send(updatedData);

    expect(response.status).to.equal(200);
    expect(response.body.description).to.equal(updatedData.description);
  });

  it("PATCH - Partially update a car by its name", async () => {
    const partialUpdate = { description: "Partially updated description" };
    const response = await request(app)
      .patch(`/cars/${carData.name}`)
      .send(partialUpdate);

    expect(response.status).to.equal(200);
    expect(response.body.description).to.equal(partialUpdate.description);
  });
});
