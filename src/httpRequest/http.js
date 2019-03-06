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
    get: function(url,params){
		return  request.get(url,{params:params})
	},
    post:function(url,data){
		return  request.post(url,data)
	}
}
