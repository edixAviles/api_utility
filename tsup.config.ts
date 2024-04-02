import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },
  clean: true,
  dts: "src/index.ts",
  esbuildPlugins: [],
  external: [],
  format: ["esm", "cjs"],
  target: "es2020",
})