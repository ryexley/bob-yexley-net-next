import PropTypes from "prop-types"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import { useDispatch, useSelector } from "react-redux"
import { app } from "@/store/app/selectors"
import { toggleMainMenu } from "@/store/app/actions"
import { Icon } from "@/components/icon"
import styles from "./styles.module.scss"

export function MenuToggle({ variant }) {
  const t = useTranslations("components.menuToggle")
  const dispatch = useDispatch()
  const { mainMenuIsOpen } = useSelector(app)
  const classes = clsx(styles["menu-toggle"], {
    [styles["menu-toggle--large"]]: variant === "large"
  })

  return (
    <Icon
      symbolId="menu"
      className={classes}
      role="button"
      tabIndex="0"
      aria-label={t("ariaLabel")}
      onClick={() => dispatch(toggleMainMenu())} />
  )
}

MenuToggle.propTypes = {
  variant: PropTypes.oneOf(["small", "large"]),
  menuIsOpen: PropTypes.bool
}

MenuToggle.defaultProps = {
  menuIsOpen: false
}
