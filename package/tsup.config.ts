import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  splitting: false,
  sourcemap: true,
  clean: false,
  dts: false,
  platform: "browser",
  onSuccess: "tsc --project tsconfig.declarations.json",
});
