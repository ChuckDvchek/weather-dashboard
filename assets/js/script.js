//add date functionality to the following

//current weather card
var currentTimeEl = document.querySelector('#current-time');
var today = moment().format('(M/D/YYYY)');
currentTimeEl.textContent = today;

//each day of the five day forecast cards
for (let i = 1; i < 6; i++) {
    var dayEl = document.querySelector('#date-of-d'+i);
    var day = moment().add(i,'days').format('M/D/YYYY');
    dayEl.textContent = day;
}

//loads the list of previously searched cities from local storage
var prevCitiesArr = localStorage.getItem('prevCitiesArr') || [];
var previousCityListEl = document.querySelector('#previous-city-list');
for (let i = 0; i < prevCitiesArr.length; i++) {
    
}


//search button searches for the input value
var searchBtnEl = document.querySelector('#search-btn');
searchBtnEl.addEventListener('click',searchWeather);

function searchWeather(){

    var appid = '2afefa77c8d52d70478c32fd2562d898';

    var cityInputEl = document.querySelector('#city-input');
    var city = cityInputEl.value;

    //checks to see if anything is typed into the input
    if(city!==""){
        
        //searches weather api with the text input value
        fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=imperial&appid='+appid)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            
            if(data.cod == 200){

                //updates current card
                
                //updates current city
                var currentCityEl = document.querySelector('#current-city');
                currentCityEl.textContent = data.name;
                
                //updates current weather icon
                var currentIconEl = document.querySelector('#current-icon');
                currentIconEl.setAttribute('src','http://openweathermap.org/img/w/'+data.weather[0].icon+'.png');
                
                //updates current temp
                var currentTempEl = document.querySelector('#temp-val');
                currentTempEl.textContent = data.main.temp;
                
                //updates current wind
                var currentWindEl = document.querySelector('#wind-val');
                currentWindEl.textContent = data.wind.speed;
                
                //updates current humidity
                var currentHumidityEl = document.querySelector('#humidity-val');
                currentHumidityEl.textContent = data.main.humidity;
                
                //updates current uv index
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=minutely,hourly,daily,alerts&appid='+appid)
                .then(function (response2){
                    return response2.json();
                })
                .then(function (data2){
                    var currentUVIEl = document.querySelector('#uvi-val');
                    currentUVIEl.textContent = data2.current.uvi;
                });

                //updates 5 day forecast cards
                fetch('https://api.openweathermap.org/data/2.5/forecast?q='+city+'&cnt=5&units=imperial&appid='+appid)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    for (let i = 0; i < 5; i++) {
                        
                    //updates 5 day weather icon
                    var dayIconEl = document.querySelector('#d'+(i+1)+'-icon');
                    dayIconEl.setAttribute('src','http://openweathermap.org/img/w/'+data.list[i].weather[0].icon+'.png');
                    
                    //updates 5 day temp
                    var dayTempEl = document.querySelector('#d'+(i+1)+'-temp-val');
                    dayTempEl.textContent = data.list[i].main.temp;
                    
                    //updates 5 day wind
                    var dayWindEl = document.querySelector('#d'+(i+1)+'-wind-val');
                    dayWindEl.textContent = data.list[i].wind.speed;
                    
                    //updates 5 day humidity
                    var dayHumidityEl = document.querySelector('#d'+(i+1)+'-humidity-val');
                    dayHumidityEl.textContent = data.list[i].main.humidity;
                }
                });
            }
        });
            
        
        //adds city to previously searched list
        //city saves in local storage
    }
}