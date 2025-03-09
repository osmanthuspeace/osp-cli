import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    // 指定 setup 文件
    setupFiles: ["./vitest.setup.ts"],

    // 为了测试server sction，需要指定环境为 node，否则应该是 jsdom
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
