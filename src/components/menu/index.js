import PropTypes from "prop-types"
import clsx from "clsx"
import { useDispatch } from "react-redux"
import { Icon } from "@/components/icon"
import { toggleMainMenu } from "@/store/app/actions"
import styles from "./styles.module.scss"

export function Menu({ show }) {
  const dispatch = useDispatch()
  const menuClasses = clsx(styles.menu, {
    [styles["menu--is-visible"]]: show
  })

  return (
    <nav
      className={menuClasses}>
      <h2>Menu</h2>
      <Icon
        symbolId="close"
        className={styles["close-button"]}
        role="button"
        tabIndex="0"
        onClick={() => dispatch(toggleMainMenu())} />
    </nav>
  )
}

Menu.propTypes = {
  show: PropTypes.bool.isRequired
}

Menu.defaultProps = {
  show: false
}
