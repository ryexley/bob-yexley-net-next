import { useEffect, useState, useRef } from "react"
import { useDispatch } from "react-redux"
import Link from "next/link"
import clsx from "clsx"
import throttle from "lodash.throttle"
import { MenuToggle } from "@/components/menu-toggle"
import { settings } from "@/settings"
import { headerMounted } from "@/store/app/actions"
import { withWindow } from "@/util"
import { TIME } from "@/enums"
import styles from "./styles.module.scss"

export function Header() {
  const header = useRef()
  const sensor = useRef("100px")
  const dispatch = useDispatch()
  const [scrolledPastSensor, setScrolledPastSensor] = useState(false)

  useEffect(() => {
    sensor.current = header.current.clientHeight

    const checkSensor = throttle(() => {
      withWindow(window => {
        window.requestAnimationFrame(() => {
          const { pageYOffset } = window
          setScrolledPastSensor(pageYOffset > sensor.current)
        })
      })
    }, TIME.ONE_HALF_SECOND)

    withWindow(window => {
      window.addEventListener(
        "scroll",
        checkSensor
      )
    })

    dispatch(headerMounted({
      header: {
        height: `${sensor.current}px`
      }
    }))

    return () => {
      withWindow(window => {
        window.removeEventListener(
          "scroll",
          checkSensor
        )
      })
    }
  }, [dispatch])

  const headerClasses = clsx(styles.header, {
    [styles["header--small"]]: scrolledPastSensor
  })

  const avatarClasses = clsx(styles.avatar, {
    [styles["avatar--small"]]: scrolledPastSensor
  })

  const subtitleClasses = clsx(styles.subtitle, {
    [styles["subtitle--hidden"]]: scrolledPastSensor
  })

  return (
    <header
      className={headerClasses}
      ref={header}>
      <Link href="/">
        <a>
          <img
            src={settings.avatar}
            alt={settings.siteTitle}
            className={avatarClasses} />
          <div className={styles.headings}>
            <div className={styles.title}>{settings.siteTitle}</div>
            <div className={subtitleClasses}>{settings.siteSubtitle}</div>
          </div>
        </a>
      </Link>
      <MenuToggle
        variant={scrolledPastSensor ? "small" : "large"} />
    </header>
  )
}
