// creating required objects
const apikey="" //your api_key 
const cityInput=document.querySelector(".cityInput")
const submit=document.querySelector("#submit-btn")
const card=document.querySelector(".container")
const citydisplay=document.querySelector("#cityname")
const citytemperatur=document.querySelector("#Citytemperature")
const humiditydisplay=document.querySelector("#humiditydisplay")
const weather_description=document.querySelector("#description-display")
const weatherimage=document.querySelector("#weatheremoji")
const get_cityname=(data)=>{
        return data.name
    }
const get_city_humidity=(data)=>{
    return data.main.humidity
}
const get_weather_description=(data)=>{
    return data.weather[0].description
}
const get_weather_icon=(data)=>{
    const icon_code=data.weather[0].icon
    return `https://openweathermap.org/img/wn/${icon_code}@2x.png`;
}

const get_temperature=(data)=>{
    return data.main.temp
}
const add_data=(city,humidity,description,weather_img,temp)=>{
    cityInput.value=""
    citydisplay.textContent=city
    citytemperatur.textContent=temp
    humiditydisplay.textContent=humidity
    weather_description.textContent=description
    weatherimage.innerHTML=`<img src="${weather_img}" alt="weather icon">`
    card.style.display='block'
}

const display_data=async ()=>{
    try{
         const respone=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apikey}&units=metric`)
         if(!respone.ok){
            throw new Error("Could not fetch weather data")
         }
         const data=await respone.json()
         console.log(data)
         console.log("data clicked")
         const city_name=get_cityname(data)
         const humidity=get_city_humidity(data)
         const weather_description=get_weather_description(data)
         const weather_img_url=get_weather_icon(data)
         const temp=data.main.temp
         console.log(city_name)
         console.log(humidity)
         console.log(weather_description)
        add_data(city_name,humidity,weather_description,weather_img_url,temp)
    }
    catch(error)
    {
        console.error(error)
    }
}

submit.addEventListener("click",display_data)
