import Head from "next/head"
import PropTypes from "prop-types"
import { Layout } from "@/containers/layout"

export function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👽</text></svg>" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

App.propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.object,
    PropTypes.func
  ]),
  pageProps: PropTypes.object
}
