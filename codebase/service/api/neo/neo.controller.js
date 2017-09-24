const NearEarthObject = require('api/neo/neo.model');

module.exports = {
  getHazardous,
  getFastest
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
    .then(neo => neo.toJSON())
    .then(neo => res.json(neo));
}
