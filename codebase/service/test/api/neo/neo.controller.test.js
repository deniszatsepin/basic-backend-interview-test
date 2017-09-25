/* eslint-disable node/no-unpublished-require*/
const mongoose = require('mongoose');
const moment = require('moment');
const apiSetup = require('utils/test.utils');
const NearEarthObject = require('api/neo/neo.model');
const chai = require('chai');
const expect = chai.expect;

describe('NEO Tracker Controller', () => {
  let api;

  before(() => {
    const dates = ['2017-12-10', '2015-11-04', '2012-12-01', '2015-11-25'];

    return apiSetup()
      .then(testAPI => api = testAPI)
      .then(() => {
        const neos = [];
        for (let i = 20; i > 0; i -= 1) {
          const date = moment(dates[i % 4]).toDate();
          neos.push({
            name: `neo ${i}`,
            reference: i,
            isHazardous: i % 2 ? true : false,
            speed: i * 1000,
            date
          });
        }

        return NearEarthObject.insertMany(neos);
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

  describe('/neo/best-year', () => {
    it('should return a year with most not hazardous asteroids', () => {
      return api
        .get('/api/neo/best-year')
        .expect(200)
        .then(response => {
          expect(response).to.have.nested.property('body');
          expect(response.body.year).to.be.equal(2012);
        });
    });

    it('should return a year with most hazardous asteroids', () => {
      return api
        .get('/api/neo/best-year')
        .query({
          hazardous: true
        })
        .expect(200)
        .then(response => {
          expect(response).to.have.nested.property('body');
          expect(response.body.year).to.be.equal(2015);
        });
    });
  });

  describe('/neo/best-month', () => {
    it('should return a month with most not hazardous asteroids', () => {
      return api
        .get('/api/neo/best-month')
        .expect(200)
        .then(response => {
          expect(response).to.have.nested.property('body');
          expect(response.body.month).to.be.equal(12);
        });
    });

    it('should return a month with most hazardous asteroids', () => {
      return api
        .get('/api/neo/best-month')
        .query({
          hazardous: true
        })
        .expect(200)
        .then(response => {
          expect(response).to.have.nested.property('body');
          expect(response.body.month).to.be.equal(11);
        });
    });
  });
});
