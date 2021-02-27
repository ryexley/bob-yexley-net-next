import fs from "fs"
import path from "path"
import walk from "walk-sync"
import grayMatter from "gray-matter"
import { isNotEmpty } from "@/util"

const postsPath = "src/posts"
const postsDirectory = path.join(process.cwd(), postsPath)
const postExtensions = [".md", ".mdx"]

function getPosts() {
  const entries = walk(postsDirectory)

  return entries.map(entry => {
    const postRelativePath = path.join(postsPath, entry)
    const postFolderPath = path.dirname(postRelativePath)
    const entryPath = path.resolve(postsDirectory, entry)
    const entryInfo = fs.lstatSync(entryPath)
    const isPost = (
      entryInfo.isFile() &&
      postExtensions.includes(path.extname(entryPath))
    )

    if (isPost) {
      const fileContents = fs.readFileSync(entryPath, "utf8")
      const { data: metadata } = grayMatter(fileContents)
      const { date, cover } = metadata

      let coverImage = null
      if (isNotEmpty(cover)) {
        coverImage = path.join(postFolderPath, cover)
      }

      const frontMatter = {
        ...metadata,
        date: new Date(date).toLocaleDateString("en-US"),
        postFolder: postFolderPath,
        postFilePath: postRelativePath,
        ...isNotEmpty(coverImage) && { coverImage }
      }

      return frontMatter
    }
  }).filter(entry => isNotEmpty(entry))
}

export function getSortedPosts() {
  const allPostsData = getPosts()

  return allPostsData.sort((a, b) => {
    const isEarlier = (a.date < b.date)

    return isEarlier ? 1 : -1
  })
}

export function getAllPostPaths() {
  const posts = getSortedPosts()

  return posts.map(post => ({
    params: {
      slug: post.slug
    }
  }))
}

export function getPost(slug) {
  const posts = getPosts()
  const { postFilePath } = posts.find(post => post.slug === slug)
  const fullPostPath = path.join(process.cwd(), postFilePath)
  const postContent = fs.readFileSync(fullPostPath, "utf8")

  return postContent
}
