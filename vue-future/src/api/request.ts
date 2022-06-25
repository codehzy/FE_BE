import axios from "axios";
import { message } from "ant-design-vue";

const baseURL =
  import.meta.env.VITE_APP_URL === "pro"
    ? "https://liveback.sojex.net"
    : "http://localhost:3333";

/**
 * request拦截器
 */
const service = axios.create({
  baseURL,
  timeout: 20000, // 请求超时时间
});

// request 拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    message.error("网络请求错误，请刷新或稍后再试！");
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  (response) => response.data,
  (error) => {
    message.error("网络响应错误，请刷新或稍后再试！");
    return Promise.reject(error);
  }
);

export default service;
