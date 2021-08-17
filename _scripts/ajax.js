// add global variable containing XHR object here
let httpRequest = new XMLHttpRequest();

// add get() function here
function get(url,success,fail) {
    httpRequest.open("GET",url);
    httpRequest.onload = () => {
        if(httpRequest.status === 200) {
            success(httpRequest.responseText);
        }else{
            fail(httpRequest.status);
        }
    }
    httpRequest.send();
}

function failHandler(status) {
    console.log('Error code:',status);
    const weatherDiv = document.querySelector('#weather');
    weatherDiv.classList.remove('hidden');

}

function tempToF(kelvin) {
    return ((kelvin - 273.15) * 1.8 + 32).toFixed(0);
}

function successHandler(data) {
    const dataObj = JSON.parse(data);
    const weatherDiv = document.querySelector('#weather');
    const weatherFragment = `
        <h1>Weather</h1>
        <h2 class="top">
        <img
            src="http://openweathermap.org/img/w/${dataObj.weather[0].icon}.png"
            alt="${dataObj.weather[0].description}"
            width="50"
            height="50"
        />${dataObj.name}
        </h2>
        <p>
        <span class="tempF">${tempToF(dataObj.main.temp)}&deg;</span> | ${dataObj.weather[0].description}
        </p>
    `
    weatherDiv.innerHTML = weatherFragment;
    weatherDiv.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '06ead3bed8913dd3aee92a6203bd92d9';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=los+angeles&APPID=' + apiKey;
    // add get() function call here
    get(url,successHandler,failHandler);
    // successHandler(httpRequest.responseText); // will return an error since the data will not come back in time.
});
