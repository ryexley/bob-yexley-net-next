import fs from "fs"
import path from "path"
import walk from "walk-sync"
import sharp from "sharp"

const imageExtensions = [".jpg", ".jpeg", ".png"]

export async function optimizeImages(folder) {
  const entries = walk(folder)

  for (const entry of entries) {
    const entryPath = path.join(folder, entry)
    const entryInfo = fs.lstatSync(entryPath)
    const isImage = (
      entryInfo.isFile() &&
      imageExtensions.includes(path.extname(entryPath))
    )

    if (isImage) {
      await optimizeImage({
        imageName: entry,
        imagePath: entryPath,
        folder
      })
    }
  }
}

async function optimizeImage({ imageName, imagePath, folder }) {
  // console.log(`optimizing image: ${imagePath}`)
  const { height, width } = await sharp(imagePath).metadata()
  console.log(`${imageName} (${path.basename(imageName, path.extname(imageName))}) -- height: ${height} x width: ${width}`)
  await sharp(imagePath).resize({
    width: 320,
    height: 320,
    fit: "inside"
  }).toFile(path.resolve(folder, `${path.basename(imageName, path.extname(imageName))}-320${path.extname(imagePath)}`))
}
