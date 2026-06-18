import axios from "axios";
import router from "@/router";
import {getToken, removeToken} from "@/utils/token";

const request = axios.create({
  baseURL: 'https://geek.itheima.net/v1_0', //设置请求的基础 URL
  timeout: 5000 //设置请求超时时间
});

// 添加请求拦截器
request.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 添加响应拦截器
request.interceptors.response.use(
  result => {
    return result.data

  },
  error => {
    if (error.response && error.response.status === 401) {
      removeToken()
      router.navigate('/login') // 跳转到登录页，不能用useNavigate()，因为不在组件中
      window.location.reload() // 调用浏览器原生 API，刷新当前页面，清除缓存，重置状态
    }
    return Promise.reject(error)
  }
)

export default request