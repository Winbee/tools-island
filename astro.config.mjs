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
        // Override the default `ThemeSelect` component.
        ThemeSelect: "./src/components/ThemeSelect.astro",
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
    }),
    svelte(),
    tailwind({
      applyBaseStyles: false,
    }),
    AstroPWA(),
  ],
});
