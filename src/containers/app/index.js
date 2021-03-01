import NextApp from "next/app"
import Head from "next/head"
import PropTypes from "prop-types"
import { NextIntlProvider, IntlErrorCode } from "next-intl"
import { Provider } from "react-redux"
import { createStore } from "@/store"
import { getTranslations } from "@/lang"
import { Layout } from "@/containers/layout"

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

/* eslint-disable max-len */
const headContentLinks = {
  favicon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👽</text></svg>",
  googleFonts: "https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,600;1,400;1,600&display=swap"
}
/* eslint-enable max-len */

const store = createStore()

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
          href={headContentLinks.favicon} />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href={headContentLinks.googleFonts} />
      </Head>
      <NextIntlProvider
        messages={translations}
        onError={onIntlError}
        getMessageFallback={getMessageFallback}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </NextIntlProvider>
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
