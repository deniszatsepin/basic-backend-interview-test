/* eslint-disable node/no-unpublished-require*/
const mongoose = require('mongoose');
const apiSetup = require('utils/test.utils');
const NearEarthObject = require('api/neo/neo.model');
const chai = require('chai');
const expect = chai.expect;

describe('NEO Tracker Controller', () => {
  let api;

  before(() => {
    return apiSetup()
      .then(testAPI => api = testAPI)
      .then(() => {
        const neos = [];
        for (let i = 20; i > 0; i -= 1) {
          neos.push(new NearEarthObject({
            name: `neo ${i}`,
            reference: i,
            isHazardous: i % 2 ? true : false,
            speed: i * 1000
          }));
        }

        return Promise.all(neos.map(neo => neo.save()));
      });
  });

  after(() => {
    mongoose.models = {};
    mongoose.modelSchemas = {};
    if (mongoose.connection.readyState) mongoose.disconnect();
  });

  describe('/neo/hazardous', () => {
    it('should return hazardous objects', () => {
      return api
        .get('/api/neo/hazardous')
        .expect(200)
        .then(response => {
          expect(response).to.have.nested.property('body');
          expect(response.body).to.be.an.instanceof(Array);
          expect(response.body.length).to.be.equal(10);
        });
    });
  });

  describe('/neo/fastest', () => {
    it('should return fastest not hazardous objects', () => {
      return api
        .get('/api/neo/fastest')
        .expect(200)
        .then(response => {
          expect(response).to.have.nested.property('body');
          expect(response.body.name).to.not.be.undefined;
          expect(response.body.isHazardous).to.be.false;
          expect(response.body.speed).to.be.equal(20000);
        });
    });

    it('should return fastest hazardous objects', () => {
      return api
        .get('/api/neo/fastest')
        .query({
          hazardous: true
        })
        .expect(200)
        .then(response => {
          expect(response).to.have.nested.property('body');
          expect(response.body.name).to.not.be.undefined;
          expect(response.body.isHazardous).to.be.true;
          expect(response.body.speed).to.be.equal(19000);
        });
    });
  });
});
