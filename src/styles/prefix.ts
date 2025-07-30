const APP_PREFIX = "sdkg-"

export function appPrefixClassname(component: string) {
  return `${APP_PREFIX}${component}`
}
