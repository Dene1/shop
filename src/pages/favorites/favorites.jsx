import styled from "styled-components"

const FavoritesContainer = ({className}) => {
    return (
        <div className={className}>
            <h1>В разработке ...
                <br />Будет позже
            </h1>
        </div>
    )
}


export const Favorites = styled(FavoritesContainer)`
    display: flex;
    flex-direction: column;
    padding-inline: 3rem;
    margin: 0 auto;
    align-items: center;
    text-align: center;
`
