import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"
import { componentTagger } from "lovable-tagger"
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/creators/",
  server: {
    host: "::",
    port: 8080,
    // Add the proxy configuration here
    proxy: {
      // Any request starting with '/api' will be forwarded
      '/api': {
        target: 'https://aispaces.in/creators', // Your backend Express server address
        changeOrigin: true, // Recommended for security and proper header forwarding
      },
    }
  },
  plugins: [
    react(),
    svgr({
      // SVGR options
      svgrOptions: {
        exportType: "default",
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: "**/*.svg?react",
    }),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))
