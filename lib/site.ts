export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://aestheticinteriorstudio.com"

export const siteName = "Aesthetic Interior Studio"

export function absoluteUrl(path: string) {
  if (!path.startsWith("/")) return `${siteUrl}/${path}`
  return `${siteUrl}${path}`
}
