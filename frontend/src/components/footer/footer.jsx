import { useEffect, useState } from "react"
import { GrLocation } from "react-icons/gr"
import { FiMail, FiPhone } from "react-icons/fi"
import {
    FooterContainer,
    StyledContainer,
} from "@/components/footer/footer.styles"
import { request } from "@/utils/request"

export const Footer = () => {
    const [city, setCity] = useState("")
    const [temperature, setTemperature] = useState("")
    const [weather, setWeather] = useState("")

    useEffect(() => {
        request("/weather/Moscow").then(({ name, main, weather }) => {
            setCity(name)
            setTemperature(Math.round(main.temp))
            setWeather(weather[0].description)
        })
    }, [])

    return (
        <FooterContainer>
            <StyledContainer>
                <div>
                    <span className="logo">Denel</span>Sneakers.© 2025
                </div>
                All rights reserved
            </StyledContainer>
            <StyledContainer>
                <div className="container">
                    <FiPhone size={18} />8 (800) 555-35-35
                </div>
                <div className="container">
                    <FiMail size={18} />
                    denelsneakers@gmail.com
                </div>
            </StyledContainer>
            <StyledContainer>
                <div className="container">
                    <GrLocation size={18} />
                    Denel Sneakers
                </div>
                1234 Shoe Street, Moscow City, CA 86423
            </StyledContainer>
            <StyledContainer>
                <div>
                    {city},{" "}
                    {new Date().toLocaleString("eng", {
                        day: "numeric",
                        month: "long",
                    })}
                </div>
                <div>
                    {temperature}°C, {weather}
                </div>
            </StyledContainer>
        </FooterContainer>
    )
}
