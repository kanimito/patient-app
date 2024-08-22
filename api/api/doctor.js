import request from "@/api/request.js"
export const getDoctor = (params) => {
	return request({
		url: '/patient/getDoctor',
		method: 'get',
		data: params
	})
}

export const getDoctorList = (params) => {
	return request({
		url: '/patient/getDoctorList',
		method: 'get',
		data: params
	})
}


