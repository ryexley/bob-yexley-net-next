import grayMatter from "gray-matter"
import renderToString from "next-mdx-remote/render-to-string"
import { getAllPostPaths, getPost } from "@/lib/posts"
import { BlogPost, components } from "@/containers/blog-post"

export default BlogPost

export async function getStaticPaths() {
  const paths = getAllPostPaths()

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const post = getPost(params.slug)
  const { data: metadata, content } = grayMatter(post)
  const source = await renderToString(content, {
    components,
    scope: metadata
  })

  return {
    props: {
      metadata,
      source
    }
  }
}
