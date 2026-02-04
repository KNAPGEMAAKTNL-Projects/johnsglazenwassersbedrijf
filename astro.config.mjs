import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://johnsglazenwassersbedrijf.nl',
    trailingSlash: 'always',
    integrations: [sitemap()],
    adapter: cloudflare(),
    vite: {
        plugins: [tailwind()],
    },
});
