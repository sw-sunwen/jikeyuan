import request from "@/utils/request";
// 获取token
export const loginApi = (loginForm) => {
  // return request.post('/authorizations', loginForm);
  return request({
    url: '/authorizations',
    method: 'post',
    data: loginForm,
  })
}
// 获取用户信息
export const getUserProfileApi = () => {
  return request.get('/user/profile');
}
