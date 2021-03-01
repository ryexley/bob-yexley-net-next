import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import throttle from "lodash.throttle"
import { loadState, saveState } from "@/store/persist"
import { app } from "@/store/app/reducer"
import { TIME } from "@/enums"

export function createStore() {
  const preloadedState = loadState()

  const store = configureStore({
    reducer: {
      app
    },
    middleware: [
      thunk.withExtraArgument({/* inject dependencies here */})
    ],
    preloadedState
  })

  store.subscribe(
    throttle(
      () => saveState(store.getState()),
      TIME.ONE_SECOND
    )
  )

  return store
}
