import PropTypes from "prop-types"
import Head from "next/head"
import hydrate from "next-mdx-remote/hydrate"

export const components = {}

export function BlogPost({ metadata, source }) {
  const content = hydrate(source, { components })

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
      </Head>
      {content}
    </>
  )
}

BlogPost.propTypes = {
  metadata: PropTypes.object.isRequired,
  source: PropTypes.string.isRequired
}
