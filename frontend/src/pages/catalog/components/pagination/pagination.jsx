import { PaginationContainer } from "@/pages/catalog/components/pagination/pagination.styles"

export const Pagination = ({ page, lastPage, setPage }) => {
    return (
        <PaginationContainer>
            <button disabled={page === 1} onClick={() => setPage(1)}>
                In the beginning
            </button>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Previous
            </button>
            <div className="current-page">Page: {page}</div>
            <button
                disabled={page === lastPage}
                onClick={() => setPage(page + 1)}
            >
                Next
            </button>
            <button
                disabled={page === lastPage}
                onClick={() => setPage(lastPage)}
            >
                At the end
            </button>
        </PaginationContainer>
    )
}
