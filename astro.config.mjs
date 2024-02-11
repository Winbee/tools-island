import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Tools Island",
      logo: {
        src: "./src/assets/island-logo-3.svg",
      },
      logo: {
        light: "./src/assets/island-logo-3.svg",
        dark: "./src/assets/island-logo-3-dark.svg",
      },
      customCss: ["./src/styles/custom.css"],
      components: {
        // Override the default `SocialIcons` component.
        ThemeSelect: "./src/components/ThemeSelect.astro",
      },
      social: {
        github: "https://github.com/withastro/starlight",
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
  ],
});
