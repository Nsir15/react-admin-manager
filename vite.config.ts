import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { createHtmlPlugin } from "vite-plugin-html"

const envMap: Record<string, string> = {
  development: "dev",
  production: "prod",
  staging: "stg"
}
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // const env = loadEnv(mode, process.cwd());
  const envValue = envMap[mode]

  console.log("mode:", mode)
  console.log("envValue:", envValue)

  return {
    server: {
      proxy: {
        // '/api': 'http://api-driver.marsview.cc'
        "/mockApi": "http://localhost:5173"
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    },
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: "index",
            dataEnv: envValue
          }
        }
      })
    ]
  }
})
