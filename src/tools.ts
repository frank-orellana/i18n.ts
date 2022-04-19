/** Matches a given language to the list of available languages
 * i.e es-ES might be matched to es if es-ES is not available
 */
export function matchLang(
  lang: string,
  availableLanguages: Map<string, any>,
  defaultLang: string
): string {
  if (availableLanguages.has(lang)) return lang;
  else if (availableLanguages.has(lang.substring(0, 2)))
    return lang.substring(0, 2);
  else return defaultLang;
}
