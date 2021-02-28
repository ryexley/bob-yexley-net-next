import PropTypes from "prop-types"
import { Container } from "@/components/container"

export function Layout({ children }) {
  return (
    <main>
      <Container>
        {children}
      </Container>
    </main>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.object
  ])
}
