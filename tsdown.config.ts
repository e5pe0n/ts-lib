import { defineConfig } from "tsdown";

export default defineConfig({
  entry: "src/index.ts",
  attw: true,
  failOnWarn: true,
  format: ["esm", "cjs"],
  dts: true,
  tsconfig: "./tsconfig.build.json",
});
