import request from "@/api/request.js"

export const recipel = (token) => {
  return request({
    url: '/patient/recipel',
    method: 'post',
    header: {
      'Authorization': `Bearer ${token}` // 将token作为请求头传递
    }
  });
}