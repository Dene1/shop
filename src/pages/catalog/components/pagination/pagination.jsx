import styled from "styled-components"

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
    return (
        <div className={ className }>
            <button disabled={ page === 1 }
                    onClick={ () => setPage(1) }
            >В начало
            </button>
            <button disabled={ page === 1 }
                    onClick={ () => setPage(page - 1) }
            >Предыдущая
            </button>
            <div className="current-page">Страница: { page }</div>
            <button disabled={ page === lastPage }
                    onClick={ () => setPage(page + 1) }
            >Следующая
            </button>
            <button disabled={ page === lastPage }
                    onClick={ () => setPage(lastPage) }
            >В
                конец
            </button>
        </div>
    )
}

export const Pagination = styled(PaginationContainer)`
    display: flex;
    width: 73.6%;
    position: absolute;
    bottom: 140px;
    margin: 0 0 10px;
    padding: 0 35px;
    

    button {
        margin: 0 5px;
        width: 400px;
        height: 40px;
        font-size: 18px;
        font-weight: 500;
        text-align: center;
        border: 1px solid #5b6969;
        line-height: 26px;
        background-color: #dedede;
    }

    button:hover {
        cursor: pointer;
        background-color: transparent;
        color: #2C3333;
        border: 1px solid #5b6969;
    }

    button:disabled {
        cursor: not-allowed;
        background-color: #dedede;
        color: #2C3333;
    }

    .current-page {
        width: 100%;
        height: 40px;
        font-size: 18px;
        margin: 0 5px;
        font-weight: 500;
        text-align: center;
        border: 1px solid black;
        line-height: 36px;
    }
`
