var first = document.querySelector(".first");
var input = document.getElementById('input1');
var second = document.querySelector(".second");
var button = document.getElementById("btn1");
var locator = document.getElementById("locator");
console.log(first, second);
    input.addEventListener("keypress", (e)=>{
        if(e.key == 'Enter'){
            console.log(input.value);
            first.style["display"] = "none";
            fetchApi(input.value);
            second.style["display"] = "flex";
        }
       
    });
 btn1.addEventListener("click",() => {
    first.style["display"] = "flex";
    second.style["display"] = "none";
    input.value = "";
 });
 function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
  }

  async function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude +
    "<br>"+"Longitude: " + position.coords.longitude);
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apikey}`);
    let data = await response.json();
    console.log(data);
    setdata(data);
  }
locator.addEventListener("click",() => {
     getLocation();
     first.style["display"] = "none";
     second.style["display"] = "flex";
 });
  


async function fetchApi(city) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`);
    let data = await response.json();
    console.log(data);
    setdata(data);
    

}
function setdata(data){
    let id = data.weather[0].icon;
    let imgurl = "http://openweathermap.org/img/wn/"+id+"@2x.png";
    document.querySelector(".weather_icon img").src=imgurl;
    document.getElementById("temp1").innerHTML = Math.floor(data.main.temp)+"°C";
    document.getElementById("weatherC").innerHTML = data.weather[0].description;
    document.getElementById("location").innerHTML = data.name+" , " +data.sys.country;
    document.getElementById("realFeel").innerHTML = data.main.feels_like+"°C";
    document.getElementById("humidity").innerHTML = data.main.humidity+"%";
}