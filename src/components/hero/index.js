import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import { ScrollHint } from "@/components/scroll-hint"
import { settings } from "@/settings"
import { app } from "@/store/app/selectors"
import { withWindow } from "@/util"
import styles from "./styles.module.scss"

const defaultState = {
  backgroundImageOffset: 0,
  titleOffset: 0,
  titleOpacity: 1,
  scrollHintOpacity: 1,
  calculatedBlur: 0
}

export function Hero({
  variant,
  title,
  onScrollHintClick
}) {
  const [state, setState] = useState(defaultState)
  const {
    header: {
      height: headerHeight
    },
    mainContent: {
      marginBottom,
      marginLeft,
      marginRight
    }
  } = useSelector(app)

  useEffect(() => {
    withWindow(window => {
      window.addEventListener(
        "scroll",
        parallaxShift
      )
    })

    return () => {
      withWindow(window => {
        window.removeEventListener(
          "scroll",
          parallaxShift
        )
      })
    }
  })

  const parallaxShift = () => {
    withWindow(window => {
      window.requestAnimationFrame(() => {
        const { pageYOffset /* innerHeight (used to calculate blur) */ } = window
        const calculatedTitleOpacity = ((100 - (pageYOffset * 0.085)) / 100)
        const calculatedScrollHintOpacity = ((100 - (pageYOffset * 0.15)) / 100)
        // const calculatedBlur = (((innerHeight - (innerHeight - pageYOffset)) / 1000) * 5)

        setState(() => ({
          backgroundImageOffset: (pageYOffset * 0.25),
          titleOffset: -(pageYOffset * 0.4),
          titleOpacity: (calculatedTitleOpacity > 0) ? calculatedTitleOpacity : 0,
          scrollHintOpacity: (calculatedScrollHintOpacity > 0) ? calculatedScrollHintOpacity : 0
          // calculatedBlur
        }))
      })
    })
  }

  const {
    backgroundImageOffset,
    titleOffset,
    titleOpacity,
    scrollHintOpacity
    // calculatedBlur
  } = state

  const heroInlineStyles = {
    backgroundImage: `url(${settings.siteHeroImage})`,
    backgroundPositionY: backgroundImageOffset,
    // filter: `blur(${calculatedBlur}px)`,
    marginBottom,
    marginLeft: `-${marginLeft}`,
    marginRight: `-${marginRight}`,
    marginTop: `calc(-${headerHeight} + -${marginBottom})`,
    minHeight: (variant === "full") ? "100vh" : "50vh"
  }

  const titleInlineStyles = {
    bottom: titleOffset,
    opacity: titleOpacity
  }

  const scrollHintInlineStyles = {
    opacity: scrollHintOpacity
  }

  return (
    <div
      className={styles.hero}
      style={heroInlineStyles}>
      <h1 style={titleInlineStyles}>{title}</h1>
      <ScrollHint
        inlineStyle={scrollHintInlineStyles}
        onClick={onScrollHintClick} />
    </div>
  )
}

Hero.propTypes = {
  variant: PropTypes.oneOf(["full", "half"]),
  title: PropTypes.string,
  onScrollHintClick: PropTypes.func
}

Hero.defaultProps = {
  variant: "full"
}
