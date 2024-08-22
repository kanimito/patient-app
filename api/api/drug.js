import request from "@/api/request.js"

export const getDrugOrder = (params) => {
	return request({
		url: '/patient/getDrugOrder',
		method: 'get',
		data: params
	})
}


export const updateOrderStatus = (params) => {
	return request({
		url: '/patient/updateOrderStatus',
		method: 'post',
		data: params
	})
}