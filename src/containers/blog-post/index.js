import PropTypes from "prop-types"
import Head from "next/head"
import hydrate from "next-mdx-remote/hydrate"
import styles from "./styles.module.scss"

export const components = {}

export function BlogPost({ metadata, source }) {
  const content = hydrate(source, { components })

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
      </Head>
      <article className={styles["blog-post"]}>
        {content}
      </article>
    </>
  )
}

BlogPost.propTypes = {
  metadata: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired
}
