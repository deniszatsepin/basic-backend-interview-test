/* eslint-disable node/no-unpublished-require*/
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;

describe('NEO Tracker model', () => {
  let NearEarthObject;

  before(() => {
    NearEarthObject = require('api/neo/neo.model');
  });

  after(() => {
    mongoose.models = {};
    mongoose.modelSchemas = {};
    if(mongoose.connection.readyState) mongoose.disconnect();
  });

  describe('NearEarthObject model', () => {
    it('should have required properties', () => {
      const reference = `${Math.random()}`;
      const name = 'test';
      const speed = '10';

      const neo = new NearEarthObject({
        reference,
        name,
        speed,
      });

      expect(neo.reference).to.be.equal(reference);
      expect(neo.name).to.be.equal(name);
      expect(neo.date).to.be.not.undefined;
      expect(neo.isHazardous).to.be.false;
      expect(neo.speed).to.be.equal(speed);
    });
  });

});
