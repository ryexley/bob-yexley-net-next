export function headerMounted({ header }) {
  return {
    type: "app:headerMounted",
    header
  }
}

export function layoutMounted({ mainContent }) {
  return {
    type: "app:mainContentMounted",
    mainContent
  }
}
