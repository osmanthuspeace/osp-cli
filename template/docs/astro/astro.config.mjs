import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  integrations: [
    starlight({
      title: {
        en: "Osmanthus-UI docs",
        "zh-cn": "Osmanthus-UI 文档",
      },
      defaultLocale: "root",
      locales: {
        root: {
          label: "English",
          lang: "en",
        },
        "zh-cn": {
          label: "简体中文",
          lang: "zh-CN",
        },
      },
      sidebar: [
        {
          label: "Getting Started",
          translations: {
            "zh-cn": "快速上手",
          },
          autogenerate: { directory: "getting-started" },
        },
        {
          label: "Components",
          translations: {
            "zh-cn": "组件",
          },
          autogenerate: { directory: "components" },
        },
      ],
      customCss: ["./src/styles/custom.css"],
    }),
  ],
  output: "static"
});
