export async function getTranslations({ locale, defaultLocale }) {
  const { translations } = await import(`./translations/${locale || defaultLocale}`)

  return translations
}
