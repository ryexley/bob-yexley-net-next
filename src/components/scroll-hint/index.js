import PropTypes from "prop-types"
import clsx from "clsx"
import styles from "./styles.module.scss"

export function ScrollHint({
  inlineStyle,
  className,
  onClick
}) {
  const classes = clsx(styles.container, className)

  return (
    <div
      role="button"
      className={classes}
      style={inlineStyle}
      onClick={onClick}
      tabIndex="0"
      onKeyUp={() => {}}>
      <div className={styles["mouse-hint"]}>
        <div className={styles.scroll} />
      </div>
    </div>
  )
}

ScrollHint.propTypes = {
  inlineStyle: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func
}
