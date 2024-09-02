import request from "@/api/request.js"
export const userRegister = (data) => {
	return request({
		url: '/patient/register',
		method: 'post',
		data: data
	})
}