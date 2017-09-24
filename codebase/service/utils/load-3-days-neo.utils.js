const moment = require('moment');
const request = require('superagent');
const dbSetup = require('setup/db.setup');
const NearEarthObject = require('api/neo/neo.model');

const {
  NASA_API,
  NASA_API_KEY,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env;

const dbConfig = {
  host: DB_HOST,
  port: DB_PORT,
  name: DB_NAME
};

const loadNeo = module.exports.loadNeo = function loadNeo(startDate, endDate) {
  const url = `${NASA_API}/feed`;

  return request
    .get(url)
    .query({
      start_date: startDate,
      end_date: endDate,
      detailed: true,
      api_key: NASA_API_KEY
    })
    .then(res => res.body);
}

module.exports.loadAndPersist = function loadAndPersist() {
  const endDate = moment();
  const startDate = moment().subtract(2, 'day');

  let loaded = 0;

  return Promise.all([
    loadNeo(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD')),
    dbSetup(dbConfig)
  ])
    .then(([response, _]) => {
      loaded = response.element_count;
      const neosInfo = response.near_earth_objects;
      const neos = Object.keys(neosInfo)
        .map(date => {
          const infos = neosInfo[date];

          return infos.map(info => {
            const cad = info.close_approach_data[0];

            return {
              data: moment(cad.close_approach_date).toDate(),
              reference: info.neo_reference_id,
              name: info.name,
              speed: cad.relative_velocity.kilometers_per_hour,
              isHazardous: info.is_potentially_hazardous_asteroid
            };
          });
        })
        .reduce((acc, cur) => acc.concat(cur), []);

      return NearEarthObject.insertMany(neos);
    })
    .then(() => loaded);
}