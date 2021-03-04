import { getSortedPosts } from "@/lib/posts"
// import { optimizeImages } from "@/lib/images"
import { Home } from "@/containers/home"

export default Home

export async function getStaticProps() {
  const posts = getSortedPosts()
  for (const post of posts) {
    // TODO: use `post.coverImage` and optimize
    // cover image by resizing with sharp lib

    // console.log({ post })
    // const { postFolder } = post
    // await optimizeImages(postFolder)
  }

  return {
    props: {
      posts
    }
  }
}
