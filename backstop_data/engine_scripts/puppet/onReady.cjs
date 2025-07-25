const clickAndHoverHelper = require('./clickAndHoverHelper.cjs');

module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await clickAndHoverHelper(page, scenario);

  // add more ready handlers here...
};
