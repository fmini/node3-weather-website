const request = require("postman-request");

const geocode = (address, geoCallback) => {
  const geoURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZm1pbmkiLCJhIjoiY2s2Zjd3YTRwMjV1dTNrcGp2ajcxcmI5dyJ9.U-F5KbekPS0viakTEellKw&limit=1";

  request({ url: geoURL, json: true }, (error, { body }) => {
    if (error) {
      geoCallback("Unable to connect to location service.", undefined);
    } else if (body.features.length === 0) {
      geoCallback("Unable to find coordinates.", undefined);
    } else {
      geoCallback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
