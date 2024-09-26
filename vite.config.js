import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import { terser } from "rollup-plugin-terser";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    { enforce: "pre", ...mdx() },
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    terser({
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      output: {
        comments: false,
      },
    }),
    legacy({
      targets: ["defaults", "not IE 11", "iOS >= 10"],
    }),
  ],
});
