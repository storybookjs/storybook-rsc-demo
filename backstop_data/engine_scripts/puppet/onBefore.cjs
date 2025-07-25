const loadCookies = require('./loadCookies.cjs');

module.exports = async (page, scenario, vp) => {
  await loadCookies(page, scenario);
};
