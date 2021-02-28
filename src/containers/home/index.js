import PropTypes from "prop-types"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Title } from "@/components/title"
import { Hero } from "@/components/hero"
import styles from "./styles.module.scss"

export function Home({ posts }) {
  const t = useTranslations("containers.home")
  const st = useTranslations("shared")

  return (
    <>
      <Title pageTitle={t("pageTitle")} />
      <Hero title={st("siteSubTitle")} />
      <section className={styles["main-content"]}>
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
      </section>
    </>
  )
}

Home.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired
}
