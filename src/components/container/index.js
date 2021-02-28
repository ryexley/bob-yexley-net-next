import PropTypes from "prop-types"
import styles from "./style.module.scss"

export function Container({ children }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.object
  ])
}
