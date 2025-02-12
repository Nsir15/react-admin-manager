import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import "antd/dist/reset.css" // 引入 antd 重置样式

import { worker } from "./mocks/browser"

if (import.meta.env.DEV) {
  worker.start().then(() => {
    createRoot(document.getElementById("root")!).render(
      // <StrictMode>
      <App />
      // </StrictMode>,
    )
  })
} else {
  createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    <App />
    // </StrictMode>,
  )
}
