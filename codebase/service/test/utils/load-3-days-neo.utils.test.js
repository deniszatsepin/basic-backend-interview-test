/* eslint-disable node/no-unpublished-require*/
const mongoose = require('mongoose');
const moment = require('moment');
const command = require('utils/load-3-days-neo.utils');
const chai = require('chai');
const expect = chai.expect;

const {
  loadNeo,
  loadAndPersist
} = command;

describe('NEO Tracker command', () => {
  let NearEarthObject;

  before(() => {
    NearEarthObject = require('api/neo/neo.model');
  });

  after(() => {
    mongoose.models = {};
    mongoose.modelSchemas = {};
    if (mongoose.connection.readyState) mongoose.disconnect();
  });

  describe('Command', () => {
    it('should load neos from NASA api for last 3 days', () => {
      const endDate = moment(); 
      const startDate = moment().subtract(2, 'day');

      return loadNeo(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'))
        .then((res) => {
          expect(res.element_count).to.be.not.undefined;
          expect(Object.keys(res.near_earth_objects).length).to.be.equal(3);
        });
    }).timeout(5000);

    it('should persist data in db', () => {
      return loadAndPersist()
        .then((elementCount) => {
          NearEarthObject.find({})
            .then((neos) => {
              expect(neos.length).to.be.equal(elementCount);
            });
        });
    });
  });
});
