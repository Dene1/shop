import styled from "styled-components"
import {Button} from "../../../../components/index.js"

const PaginationContainer = ({className, page, lastPage, setPage}) => {
    return (
        <div className={className}>
            <button disabled={page === 1} onClick={() => setPage(1)}>В начало</button>
            <button disabled={page === 1}
                    onClick={() => setPage(page - 1)}>Предыдущая</button>
            <div className="current-page">Страница: {page}</div>
            <button disabled={page === lastPage}
                    onClick={() => setPage(page + 1)}>Следующая</button>
            <button disabled={page === lastPage} onClick={() => setPage(lastPage)}>В
                конец</button>
        </div>
    )
}

export const Pagination = styled(PaginationContainer)`
    display: flex;
    position: absolute;
    width: 76.3%;
    bottom: 160px;
    right: 100px;
    margin: 0 0 20px;
    padding: 0 35px;

    button {
        margin: 0 5px;
        width: 400px;
        height: 40px;
        font-size: 18px;
        font-weight: 500;
        text-align: center;
        border: 1px solid black;
        line-height: 26px;
        background-color: #dedede;
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
