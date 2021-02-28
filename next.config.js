const path = require("path")

const withMDX = require("@next/mdx")({
  extension: /\.(md|mdx)$/
})

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  webpack: config => {
    return config
  },
  sassOptions: {
    includePaths: [
      path.join(__dirname, "src/styles")
    ]
  }
})
