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

function getFastest(req, res) {
  const isHazardous = !!req.swagger.params.hazardous.value;

  NearEarthObject.findFastest(isHazardous)
    .then(neo => res.json(neo.toJSON()));
}

function getBestYear(req, res) {
  const isHazardous = !!req.swagger.params.hazardous.value;

  NearEarthObject.findBestYear(isHazardous)
    .then(year => res.json(year));
}

function getBestMonth(req, res) {
  const isHazardous = !!req.swagger.params.hazardous.value;

  NearEarthObject.findBestMonth(isHazardous)
    .then(month => res.json(month));
}
