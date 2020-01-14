const NodeGeoder = require("node-geocoder");

const geocodeProvider = require('./keys').geocodeProvider;
const geocoderApiKey = require('./keys').geocoderApiKey;

const options = {
    provider: geocodeProvider,
    httpAdapter: "https",
    apiKey: geocoderApiKey,
    formatter: null
}

const geocoder = NodeGeoder(options);

module.exports = geocoder; 