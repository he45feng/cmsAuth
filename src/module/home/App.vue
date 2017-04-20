<template>
  <div id="app">
	  <div id="header" class="clearfix">
	  	<div class="logoBox f-l"><img src="./images/logo-bg.png" alt=""></div>
      <div class="controlBox f-r clearfix">
        <div class="userBox">
          <!-- <div class="user-default-bg">
            <span class="userMsg-count">3</span>
          </div> -->
          <el-badge :value="3" :max="99" class="item user-default-bg">
            <el-button size="small"></el-button>
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
          <el-menu-item index="3"><a href="https://www.ele.me" target="_blank"><i class="el-icon-message"></i>专项监控</a></el-menu-item>
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
  </div>
</template>

<script>
  import 'common/css/reset.css';
	export default {
  	name: 'app',
  	data(){
  		return{
  			mainSea : '',
  			navAcIndex1 : '1',
        mainNavData: [{
            id:1,
            label: '角色管理',
            children: [{
              id:2,
              label: '角色分类'
            },{
              id:3,
              label: '角色列表'
            }]
          },{
            id:4,
            label: '功能管理',
            children:[{
              id:5,
              label:'功能分类'
            },{
              id:6,
              label:'功能列表'            
            }]
          }
        ]
  		};
  	},
    mounted: function(){
      this.$router.push("/homepage");
    },
  	methods:{
  		exit(){
        window.localStolage["isLogin"]="";
        location.href="module/login.html";
      },
      mainSeaClick(){
        
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
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
  #header{
    background-color: #eff3f5;
  }
  .logoBox>img{
    width: 300px;
    height: 90px;
    display: block;
  }
  .user-default-bg{
    width: 30px;
    height: 30px;
    background: url(./images/user-default-bg.png) no-repeat;
    position: relative;
    display: inline-block;
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
    margin-top:32px;
  }
  .controlBox{
    margin-right: 30px;
    margin-top:32px;
  }
  .controlBox>div{
    display: inline-block;
    vertical-align: bottom;
  }
  #userName{
    font-size:16px;
    margin-left:18px;
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
