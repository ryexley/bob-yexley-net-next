import { useEffect, useState, useRef } from "react"
import { useDispatch } from "react-redux"
import Link from "next/link"
import clsx from "clsx"
import { settings } from "@/settings"
import { headerMounted } from "@/store/app/actions"
import { withWindow } from "@/util"
import styles from "./styles.module.scss"

export function Header() {
  const header = useRef()
  const sensor = useRef("100px")
  const dispatch = useDispatch()
  const [showSmallHeader, setShowSmallHeader] = useState(false)

  useEffect(() => {
    sensor.current = header.current.clientHeight

    withWindow(window => {
      window.addEventListener(
        "scroll",
        checkSensor
      )
    })

    dispatch(headerMounted(header.current.clientHeight))

    return () => {
      withWindow(window => {
        window.removeEventListener(
          "scroll",
          checkSensor
        )
      })
    }
  }, [dispatch])

  const checkSensor = () => {
    withWindow(window => {
      window.requestAnimationFrame(() => {
        const { pageYOffset } = window
        setShowSmallHeader(pageYOffset > sensor.current)
      })
    })
  }

  const avatarClasses = clsx(styles.avatar, {
    small: showSmallHeader
  })

  return (
    <header
      className={styles.header}
      ref={header}>
      <Link href="/">
        <a>
          <img
            src={settings.avatar}
            alt={settings.siteTitle}
            className={avatarClasses} />
          <div className={styles.text}>
            <h1>{settings.siteTitle}</h1>
            <h2>{settings.siteSubtitle}</h2>
          </div>
        </a>
      </Link>
    </header>
  )
}
