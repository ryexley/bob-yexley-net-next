export const app = ({ app: appState }) => {
  const {
    header,
    mainContent,
    mainMenuIsOpen
  } = appState

  return {
    header,
    mainContent,
    mainMenuIsOpen
  }
}
