/* eslint-disable node/no-unpublished-require*/
const apiSetup = require('utils/test.utils');
const chai = require('chai');
const expect = chai.expect;

describe('NEO Tracker', () => {
  let api;

  before(() => {
    return apiSetup().then(testAPI => api = testAPI);
  });

  describe('get /', () => {
    it('should return propper hello world json', () => {
      return api
        .get('/')
        .expect(200)
        .then(response => {
            expect(response).to.have.nested.property('body.hello');
            expect(response.body.hello).to.be.equal('world');
        });
    });
  });
});
