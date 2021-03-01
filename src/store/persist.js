import { isEmpty, withWindow } from "@/util"
import { StatePersistenceError } from "@/errors/state-persistence-error"

const STATE_PERSISTENCE_KEY = "bob.yexley.net"

function saveToLocalStorage(data) {
  try {
    withWindow(window => {
      window.localStorage.setItem(
        STATE_PERSISTENCE_KEY,
        JSON.stringify(data)
      )
    })
  } catch (err) {
    throw new StatePersistenceError(err)
  }
}

function reduceState(state) {
  // const {} = state

  return {}
}

export function saveState(state) {
  const reducedState = reduceState(state)
  saveToLocalStorage(reducedState)
}

export function loadState() {
  try {
    return withWindow(window => {
      const serializedState = window.localStorage.getItem(STATE_PERSISTENCE_KEY)

      if (isEmpty(serializedState)) {
        return undefined
      }

      const state = JSON.parse(serializedState)

      return state
    })
  } catch (err) {
    return undefined
  }
}
