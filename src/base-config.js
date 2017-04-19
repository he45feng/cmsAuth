import axios from 'axios'
export default{
	ip : 'http://172.254.48.40:8081',
	axios : function(url,params,callBack,method){
		var param = '';
		var hasProp = false;  
	    for (var prop in params){  
	        hasProp = true;  
	        break;  
	    }  
    	if (hasProp){  
        	param = "?"+JSON.stringify(params);
    	}
    
		var status = 0;
		var uri = url + param;
		console.log(uri);

		//发送ajax请求
		axios.request({
			method: cms.isDefine(method)?method:'get',
			url : uri,
			//params : params,微服务参数放在了url后
			timeout: 10000,
			responseType: 'json',
			transformRequest : function(request){
				//alert('request');
			},
			transformResponse : function(response){
				var result = {
					status : status,
					data : response
				}
				console.log(result);
				callBack(result);
			},
			validateStatus: function (data) {//请求返回状态
    			status = data; 
  			}
		});
	}
}

var cms = {};
/**
 * 判断是否是空
 * @param value
 */
cms.isDefine = function(value) {
    if (value == null || value == "" || value == "undefined" || value == undefined || value == "null" || value == "(null)" || value == 'NULL' || typeof (value) == 'undefined') {
        return false;
    } else {
        value = value + "";
        value = value.replace(/\s/g, "");
        if (value == "") {
            return false;
        }
        return true;
    }
}