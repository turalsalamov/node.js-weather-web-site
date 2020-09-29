const e = require('express');
const request = require('request');

const geoCode = (address, callback) => {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=pk.eyJ1Ijoic2FsYW1vdiIsImEiOiJja2ZqeW5iZWwwbmJjMzBuNGtlc2lsZTk2In0.fIhg5BtFLEPX4fWjoVVsZg&limit=1';
    request({url: geoUrl, json: true}, (error, response) => {
        if(error){
            callback('error', undefined);
        }else{
            if(!response.body.error){
            const {center, place_name} = response.body.features[0] || {center: [undefined,undefined], place_name: undefined}
            const latitude = center[1];
            const longitude = center[0];
            const location = place_name;


            callback(undefined, {
                latitude,
                longitude,
                location
            });
            }else{
                callback(undefined, {
                    latitude: 0,
                    longitude: 0,
                    location: ''
                });
            }
        }
    })
};

module.exports = {
    geoCode: geoCode
}