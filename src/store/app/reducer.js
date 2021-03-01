import { reducer } from "@/store/reducer"

const defaultState = {
  header: {
    height: 0
  },
  mainContent: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0
  }
}

export const app = reducer({
  defaultState,

  handlers: {
    "app:headerMounted"(state, { header }) {
      return {
        ...state,
        header
      }
    },

    "app:mainContentMounted"(state, { mainContent }) {
      return {
        ...state,
        mainContent
      }
    }
  }
})
