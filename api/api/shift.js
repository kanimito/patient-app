import request from "@/api/request.js"

export const getShiftTimeList = (params) =>{
	return request({
		url: '/patient/getShiftTimeList',
		method: 'get',
		data: params
	})
}