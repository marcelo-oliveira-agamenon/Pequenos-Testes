window.addEventListener('load', ()=> {
    let longitude;
    let latitude;
    let temperatureDescription =  document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    const temperatureSection = document.querySelector('.degree-section');
    var count = 1;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position =>{
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/fcc5564c5e19a1495ec1ce74de6e77b4/${latitude},${longitude}`;
            fetch(api)
                .then(data => {
                    return data.json();
                })
                .then(data => {
                    const { temperature, summary, icon } = data.currently;
                    temperatureDegree.textContent = temperature.toFixed(1);
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;               
                    setIcons(icon, document.querySelector('.icon'));
                    
                    document.querySelector('span').style.display = "flex";
                    temperatureSection.addEventListener('click', function() {transformTemperature(temperature, count)});
                    return count;
                });
        });
    } else if(navigator.geolocation == null) {
        var text = document.querySelector('.location-timezone');
        text.textContent = 'Please enable Geolocation';
    }

   function setIcons(icon, iconId) {
       const skyicons = new Skycons({color: "white"});
       const currentIcon = icon.replace(/-/g, "_").toUpperCase();
       skyicons.play();
       return skyicons.set(iconId, Skycons[currentIcon]);
   }

   function transformTemperature(temperature, count) {
    if (count === 1) {
        var celsius = (parseFloat(temperature)-32) * 5/9;
        document.querySelector('span').textContent = '°C';
        celsius = celsius.toFixed(1);
        temperatureDegree.textContent = celsius
        return count = 2;
    } else if (count === 2){
        var fahrenheit = temperature;
        fahrenheit = fahrenheit.toFixed(1);
        document.querySelector('span').textContent = '°F';
        temperatureDegree.textContent = fahrenheit;
        return count = 1;
    }
   }
});