import PropTypes from "prop-types"
import Head from "next/head"
import { useTranslations } from "next-intl"

export function Title({ pageTitle }) {
  const t = useTranslations("components.title")

  return (
    <Head>
      <title>{t("pageTitle", { pageTitle })}</title>
    </Head>
  )
}

Title.propTypes = {
  pageTitle: PropTypes.string
}
