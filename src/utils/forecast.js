const request = require('request');


const getForecast = (latitude, longitude, callback) => {

const url = 'http://api.weatherstack.com/current?access_key=2640f4d14b985811f620e1f176b865ad&query=' + encodeURIComponent(latitude) 
+ ',' + encodeURIComponent(longitude) + '&units=m';


request({url: url, json: true}, (error, response) => {
    if (!error){
        if (response.body.error){
            callback(
                {
                    temperature: 0, 
                    weather_descriptions: ''}
            )
            console.log(response.body.error.info);
        }else{
            const {current} = response.body;
            callback(current);
        }
    }else{
        console.log(error);
    }
});

};

module.exports = {
    getForecast: getForecast
}

