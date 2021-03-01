import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { Icons } from "@/components/icon"
import { Header } from "@/components/header"
import { layoutMounted } from "@/store/app/actions"
import { computedLayout } from "@/store/app/selectors"
import { withWindow } from "@/util"
import styles from "./styles.module.scss"

export function Layout({ children }) {
  const mainContent = useRef()
  const dispatch = useDispatch()
  const {
    header: {
      height: headerHeight
    },
    mainContent: {
      marginTop
    }
  } = useSelector(computedLayout)

  useEffect(() => {
    withWindow(window => {
      if (mainContent.current) {
        const mainContentStyle = window.getComputedStyle(mainContent.current)
        const mainContentComputedStyles = {
          marginBottom: mainContentStyle["margin-bottom"],
          marginLeft: mainContentStyle["margin-left"],
          marginRight: mainContentStyle["margin-right"],
          marginTop: mainContentStyle["margin-top"]
        }

        dispatch(layoutMounted({
          mainContent: mainContentComputedStyles
        }))
      }
    })
  }, [dispatch])

  const mainContentStyle = {
    marginTop: `calc(${headerHeight} + ${marginTop})`
  }

  return (
    <>
      <Icons />
      <Header />
      <main
        ref={mainContent}
        className={styles["main-content"]}
        style={mainContentStyle}>
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
