export default {
	afterOperate : function(response){
		if(response.result=="200"){
			$message.success(response.msg)
		}else{
			$message.error(response.msg)
		}
	}
}