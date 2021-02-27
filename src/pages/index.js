import { getSortedPosts } from "@/lib/posts"
import { Home } from "@/containers/home"

export default Home

export async function getStaticProps() {
  const posts = getSortedPosts()

  return {
    props: {
      posts
    }
  }
}
