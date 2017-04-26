<template>
  <div id="app">
	  <div id="header" class="clearfix">
	  	<div class="logoBox f-l">
        <img src="./images/logo600x600.png" alt="招商证券|合规门户">
        <div class="logoText">招商证券|合规门户</div>
      </div>
      <div class="controlBox f-r clearfix">
        <div class="userBox">
          <el-badge :value="3" :max="99" class="item">
            <el-button class=""><i class="fa fa-user-circle" id="user-default-bt"></i></el-button>
          </el-badge>
          <span id="userName">张三</span>
        </div>
        <div class="myControl">
          <a href="javascript:;" @click="exit"><span>退出</span></a>
        </div>
      </div>
      <div class="mainSeaBox f-r">
        <el-input
          placeholder="搜索关键字"
          icon="search"
          v-model="mainSea"
          :on-icon-click="mainSeaClick">
        </el-input>
      </div>
	  </div>

	  <div id="mainNav">
      <div class="navBox clearfix">
        <el-menu :default-active="navAcIndex1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1"><i class="el-icon-message"></i>首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">业务申请</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
          <el-menu-item index="3"><i class="el-icon-message"></i>专项监控</el-menu-item>
          <el-menu-item index="4"><i class="el-icon-message"></i>合规事务管理</el-menu-item>
          <el-menu-item index="5"><i class="el-icon-message"></i>合规监控统计</el-menu-item>
          <el-menu-item index="6"><i class="el-icon-message"></i>法规知识库</el-menu-item>
          <el-menu-item index="7"><i class="el-icon-message"></i>信息公告</el-menu-item>
        </el-menu>
      </div>
	  </div>

	  <div>
	  	<router-view></router-view>
	  </div>
    <el-dialog title="提示" v-model="dialogVisible" size="tiny">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import 'common/css/reset2.css';
  import 'common/css/font-awesome.min.css';
	export default {
  	name: 'app',
  	data(){
  		return{
  			mainSea : '',
  			navAcIndex1 : '1',
        dialogVisible:false
  		};
  	},
    mounted: function(){
      this.$router.push("/homepage");
    },
  	methods:{
  		exit(){
        window.localStorage["isLogin"]="";
        location.href="login.html";
      },
      mainSeaClick(){
        alert("ok");
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        if(key=='7'){
          location.href="entry.html";
        }else{
          this.dialogVisible=true;
        }
      }
  	}
	}
</script>

<style>
  a,a:focus{
    text-decoration: none;
  }
  .clearfix:after{
    content: "";
    display: table;
    clear: both;
  }
  .f-l{
    float: left;
  }
  .f-r{
    float: right;
  }
  body{
    background-color: #eff3f5;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 14px;
    color:#1f2d3d;
  }

  .el-menu{
    background-color: #fff;
  }
  #header{
    background-color: #eff3f5;
    padding: 8px 0;
  }
  .logoBox{
    margin-left: 20px;
  }
  .logoBox>img{
    width: 50px;
    height: 50px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
  }
  .logoBox>.logoText{
    height: 50px;
    line-height: 50px;
    display: inline-block;
    vertical-align: middle;
    font-weight: bold;
    font-size: 24px;
    color:#d4ad67;
  }
  .userBox>.el-badge{
    vertical-align: bottom;
  }
  .userBox .el-button{
    padding: 0;
    border: 0;
    background:none;
  }
  #user-default-bt{
    /*width: 30px;
    height: 30px;
    background: url(./images/user-default-bg.png) no-repeat;
    position: relative;
    display: inline-block;
    border:0;*/
    font-size: 28px;
    cursor: pointer;
  }
  .userMsg-count{
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    background-color: #fb475e;
    color: #fff;
    position: absolute;
    top:-9px;
    right: -9px;
    border-radius: 50% 50%;
  }
  .mainSeaBox{
    margin-right: 34px;
    margin-top: 10px;
    width: 400px;
  }
  .controlBox{
    margin-right: 30px;
    margin-top: 14px;
  }
  .controlBox>div{
    display: inline-block;
    vertical-align: bottom;
  }
  #userName{
    font-size:16px;
    margin-left:10px;
  }
  .myControl>a{
    padding: 0 4px;
    margin:0 6px;
  }
  #mainNav{
    background: url(./images/mainNav-bg.png) repeat-x;
  }
  #mainNav>.navBox{
    margin-right: 30px;
  }
  #mainNav .el-menu-demo{
    background: none;
    float: right;
  }
  #mainNav .el-menu-demo>.el-menu-item,#mainNav .el-submenu__title,#mainNav .el-icon-message,#mainNav .el-submenu__icon-arrow{
    color:#fff;
  }
  #mainNav .el-menu-demo>.el-menu-item:hover,#mainNav .el-submenu__title:hover{
    background-color: #f1203d;
  }
</style>
