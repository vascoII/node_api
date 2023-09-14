// src/test/testHelpers/testHelpersUtils.js

const { expect } = require("chai");

function expectResponseStatus(res, status) {
  expect(res.status.calledOnceWith(status)).to.be.true;
}

function expectResponseJson(res, json) {
  expect(res.json.calledOnceWith(json)).to.be.true;
}

function expectStatusCalledWith(res, status) {
  expect(res.status.calledWith(status)).to.be.true;
}

function expectJsonCalledWith(res, json) {
  expect(res.json.calledWith(json)).to.be.true;
}

module.exports = {
  expectResponseStatus,
  expectResponseJson,
  expectStatusCalledWith,
  expectJsonCalledWith,
};
