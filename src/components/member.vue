<!-- 组织架构人员选择 -->
<template>
  <div> 
    <el-row align="middle" justify="center" type="flex">
      <el-col :span="7">
        <div class="max-h">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>

          <el-tree
            height="350"
            highlight-current="true"
            node-key="rowindex"
            :default-expanded-keys="[1]"
            :data="orgData"
            :props="defaultProps"
            :filter-node-method="filterNode"
            accordion
            @node-click="handleNodeClick"
            ref="orgTree">
          </el-tree>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="">
          <el-table
            :data="userData"
            style="width: 100%"
            height="350"
            @selection-change="handleSelectionChange">
            <el-table-column
              label="人员信息">
                <template scope="scope">
                    <b>{{ scope.row.chsname }}</b><span>({{scope.row.position}}-{{scope.row.job}})</span>
                </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              type="selection"
              width="55">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="7" class="max-h">
        <span v-for="(users,key) in multipleSelection">
          <span v-for="user in users">
            <el-tag type="primary" :key="user.userid" :closable="true" style="margin:5px;" @close="closeTag(key,user.userid)">{{user.chsname}}</el-tag>
          </span>
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<style>
  .max-h{
    height: 350px;
    overflow-y:scroll;
  }
</style>

<script>
  import Vue from 'vue'
	import Cms from '../base-config'

  export default {
    name:'member',
    data() {
      return {
        filterText: '',
        orgData: [],
        defaultProps: {
          children: 'children',
          label: 'orgname',
          id: 'rowindex'
        },
        userData:[], //人员信息
        currentOrgid:'', //当前部门ID
        multipleSelection: {} //选中的人员
      }
    },
    computed:{

    },
    mounted:function(){
      this.queryOrganization();
    },
    methods: {
        queryOrganization(){//查询组织机构
          var This = this;
          var url = Cms.ip + '/rms/org/queryOrganization?"yanwb"';
          Cms.axios(url,{},function(response){
            if(response.status == 200){
              console.log(response)
              This.orgData = response.data;
            }else{
                This.$notify.error({
                  title: '提示',
                  message: '抱歉，出错了！'
                });
              }
          });
        },
        queryUser(orgid){ //查询组织机构下的人员信息
          var This = this;
          var url = Cms.ip + '/rms/user/queryUser?"yanwb","'+ orgid +'"';
          Cms.axios(url,{},function(response){
            if(response.status == 200){
              console.log(response);
              This.userData = response.data;
            }else{
                This.$notify.error({
                  title: '提示',
                  message: '抱歉，出错了！'
                });
              }
          });
        },
        filterNode(value, data) { //组织部门过滤查询
          if (!value) return true;
          return data.orgname.indexOf(value) !== -1;
        },
        handleNodeClick(data) { //选择组织
          if(data.column6 == 12){
            return;
          }
          this.currentOrgid = data.orgid;
          this.queryUser(data.orgid);
          console.log(data.orgid);
        },
        handleSelectionChange(val) { //选择人员
          Vue.set(this.multipleSelection,this.currentOrgid, val);
          console.log(this.multipleSelection);
        },
        closeTag(orgid,userid){ //删除选中的人员
          //alert(orgid + "===" +userid);
          var users = this.multipleSelection[orgid];
          for(var i=0; i<users.length; i++){
            if(users[i].userid == userid){
              users.splice(i,1);
            }
          }
          console.log(users);
        },
        submitSelect(){
          console.log(this.multipleSelection);
          console.log("提交选择的人员");
          this.$emit("submitSelect",this.multipleSelection);
        }
    },
    watch: {
      filterText(val) {
        this.$refs.orgTree.filter(val);
      }
    },
  }
</script> 
