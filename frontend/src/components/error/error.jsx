import { Container } from "@/components/error/error.styles"

export const Error = ({ error }) =>
    error && (
        <Container>
            <h1>An error occurred</h1>
            <div>{error}</div>
        </Container>
    )
