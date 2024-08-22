import request from "@/api/request.js"

export const selAllDepartment = () => {
	return request({
		url: '/patient/selAllDepartment',
		method: 'get'
	})
}
