import { ogSize, renderOgImage } from "@/lib/og-image"
import { UI } from "@/lib/i18n"

export const alt = UI.nl.title
export const size = ogSize
export const contentType = "image/png"

export default function Image() {
  return renderOgImage("nl")
}
