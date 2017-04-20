<template>
  <div id="homepage">
    <div>
    	<el-row :gutter="20">
        <el-col :span="5"><div class="grid-content bg-purple">
          <div class="part-head">
            <div class="title">业务申请</div>
            <div class="more">更多>></div>
          </div>
          <div class="part-body">
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
              <!-- <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>导航一</template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu> -->
              <el-menu-item index="1"><i class="el-icon-menu"></i>合同审查</el-menu-item>
              <el-menu-item index="2"><i class="el-icon-menu"></i>隔离墙名单管理</el-menu-item>
              <el-menu-item index="3"><i class="el-icon-setting"></i>签报流程</el-menu-item>
              <el-menu-item index="4"><i class="el-icon-setting"></i>反洗钱大额</el-menu-item>
              <el-menu-item index="5"><i class="el-icon-setting"></i>员工证券投资行为审查</el-menu-item>
              <el-menu-item index="6"><i class="el-icon-setting"></i>合规检测</el-menu-item>
            </el-menu>
          </div>
        </div></el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple">
            <el-row>
              <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5"><div class="grid-content bg-purple">
          
        </div></el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple">
            <el-row :gutter="20">
              <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import 'common/css/reset.css';
	export default {
  	name: 'homepage',
  	data(){
  		return{
  			mainSea : '',
  			navAcIndex1 : '1'
  		}
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
</style>
