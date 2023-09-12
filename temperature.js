import React, { useState, useEffect } from "react";

import mycss from "./css/style.css"
import MyImage from './clouds.png';
import clearImg from './clear.png';
import hazeImg from './haze.png';
import brokenImg from './broken.png';
import Myvideo from '../components/myvideo.mp4';




const TempAll = () => {
    const [city, setcity] = useState([])
    const [mysearch, setsearch] = useState("karachi")


    useEffect(() => {
        const fetchApis = async () => {

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${mysearch}&appid=b0042acb82dc7886ade9e09373e28f01`
            const responce = await fetch(url);
            const data = await responce.json()
            setcity(data)
            console.log(city)
        }

        fetchApis();
        // console.log(city)
    }, [mysearch])
    return (
        <>
            <div className="main-box">

                <video id="background-video" autoPlay loop muted>
                    <source src={Myvideo} type="video/mp4" />


                </video>
                <div className="inputfield">
                    <input className="inputValue" type="search" onChange={(myevent) => {
                        setsearch(myevent.target.value)
                    }}></input>
                </div>
                <div className="information">
                    <div className="temp-country">
                        <h1 className="tempValue">{Math.floor(city.main?.temp - 273.33)}°C</h1>
                        <h3 className="countryName">{mysearch}</h3>
                    </div>
                    <div className="sticker-condtion">
                        {
                            (city.weather?.[0].description == "clear sky") ?
                                (<img src={clearImg} alt="My Image" className="myimage" width={110} />) :
                                (city.weather?.[0].description == "haze") ?
                                    (<img src={hazeImg} alt="My Image" className="myimage" width={110} />) :
                                    (city.weather?.[0].description == "broken clouds") ?
                                        (<img src={brokenImg} alt="My Image" className="myimage" width={110} />) :
                                        (<img src={MyImage} alt="My Image" className="myimage" width={110} />)

                        }
                        {/* <img src={MyImage} alt="My Image" className="myimage" width={110} /> */}
                        <p className="condition">{city.weather?.[0].description}</p>
                    </div>
                </div>
                <div className="boxes">
                    {/* box1 */}
                    <div className="box box1">
                        <i class="fa-solid fa-temperature-high"></i>
                        <p className="Humidityname">{city.main?.humidity}%</p>
                        <p className="Humidity">Humidity</p>
                    </div>
                    {/* box 2 */}
                    <div className="box box2">
                        <i class="fa-solid fa-wind"></i>
                        <p className="Windname">{city.wind?.speed}mps</p>
                        <p className="Wind">Wind</p>
                    </div>
                    {/* box 3 */}
                    <div className="box box3">
                        <i class="fa-solid fa-cloud-sun"></i>
                        <p className="pressurename">{city.main?.pressure}</p>
                        <p className="pressure">pressure</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default TempAll;