const siteTitle = "bob.yexley.net"

export const translations = {
  shared: {
    siteTitle,
    siteSubTitle: "software development, sports, the outdoors, faith, life..."
  },
  components: {
    title: {
      pageTitle: `{pageTitle} / ${siteTitle}`
    },
    menuToggle: {
      ariaLabel: "toggle menu"
    },
    scrollHint: {
      ariaLabel: "scroll to content"
    }
  },
  containers: {
    app: {
      siteTitle
    },
    home: {
      siteTitle,
      pageTitle: "Home (next)"
    }
  },
  pages: {}
}
