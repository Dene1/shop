import {useEffect, useState} from "react"
import styled from "styled-components"
import {TfiLocationPin} from "react-icons/tfi";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
`

const FooterContainer = ({className}) => {

    const [city, setCity] = useState("")
    const [temperature, setTemperature] = useState("")
    const [weather, setWeather] = useState("")

    useEffect(() => {
        fetch("http://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&lang=ru&appid=acd4f346c669d7400f4dbbeb7f1350e0")
            .then((res) => res.json())
            .then(({name, main, weather}) => {
                setCity(name)
                setTemperature(Math.round(main.temp))
                setWeather(weather[0].description)
            });
    }, []);

    return (
        <div className={className}>
            <StyledContainer>
                <div><span style={{color: "#EA454C"}}>Denel</span>Sneakers.© 2025</div>
                <div>All rights reserved</div>
            </StyledContainer>
            <StyledContainer>
                <div>Contacts</div>
                <div>8 (800) 555-35-35</div>
                <div>DenelSneakers@gmail.com</div>
            </StyledContainer>
            <StyledContainer>
                 <span style={{display: " flex", justifyItem: " center"}}>
                     <TfiLocationPin size={18}/>
                     Denel Sneakers
                 </span>
                <div>1234 Shoe Street, Fashion City</div>
                <div>Moscow, 256789</div>
            </StyledContainer>
            <StyledContainer>
                <div>{city}, {new Date().toLocaleString("ru",
                    {day: "numeric", month: "long"})}
                </div>
                <div>
                    {temperature}°C, {weather}
                </div>
            </StyledContainer>
        </div>
    )
}

export const Footer = styled(FooterContainer)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1440px;
    height: 120px;
    padding: 20px 40px;
    font-weight: 500;
    background-color: white;
    box-shadow: 0 2px 17px black;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    z-index: 1;
`
