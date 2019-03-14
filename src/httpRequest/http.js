/*import $ from 'jquery'
let baseUrl = "http://localhost:8888/"

export default {

	get : function(api,params){
		var response;
		$.ajax({
			url : baseUrl+api,
			type : "GET",
			data : params,
			timeout : 600000,
			dataType : "json",
			async : false,
			successs : function(data,textStatus){
				response = data;
			},
			error : function(error){
				console.log(err);
				response = "";
			}

		})
		return response;
	}
}*/


import axios from 'axios'
let request = axios.create({
	baseURL:"http://localhost:8888",
	timeout:100000
})



request.interceptors.response.use(
    function(response){
		return  Promise.resolve(response.data)
	},
    function(error){

		return  Promise.reject(error)
	}
)
export default {
    get: async function(url,params){
		return await request.get(url,{params:params})
	},
	getUrl: async function(url){
		return await request.get(url)
	},
    post:async function(url,data){
		return  await request.post(url,data)
	}
}
