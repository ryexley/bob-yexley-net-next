import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import styles from "./styles.module.scss"
import { settings } from "@/settings"
import { withWindow } from "@/util"

const defaultState = {
  backgroundImageOffset: 0,
  titleOffset: 0,
  titleOpacity: 1,
  scrollHintOpacity: 1
}

export function Hero({
  variant,
  title
}) {
  const [state, setState] = useState(defaultState)

  useEffect(() => {
    withWindow(window => {
      window.addEventListener("scroll", parallaxShift)
    })

    return () => {
      withWindow(window => {
        window.removeEventListener("scroll", parallaxShift)
      })
    }
  }, [])

  const parallaxShift = () => {
    withWindow(window => {
      const { pageYOffset } = window
      const calculatedTitleOpacity = ((100 - (pageYOffset * 0.085)) / 100)
      const calculatedScrollHintOpacity = ((100 - (pageYOffset * 0.15)) / 100)

      setState(() => ({
        backgroundImageOffset: (pageYOffset * 0.25),
        titleOffset: -(pageYOffset * 0.4),
        titleOpacity: (calculatedTitleOpacity > 0) ? calculatedTitleOpacity : 0,
        scrollHintOpacity: (calculatedScrollHintOpacity > 0) ? calculatedScrollHintOpacity : 0
      }))
    })
  }

  const {
    backgroundImageOffset,
    titleOffset,
    titleOpacity,
    scrollHintOpacity
  } = state

  const heroInlineStyles = {
    backgroundImage: `url(${settings.siteHeroImage})`,
    backgroundPositionY: backgroundImageOffset,
    minHeight: (variant === "full") ? "100vh" : "50vh"
  }

  const titleInlineStyles = {
    bottom: titleOffset,
    opacity: titleOpacity
  }

  return (
    <div
      className={styles.hero}
      style={heroInlineStyles}>
      <h1 style={titleInlineStyles}>{title}</h1>
    </div>
  )
}

Hero.propTypes = {
  variant: PropTypes.oneOf(["full", "half"]),
  title: PropTypes.string
}

Hero.defaultProps = {
  variant: "full"
}
