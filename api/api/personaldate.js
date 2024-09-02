import request from "@/api/request.js"

export const personalDate = (token) => {
  return request({
    url: '/patient/personalDate',
    method: 'post',
    header: {
      'Authorization': `Bearer ${token}` // 将token作为请求头传递
    }
  });
}

export const updatePersonalDate = (data) => {
  return request({
    url: '/patient/updatePersonalDate',
    method: 'post',
	data:data
  });
}
