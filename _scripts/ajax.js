// add global variable containing XHR object here
// let httpRequest = new XMLHttpRequest();

// add get() function here
// function get(url,success,fail) {
//     httpRequest.open("GET",url);
//     httpRequest.onload = () => {
//         if(httpRequest.status === 200) {
//             success(httpRequest.responseText);
//         }else{
//             fail(httpRequest.status);
//         }
//     }
//     httpRequest.send();
// }

function get(url){
    return new Promise(function(resolve,reject){
        let httpRequest = new XMLHttpRequest();
        httpRequest.open("GET",url);
        httpRequest.onload = function(){
            if(httpRequest.status === 200) {
                //Resolve the promise with the response text
                resolve(httpRequest.responseText);
            }else{
                //Reject the promise with the status text
                reject(Error(httpRequest.statusText));
            }
        };
        //Handle network errors
        httpRequest.onerror = function(){
            reject(Error("Network Error"));
        };

        httpRequest.send();
    });
}

function failHandler(status) {
    console.log(status);
    // const weatherDiv = document.querySelector('#weather');
    // weatherDiv.classList.remove('hidden');

}

function tempToF(kelvin) {
    return ((kelvin - 273.15) * 1.8 + 32).toFixed(0);
}

// function successHandler(data) {
//     const dataObj = JSON.parse(data);
//     const weatherDiv = document.querySelector('#weather');
//     const weatherFragment = `
//         <h1>Weather</h1>
//         <h2 class="top">
//         <img
//             src="http://openweathermap.org/img/w/${dataObj.weather[0].icon}.png"
//             alt="${dataObj.weather[0].description}"
//             width="50"
//             height="50"
//         />${dataObj.name}
//         </h2>
//         <p>
//         <span class="tempF">${tempToF(dataObj.main.temp)}&deg;</span> | ${dataObj.weather[0].description}
//         </p>
//     `
//     weatherDiv.innerHTML = weatherFragment;
//     // weatherDiv.classList.remove('hidden');
// }
function successHandler(data) {
    const dataObj = JSON.parse(data);
    const div = `
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
    return div;
}

document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '06ead3bed8913dd3aee92a6203bd92d9';
    // const apiKey = '';
    const weatherDiv = document.querySelector('#weather');
    
    const locations = [
        'los+angeles,us',
        'san+francisco,us',
        'lone+pine,us',
        'mariposa,us'
    ];

    const urls = locations.map(function(location) {
        return `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}`; 
    });

    // const url = 'https://api.openweathermap.org/data/2.5/weather?q=los+angeles&APPID=' + apiKey;
    
    // add get() function call here
    // get(url,successHandler,failHandler);
    // successHandler(httpRequest.responseText); // will return an error since the data will not come back in time.

    // console.log(get(url));

    // get(url)
    //     .then(function(response){
    //         successHandler(response);
    //     })
    //     .catch(function(status){
    //         failHandler(status);
    //     })
    //     .finally(function() {
    //         // const weatherDiv = document.querySelector('#weather');
    //         weatherDiv.classList.remove('hidden');
    //     });

    // Promise.all([get(urls[0]),get(urls[1]),get(urls[2]),get(urls[3])])
    //         .then(function(responses){
    //             return responses.map(function(response){
    //                 return successHandler(response);
    //             });
    //         })
    //         .then(function(literals){
    //             weatherDiv.innerHTML = `<h1>Weather</h1>${literals.join('')}`;
    //         })
    //         .catch(function(status){
    //             failHandler(status);
    //         })
    //         .finally(function(){
    //             weatherDiv.classList.remove('hidden');
    //         });

    (async function(){
        try {
            let responses = [];
            responses.push(await get(urls[0]));
            responses.push(await get(urls[1]));
            responses.push(await get(urls[2]));
            responses.push(await get(urls[3]));
    
            let literals = responses.map(function(response){
                return successHandler(response);
            });
            weatherDiv.innerHTML = `<h1>Weather</h1>${literals.join('')}`;
            // weatherDiv.classList.remove('hidden');
        } catch (status) {
            failHandler(status);
        }finally{
            weatherDiv.classList.remove('hidden');
        }
    })();
});
