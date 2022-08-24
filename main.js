const key ='77487c75c0a8c040ddc8ff3a13ec50cd'
const formE1 = document.querySelector('form')
const details = document.querySelector(".details")

formE1.addEventListener('submit',(e) =>{
  e.preventDefault();
  details.innerHTML =  `<h1>Loading... </h1>`
  const location = e.target.location.value;
  weatherApp(location);
})

async function weatherApp(location) {
  const data = await fetchApi(location);
  generateHTML(data);
}

async function fetchApi(location){
const baseURL = `https://cors-anywhere.herokuapp.com/http://api.weatherstack.com/current?access_key=${key}&query=${location}`;
const res = await fetch(baseURL);
const data = await res.json();
console.log(data);
return data;
}

function generateHTML(data) {
  const html =`
  <div class="query">${data.request.query}</div>
  <img src="${data.current.weather_icons[0]}" alt="Weather icon">
  <h1 class="temp">${data.current.temperature}°c</h1>
  <h1 class="status">${data.current.weather_descriptions[0]}</h1>
  <div class="more-info">
    <p>Humidity- ${data.current.humidity}%</p>
    <p>Wind Speed- ${data.current.wind_speed}km/h</p>
    <p>Wind Dir- ${data.current.wind_dir}</p>
    <p>Pressure- ${data.current.pressure}MB</p>
    <p>UV index- ${data.current.uv_index}</p>
  </div>
  `
  if(data.current.is_day=="yes")
  document.body.querySelector('section').style.backgroundImage = "url('https://img.freepik.com/free-photo/white-cloud-blue-sky-sea_74190-4488.jpg?w=2000')"
  else
  document.body.querySelector('section').style.backgroundImage = "url('https://s2.best-wallpaper.net/wallpaper/5120x2880/1905/Beautiful-night-sky-starry-road_5120x2880.jpg')"
  document.body.querySelector('section').style.backgroundSize= "cover";
  details.innerHTML = html
}