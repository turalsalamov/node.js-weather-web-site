console.log('Client side');


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    document.getElementById('location').innerHTML = 'Location: Loading...';
    document.getElementById('temperature').innerHTML = 'Temperature: Loading...';
    document.getElementById('weather').innerHTML = 'Weather: Loading...';
    fetch('http://localhost:3000/?address=' + encodeURIComponent(search.value)).then((response) => {
        response.json().then((jsonData) => {
            document.getElementById('location').innerHTML = 'Location: ' + jsonData.name;
            document.getElementById('temperature').innerHTML = 'Temperature: ' + jsonData.temperature;
            document.getElementById('weather').innerHTML = 'Weather: ' + jsonData.weather;
        console.log(jsonData);
        });
    });
});