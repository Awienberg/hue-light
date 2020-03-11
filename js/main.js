const hue = jsHue();
const ip = "192.168.1.40";
const username = "8wtjG2vk2jKIAT9Z2ZyuLt1DMylya1T9ZCvcZGFm";
const bridge = hue.bridge(ip);
const user = bridge.user(username);
const sliderBri = document.getElementById("sliderBri");
const sliderHue = document.getElementById("sliderHue");
let state = 0;

sliderBri.style.width = "300px";
sliderHue.style.width = "300px";

//user.setLightState(1, { on: true });
//user.setLightState(1, { hue: Math.round(Math.random() * 65535) });
//user.setLightState(1, { bri: 254 });
//user.setLightState(1, { on: false, hue: Math.round(Math.random() * 65535), bri: 64 });

const on = () => {
    state = 1;
    user.setLightState(2, { on: true });
    console.log(state);
}

const off = () => {
    state = 0;
    user.setLightState(2, { on: false });
    console.log(state);
}

const toggleState = () => {
    state = +!state;
    if (state) {
        on();
    }
    else {
        off();
    }
}

sliderBri.oninput = function () {
    user.setLightState(2, { bri: parseInt(this.value) });
    console.log(this.value);
}

sliderHue.oninput = function () {
    user.setLightState(2, { hue: parseInt(this.value) });
    console.log(this.value);
}

let input = document.querySelector(".input");
let button = document.querySelector(".submit");
input.value = "";

const key = '326f0c938795278b3996cca76932457c';

button.addEventListener("click", function weatherBalloon( city ) {
	fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=' + key)  
	.then(function(resp) { return resp.json() })
	.then(function(data) {
		drawWeather(data);
	})
	.catch(function() {
    });

    function drawWeather(d) {
        var celcius = Math.round(parseFloat(d.main.temp)-273.15);
          var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32);
        var description = d.weather[0].description; 
          
          document.getElementById('description').innerHTML = description;
          document.getElementById('temp').innerHTML = celcius + '&deg;';
          document.getElementById('location').innerHTML = d.name;
        
        if( description.indexOf('rain') > 0 ) {
            document.body.className = 'rainy';
            user.setLightState(2, { hue: 40000, sat: 200 });
        } else if( description.indexOf('cloud') > 0 ) {
            document.body.className = 'cloudy';
            user.setLightState(2, { hue: 45000, sat: 100, bri: 60 });
        } else if( description.indexOf('snow') > 0 ) {
          document.body.className = 'snow';
          user.setLightState(2, { hue: 40000, sat: 50, bri: 60 });
        } else if( description.indexOf('thunderstorm') > 0 ) {
            document.body.className = 'thunderstorm';
            user.setLightState(2, { hue: 65535, sat: 200, bri: 60 }); 
        } else {
            document.body.className = 'clear';
            user.setLightState(2, { hue: 10000, sat: 200, bri: 100 });
        }
    }
});