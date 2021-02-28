import PropTypes from "prop-types"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Title } from "@/components/title"

export function Home({ posts }) {
  const t = useTranslations("containers.home")

  return (
    <>
      <Title pageTitle={t("pageTitle")} />
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
