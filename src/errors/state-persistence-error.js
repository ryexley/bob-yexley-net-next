export class StatePersistenceError extends Error {
  constructor(...args) {
    super(...args)
    this.name = "StatePersistenceError"

    if (Error.captureStackTrace && typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, StatePersistenceError)
    }
  }
}
