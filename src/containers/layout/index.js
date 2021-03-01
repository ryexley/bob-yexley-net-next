import PropTypes from "prop-types"

export function Layout({ children }) {
  return (
    <main>
      {children}
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
