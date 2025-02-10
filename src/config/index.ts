type Env = "dev" | "stg" | "prod"

// 获取 data-env 属性的值
const env: Env = (document.body.dataset.env || "stg") as Env
console.log("当前环境:", env)

const config = {
  dev: {
    baseApi: "http://localhost:3000",
    uploadApi: "http://localhost:3000/upload",
    cdn: "http://www.aliyun.com/",
    mock: false,
    mockApi: "https://www.fastmock.site/mock/2e09cb052a3be39cf2706f09e77d4ccd/api"
  },
  stg: {
    baseApi: "http://localhost:3000",
    uploadApi: "http://localhost:3000/upload",
    cdn: "http://www.aliyun.com/",
    mock: false,
    mockApi: "https://www.fastmock.site/mock/2e09cb052a3be39cf2706f09e77d4ccd/api"
  },
  prod: {
    baseApi: "http://localhost:3000",
    uploadApi: "http://localhost:3000/upload",
    cdn: "http://www.aliyun.com/",
    mock: false,
    mockApi: "https://www.fastmock.site/mock/2e09cb052a3be39cf2706f09e77d4ccd/api"
  }
}
export default {
  env,
  ...config[env]
}
