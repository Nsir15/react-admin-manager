import { RouterProvider } from "react-router-dom"
import { ConfigProvider, App as AntdApp } from "antd"
import AntdGlobal from "./utils/AntdGlobal"
import router from "./router"
import "./App.css"

function App() {
  // return <RouterProvider router={router}></RouterProvider>;
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: "#fa8c16",
          colorInfo: "#fa8c16"
          // 派生变量，影响范围小
          // colorBgContainer: '#f6ffed'
        }
      }}
    >
      <AntdApp className='container-app'>
        <AntdGlobal />
        {/* <BrowserRouter>
          <Router></Router>
        </BrowserRouter> */}
        <RouterProvider router={router}></RouterProvider>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
