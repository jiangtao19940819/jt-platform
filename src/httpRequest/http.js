import axios from 'axios'
let http = axios.create({
	baseURL:"http://localhost:8888",
	timeout:100000
})

export default {
	get:function(url,params){
		http({
			method:"GET",
			url:url,
			params:params
		}).then(function(response){
			return response;
		}).catch(function(err){
			return err;
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
