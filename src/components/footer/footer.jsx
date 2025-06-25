import { useEffect, useState } from "react"
import styled from "styled-components"
import { GrLocation } from "react-icons/gr";
import { FiMail, FiPhone } from "react-icons/fi";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
`

const FooterContainer = ({ className }) => {

    const [city, setCity] = useState("")
    const [temperature, setTemperature] = useState("")
    const [weather, setWeather] = useState("")

    useEffect(() => {
        fetch("http://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&lang=ru&appid=acd4f346c669d7400f4dbbeb7f1350e0")
            .then((res) => res.json())
            .then(({ name, main, weather }) => {
                setCity(name)
                setTemperature(Math.round(main.temp))
                setWeather(weather[0].description)
            });
    }, []);

    return (
        <div className={ className }>
            <StyledContainer>
                <div><span className="logo">Denel</span>Sneakers.© 2025
                </div>
                All rights reserved
            </StyledContainer>
            <StyledContainer>
                <div className="container">
                    <FiPhone size={ 18 } />
                    8 (800) 555-35-35
                </div>
                <div className="container">
                    <FiMail size={ 18 } />
                    denelsneakers@gmail.com
                </div>
            </StyledContainer>
            <StyledContainer>
                <div className="container">
                    <GrLocation size={ 18 } />
                    Denel Sneakers
                </div>
                1234 Shoe Street, Moscow City, CA 86423
            </StyledContainer>
            <StyledContainer>
                <div>{ city }, { new Date().toLocaleString("ru",
                    { day: "numeric", month: "long" }) }
                </div>
                <div>
                    { temperature }°C, { weather }
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
    z-index: 5;

    .logo {
        color: #EA454C;
    }

    .container {
        display: flex;
        align-items: end;
        gap: 4px;
    }
`
