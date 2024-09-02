import request from "@/api/request.js"
export const userLogin = (data) => {
	return request({
		url: '/patient/login',
		method: 'post',
		data: data
	})
}