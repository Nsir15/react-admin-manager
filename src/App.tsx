import { RouterProvider } from "react-router-dom"
import { ConfigProvider, App as AntdApp, theme } from "antd"
import AntdGlobal from "./utils/AntdGlobal"
import router from "./router"
import "@/styles/theme.scss"
import "./App.scss"
import useStore from "./store"

function App() {
  // return <RouterProvider router={router}></RouterProvider>;
  const isDark = useStore(state => {
    return state.theme === "dark"
  })

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: "#fa8c16",
          colorInfo: "#fa8c16"
          // 派生变量，影响范围小
          // colorBgContainer: '#f6ffed'
        },
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
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
