window.addEventListener('load', ()=> {
    let longitude;
    let latitude;
    let temperatureDescription =  document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');

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
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;               
                    setIcons(icon, document.querySelector('.icon'));
                
                    temperatureSection.addEventListener('click', transformToCelsius(temperature));
                    document.querySelector('span').style.display = "flex";
                });
        });
    } else if(navigator.geolocation == null) {
        var text = document.querySelector('.location-timezone');
        text.textContent = "Please enable Geolocation";
    }

   function setIcons(icon, iconId) {
       const skyicons = new Skycons({color: "white"});
       const currentIcon = icon.replace(/-/g, "_").toUpperCase();
       skyicons.play();
       return skyicons.set(iconId, Skycons[currentIcon]);
   }

   function transformToCelsius(temperature) {
    var total = (parseFloat(temperature)-32) * 5/9;
    document.querySelector('span').textContent = '°C';
    return total = total.toFixed(1);
   }
});