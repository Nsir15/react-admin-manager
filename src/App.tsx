import { BrowserRouter } from "react-router-dom"
import { ConfigProvider, App as AntdApp } from "antd"
import "./App.css"
import Router from "./router"
import AntdGlobal from "./utils/AntdGlobal"

function App() {
  // return <RouterProvider router={router}></RouterProvider>;
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: "#e78c69"
          // 派生变量，影响范围小
          // colorBgContainer: '#f6ffed'
        }
      }}
    >
      <AntdApp>
        <AntdGlobal />
        <BrowserRouter>
          <Router></Router>
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
