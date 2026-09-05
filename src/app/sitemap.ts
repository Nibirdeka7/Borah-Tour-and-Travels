import type { MetadataRoute } from 'next';

const PACKAGE_SLUGS = [
  'meghalaya-1day',
  'meghalaya-2d1n',
  'meghalaya-3d2n',
  'meghalaya-4d3n',
  'meghalaya-5d4n',
  'meghalaya-6d5n',
  'meghalaya-7d6n',
  'tawang-6d5n',
  'tawang-7d6n',
  'tawang-8d7n',
  'tawang-9d8n',
  'guwahati-1day',
  'kaziranga-2d1n',
  'kaziranga-3d2n',
  'assam-5d4n',
  'assam-6d5n',
];

const DESTINATION_SLUGS = ['circuit'];

const STATIC_ROUTES = [
  '',
  '/meghalaya',
  '/arunachal-pradesh',
  '/tawang',
  '/assam',
  '/about',
  '/contact',
  '/services',
  '/tours',
  '/destinations',
  '/travel-guide',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://borahtoursandtravel.com';
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const packageEntries: MetadataRoute.Sitemap = PACKAGE_SLUGS.map((slug) => ({
    url: `${baseUrl}/tours/${slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const destinationEntries: MetadataRoute.Sitemap = DESTINATION_SLUGS.map((slug) => ({
    url: `${baseUrl}/destinations/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...packageEntries, ...destinationEntries];
}
