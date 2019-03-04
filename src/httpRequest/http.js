import axios from 'axios'
let request = axios.create({
	baseURL:"http://localhost:8888",
	timeout:100000
})

export default {
	get:function(url,params){
		return new Promise((resolve,reject)=>{
			request.get(url,{params:params
			}).then(res=>{resolve(res.data)
			}).catch(err=>{reject(err)}).then(function(val){
				console.log(val)
				return val
			}
		})
	},
	post:function(url,data){
		http({
			method:"POST",
			url:url,
			data:data
		}).then(function(response){
			return response;
		}).catch(function(err){
			return err;
		})
	}
}
