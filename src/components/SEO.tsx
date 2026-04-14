import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

const DEFAULT_TITLE = 'Torodevelopment — Web & Digital Marketing Agency'
const DEFAULT_DESCRIPTION = 'We listen first, then we build. Web development and digital marketing services tailored to your business — from startups to enterprise.'
const DEFAULT_IMAGE = 'https://torodevelop.com/og-image.jpg'
const SITE_URL = 'https://torodevelop.com'

export default function SEO({ title, description, image, url }: SEOProps) {
  const fullTitle = title ? `Torodevelopment | ${title}` : DEFAULT_TITLE
  const metaDescription = description || DEFAULT_DESCRIPTION
  const metaImage = image || DEFAULT_IMAGE
  const metaUrl = url ? `${SITE_URL}${url}` : SITE_URL

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={metaUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Torodevelopment" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  )
}