const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geo = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;



app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
app.use(express.static(path.join(__dirname, '../public')));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.get('', (req, res) => {
    if (!req.query.address){
        return res.render('index', {
            title: 'Weather App',
            name: '',
        });
    }
    geo.geoCode(req.query.address, (error, data) => {
        if(error !== undefined){
            return console.log(error);
        }else{
            console.log(data.location + '\n' + data.latitude + ' ' + data.longitude);
            const {latitude, longitude} = data;
            forecast.getForecast(latitude, longitude, (forecastData) => {
                var {temperature, weather_descriptions} = forecastData;
                var name = undefined, weather = undefined;
                if(weather_descriptions === ''){
                    name = 'Please, enter valid country!';
                    weather = '';
                    temperature = '';
                }else{
                    name = data.location;
                    weather = weather_descriptions[0];
                }
                res.send({
                    title: 'Weather App',
                    name: name,
                    temperature: temperature,
                    weather: weather
                })
            })
        }
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Tural Salamov'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Tural Salamov'
    })
});



app.get('/help/*', (req, res) => {
    res.render('article_error', {
        title: 404
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 404
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});