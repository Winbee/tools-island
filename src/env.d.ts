/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
  StarlightThemeProvider: {
    updatePickers(theme?: string): void;
  };
}
