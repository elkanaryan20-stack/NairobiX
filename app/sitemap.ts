import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.nairobix.com',
      lastModified: new Date(),
    },
    {
      url: 'https://www.nairobix.com/about',
      lastModified: new Date(),
    },
    {
      url: 'https://www.nairobix.com/services',
      lastModified: new Date(),
    },
    {
      url: 'https://www.nairobix.com/partnership',
      lastModified: new Date(),
    },
  ]
}