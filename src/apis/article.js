import request from "@/utils/request";

export const getChannelApi = () => {
  return request.get('/channels'); // 获取频道列表 
}

export const createArticleApi = (data) => {
  return request.post('/mp/articles?draft=false', data); //新增文章表单
}

export function getArticleListApi (params) { // 获取文章列表
  return request({
    url: "/mp/articles",
    method: 'GET',
    params
  })
}

export const delArticleApi = (id) => {
  return request.delete(`/mp/articles/${id}`); // 删除文章
}

export const getArticleByIdApi = (id) => {
  return request.get(`/mp/articles/${id}`); // 获取文章详情
}

export const updateArticleApi = (data,id) => {
  return request.put(`/mp/articles/${id}?draft=false`, data); // 更新文章表单

}
