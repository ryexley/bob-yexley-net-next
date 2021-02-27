import PropTypes from "prop-types"
import Head from "next/head"
import Link from "next/link"

export function Home({ posts }) {
  return (
    <>
      <Head>
        <title>bob.yexley.net / next</title>
      </Head>
      <h1>bob.yexley.net / next</h1>
      {posts.map(post => (
        <div key={post.slug}>
          <Link href="/[slug]" as={`/${post.slug}`}>
            <a>
              <h1>{post.title}</h1>
              <p>{post.blurb}</p>
              <footer>{post.date}</footer>
            </a>
          </Link>
        </div>
      ))}
    </>
  )
}

Home.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired
}
