<template>
  <div id="app" class="login-bg">
	<el-row :gutter="20">
	  <div class="login-panel">
	  	<div class="title">
	  		<b>招商证券权限管理系统</b>
	  	</div>
	  	<div class="umar-t20">
		  <el-input placeholder="请输用户名" v-model="input3">
		    <template slot="prepend">用户</template>
		  </el-input>
		</div>

		<div class="umar-t20">
		  <el-input placeholder="请输密码" v-model="input3">
		    <template slot="prepend">密码</template>
		  </el-input>
		</div>

		<div @click="submit" class="submit umar-t20 uinn-a10 tx-c bc-txt uc-a5 cms-act">登陆</div>
	  </div>
	</el-row>
  </div>
</template>

<script>
	import 'common/css/common.css';
  	export default {
    	name: 'app',
    	data(){
    		return{
    			username : '',
    			password : ''
    		}
    	},
    	methods:{
    		submit(){
    			window.localStorage['isLogin'] = 'login';
    			location.href = "home.html";
    		}
    	}
  	}
</script>

<style>
 	.login-bg{
 		position: fixed;
 		top: 0;
 		bottom: 0;
 		background-image: url('./images/login-bg.jpg');
 		background-repeat: no-repeat;
    	background-size: 100% 100%;
    	background-origin: content-box;
 	}
 	.login-panel{
 		width: 30%;
 		height: 250px;
 		margin-top: 15%;
 		margin-left: 35%;
 		padding: 20px;
 		background-color: rgba(255,255,255,0.8);
 		border-radius: 5px;
 	}
 	.title{
 		text-align: center;
 		height: 30px;
 		padding: 5px;
 	}
 	.submit{
 		background-color: #475669;
 	}
</style>
