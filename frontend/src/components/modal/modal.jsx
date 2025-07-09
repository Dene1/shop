import styled from "styled-components"

const ProductModalContainer = ({ className, text }) => {
    return (
        <div className={ className }>
            <div className="notification-text">{ text }</div>
        </div>
    )
}

export const Modal = styled(ProductModalContainer)`
    position: fixed;
    top: 10px;
    left: 82%;
    transform: translateX(-50%);
    width: 300px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    background-color: #f0f0f0;
    padding: 8px 20px;
    border: 1px solid #EA454C;
    border-radius: 5px;
    z-index: 50;

    .notification-text {
        text-transform: uppercase;
        text-align: center;
    }
`
