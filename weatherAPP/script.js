window.addEventListener('load', ()=> {
    let longitude;
    let latitude;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position =>{
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
        })
    } else {
        h1.textContent = "Please enable Geolocation";
    }
})