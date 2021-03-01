import PropTypes from "prop-types"
import { useTranslations } from "next-intl"
import clsx from "clsx"
import { Icon } from "@/components/icon"
import styles from "./styles.module.scss"

export function MenuToggle({ variant }) {
  const t = useTranslations("components.menuToggle")
  const classes = clsx(styles["menu-toggle"], {
    [styles["menu-toggle--large"]]: variant === "large"
  })

  return (
    <Icon
      symbolId="menu"
      className={classes}
      role="button"
      tabIndex="0"
      aria-label={t("ariaLabel")} />
  )
}

MenuToggle.propTypes = {
  variant: PropTypes.oneOf(["small", "large"])
}
