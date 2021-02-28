import NextApp from "next/app"
import Head from "next/head"
import PropTypes from "prop-types"
import { NextIntlProvider, IntlErrorCode } from "next-intl"
import { getTranslations } from "@/lang"
import { Layout } from "@/containers/layout"
import { favicon } from "@/util/favicon"

function onIntlError(error) {
  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    console.warn(`⚠️ i18n MESSAGE MISSING: ${error.originalMessage}`)
  }
}

function getMessageFallback({ namespace, key, error }) {
  const path = [namespace, key].filter(part => part != null).join(".")

  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    return `${path} is not yet translated`
  } else {
    return `⚠️ Translation missing: ${path}`
  }
}

export function App({
  Component,
  pageProps,
  translations,
  err
}) {
  return (
    <>
      <Head>
        <link
          rel="icon"
          href={favicon} />
      </Head>
      <Layout>
        <NextIntlProvider
          messages={translations}
          onError={onIntlError}
          getMessageFallback={getMessageFallback}>
          <Component {...pageProps} />
        </NextIntlProvider>
      </Layout>
    </>
  )
}

App.getInitialProps = async context => {
  const { router } = context
  const { locale, defaultLocale } = router

  const translations = await getTranslations({
    locale,
    defaultLocale
  })

  const appProps = await NextApp.getInitialProps(context)

  return {
    ...appProps,
    locale,
    translations
  }
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
  translations: PropTypes.object,
  err: PropTypes.object
}
