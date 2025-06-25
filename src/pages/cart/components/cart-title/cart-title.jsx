import styled from "styled-components"

const CartTitleContainer = ({ className }) => (
    <div className={ className }>
        <h2>Your cart is empty</h2>
    </div>
)

export const CartTitle = styled(CartTitleContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
`
