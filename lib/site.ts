export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://interiorconceptsstudio.com"

export const siteName = "Interior Concepts Studio"

export function absoluteUrl(path: string) {
  if (!path.startsWith("/")) return `${siteUrl}/${path}`
  return `${siteUrl}${path}`
}
