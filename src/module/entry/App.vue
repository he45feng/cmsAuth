<template>
  <div id="app">
    <!-- 头部导航 -->
    <header class="header" :class="{ 'header-fixed' : headerFixed }">
    <el-row>
        <el-col :span="22">
          <el-menu default-active="5" class="el-menu-demo" mode="horizontal" @select="">
            <el-menu-item index="1">招商证券</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="2">
          <el-menu default-active="5" class="el-menu-demo" mode="horizontal" @select="">
            <el-menu-item index="1" @click="quit">退出</el-menu-item>
          </el-menu>
        </el-col>
    </el-row>
    </header>
  
    <div v-show="headerFixed" style="position: relative;height: 60px;width: 100%;"></div>

    <main>
          <!-- 左侧导航 -->
        <div class="main-left">
          <el-tree
            highlight-current="true"
            node-key="id"
            :default-expanded-keys="[1]"
            :data="data"
            :props="defaultProps"
            accordion
            @node-click="handleNodeClick">
          </el-tree>
        </div>

        <!-- 右侧主内容区 -->
        <div class="main-right" >
          <transition name="fade">
            <router-view class="view"></router-view>
          </transition>
        </div>
    </main>
  </div>
</template>

<script>

import Vue from 'vue'
import Element from 'element-ui'
// import 'element-ui/lib/theme-cms/index.css'

Vue.use(Element)

export default {
  name: 'app',
  data() {
      return {
        headerFixed:true,
        data: [{
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
        }],

        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
  created: function(){
    this.$router.push('/rolelist');
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
      if(data.$treeNodeId==2){
        this.$router.push('/rolelist');
      }else if(data.$treeNodeId==5){
        this.$router.push('/fun');
      }else if(data.$treeNodeId==6){
        this.$router.push('/funlist');
      }
    },
    quit(){ //退出
      window.localStorage['isLogin'] = '';
      location.href = "login.html";
    }
  }
}
</script>

<style>

body{margin: 0;background-color: #E9ECF1;}
#app {
  min-width: 1200px;
  margin: 0 auto;
  font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
}
/* 头部导航 */
header{z-index: 1000;min-width: 1200px;transition: all 0.5s ease;  border-top: solid 4px #3091F2;  background-color: #fff;  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);  }
header.header-fixed{position: fixed;top: 0;left: 0;right: 0;}

/* 主内容区 */
main{display: -webkit-box;display: -ms-flexbox;display: flex;  min-height: 300px; padding:40px;  }
main .main-left{text-align: center;-webkit-box-flex: 0;-ms-flex: 0 0 200px;flex: 0 0 200px;}
main .main-right{-webkit-box-flex:1;-ms-flex:1;flex:1; background-color: #fff; padding: 20px; }
main .el-menu{background-color: transparent!important;}
/*  */
.router-link{display:inline-block;width:100%;height:100%;text-align:center;color:#475669;text-decoration: none; }
.is-active .router-link{color:#20a0ff; }

  /* 路由切换动效 */
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-active {
    opacity: 0;
    transform: translateY(30px);
  }

</style>
