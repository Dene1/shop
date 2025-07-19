import { Container } from "@/components/content/content.styles"

export const Content = ({ children, error }) =>
    error ? (
        <Container>
            <h1>An error occurred</h1>
            <div>{error}</div>
        </Container>
    ) : (
        <Container>{children}</Container>
    )
