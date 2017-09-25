const createError = require('http-errors');
const NearEarthObject = require('api/neo/neo.model');

module.exports = {
  getHazardous,
  getFastest,
  getBestYear,
  getBestMonth
};

function getHazardous(req, res) {
  NearEarthObject.findHazardous()
    .then(neos => {
      return neos.map(neo => neo.toJSON())
    })
    .then(neos => {
      res.json(neos);
    });
}

const emptyDbErrorMessage = 'There is no Near Earth Objects in database.';

function getFastest(req, res, next) {
  const isHazardous = !!req.swagger.params.hazardous.value;

  NearEarthObject.findFastest(isHazardous)
    .then(neo => {
      if (!neo) {
        return next(new createError.NotFound(emptyDbErrorMessage));
      }
      
      res.json(neo.toJSON());
    });
}

function getBestYear(req, res, next) {
  const isHazardous = !!req.swagger.params.hazardous.value;

  NearEarthObject.findBestYear(isHazardous)
    .then(year => {
      if (!year) {
        return next(new createError.NotFound(emptyDbErrorMessage));
      }
      
      res.json(year);
    });
}

function getBestMonth(req, res, next) {
  const isHazardous = !!req.swagger.params.hazardous.value;

  NearEarthObject.findBestMonth(isHazardous)
    .then(month => {
      if (!month) {
        return next(new createError.NotFound(emptyDbErrorMessage));
      }
      
      res.json(month);
    });
}
