import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Borah Tour & Travels — Northeast India Travel Specialist',
    short_name: 'Borah Tours',
    description:
      'Customized Meghalaya, Tawang, and Assam private tour packages with direct Guwahati airport transfers, local drivers, and curated itineraries.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#0284c7',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
