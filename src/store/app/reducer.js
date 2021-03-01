import { reducer } from "@/store/reducer"

const defaultState = {
  headerHeight: 0
}

export const app = reducer({
  defaultState,

  handlers: {
    "app:headerMounted"(state, { height }) {
      return {
        ...state,
        headerHeight: height
      }
    }
  }
})
