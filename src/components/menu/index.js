import PropTypes from "prop-types"
import clsx from "clsx"
import { useDispatch } from "react-redux"
import { Icon } from "@/components/icon"
import { toggleMainMenu } from "@/store/app/actions"
import { settings } from "@/settings"
import styles from "./styles.module.scss"

export function Menu({ show }) {
  const dispatch = useDispatch()
  const menuClasses = clsx(styles.menu, {
    [styles["menu--is-visible"]]: show
  })

  // TODO: handle keyboard event, and close the menu when
  // the user presses the escape key

  return (
    <nav
      className={menuClasses}>
      <header>
        <div>
          <img
            src={settings.avatar}
            alt={settings.siteTitle}
            className={styles.avatar} />
          <div className={styles.title}>{settings.siteTitle}</div>
        </div>
        <Icon
          symbolId="close"
          className={styles["close-button"]}
          role="button"
          tabIndex="0"
          onClick={() => dispatch(toggleMainMenu())} />
      </header>
      <footer></footer>
    </nav>
  )
}

Menu.propTypes = {
  show: PropTypes.bool.isRequired
}

Menu.defaultProps = {
  show: false
}
