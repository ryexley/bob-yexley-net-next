import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { Header } from "@/components/header"
import { appState } from "@/store/app/selectors"
import styles from "./styles.module.scss"

export function Layout({ children }) {
  const { headerHeight } = useSelector(appState)

  return (
    <>
      <Header />
      <main
        className={styles["main-content"]}
        style={{ marginTop: headerHeight }}>
        {children}
      </main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.object
  ])
}
