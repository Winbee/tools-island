import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import AstroPWA from "@vite-pwa/astro";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://winbee.github.com",
  base: "/tools-island",
  integrations: [
    starlight({
      title: "Tools island",
      logo: {
        light: "./src/assets/island-color.svg",
        dark: "./src/assets/island-color-dark.svg",
      },
      customCss: ["./src/styles/custom.css"],
      components: {
        ThemeSelect: "./src/components/ThemeSelect.astro",
        SiteTitle: "./src/components/CustomSiteTitle.astro",
      },
      social: {
        github: "https://github.com/Winbee/tools-island",
      },
      tableOfContents: false,
      pagination: false,
      sidebar: [
        {
          label: "Tools",
          autogenerate: { directory: "tools" },
        },
      ],
      head: [
        {
          tag: "link",
          attrs: {
            rel: "manifest",
            href: "/tools-island/manifest.webmanifest",
          },
        },
      ],
    }),
    svelte(),
    tailwind({
      applyBaseStyles: false,
    }),
    AstroPWA({
      mode: "production",
      base: "/tools-island/",
      scope: "/tools-island/",
      includeAssets: ["/tools-island/favicon.svg"],
      manifest: {
        name: "Tools island",
        short_name: "Tools island",
        description: "Various JS tools/utils built in a static site",
        background_color: "#ffffff",
        theme_color: "#c7d2fe",
        display: "minimal-ui",
        icons: [
          {
            src: "/tools-island/favicons/favicon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/tools-island/favicons/favicon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/tools-island/screenshots/screenshot1.png",
            sizes: "2608x1356",
            type: "image/png",
            form_factor: "wide",
            label: "View of the date converter",
          },
          {
            src: "/tools-island/screenshots/screenshot2.png",
            sizes: "572x1266",
            type: "image/png",
            label: "View of the table of content",
          },
        ],
      },
      workbox: {
        navigateFallback: "/",
        globPatterns: ["**/*.{css,js,html,svg,png,ico,txt}"],
      },
      devOptions: {
        enabled: false,
        navigateFallbackAllowlist: [/^\/$/],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
    }),
  ],
});
