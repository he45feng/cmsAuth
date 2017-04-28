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
            border
            :data="userData"
            style="width: 100%"
            height="350"
            @select="handleSelectionChange"
            @select-all="handleSelectionAll"
            ref="orgTabe">
            <el-table-column
              :label="currentOrgName">
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
            <el-tag type="primary" :key="user.userid" close-transition="true" :closable="true" style="margin:5px;" @close="closeTag(key,user.userid)">{{user.chsname}}</el-tag>
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
        currentOrgName:'招商证券',//当前部门名称
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
              //console.log(response)
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
              This.userData = response.data;

              /**数据回显开始*/
              var users = This.multipleSelection[orgid];
              This.$nextTick(function(){
                try{
                  if(users[0].hasOwnProperty('user')){
                    for(var n=0; n<response.data.length; n++){
                      This.$refs.orgTabe.toggleRowSelection(This.userData[n],true);//回显
                    }
                  }else{
                    for(var i=0; i<response.data.length; i++){
                      for(var j=0; j<users.length; j++){
                        if(users[j].userid == response.data[i].userid){
                          This.$refs.orgTabe.toggleRowSelection(This.userData[i],true);//回显
                        }
                      }
                    }
                  }
                }catch(e){}
              });
              /**数据回显结束*/
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
          if(data.column6 == 12 || this.currentOrgid == data.orgid){
            return;
          }
          this.currentOrgName = data.orgname;
          this.currentOrgid = data.orgid;
          this.queryUser(data.orgid);
          //console.log(data.orgid);
        },
        handleSelectionChange(val) { //选择单个人员
          if(this.userData.length == val.length){
            var arr = [{
              userid : this.orgid,
              chsname : this.currentOrgName,
              user : val
            }];
            Vue.set(this.multipleSelection,this.currentOrgid, arr);
          }else{
            try{
              var users = this.multipleSelection[this.currentOrgid][0];
              if(users.hasOwnProperty('user')){
                delete this.multipleSelection[this.currentOrgid];
              }
            }catch(e){console.log(e)}
            Vue.set(this.multipleSelection,this.currentOrgid, val);
          }
        },
        handleSelectionAll(val){ //选择所有人员
          if(val.length==0){
            this.multipleSelection[this.currentOrgid] = '';
          }else{
            var arr = [{
              userid : this.orgid,
              chsname : this.currentOrgName,
              user : val
            }];
            Vue.set(this.multipleSelection,this.currentOrgid, arr);
            console.log(this.multipleSelection)
          }
        },
        closeTag(orgid,userid){ //删除选中的人员
          var users = this.multipleSelection[orgid];
          try{
              if(users[0].hasOwnProperty('user')){//删除全选
                var user = users[0].user;
                for(var i=0; i<user.length; i++){
                  this.$refs.orgTabe.toggleRowSelection(user[0],false)
                }
                users.splice(0,1);
              }else{ //删除单个
                for(var i=0; i<users.length; i++){
                  if(users[i].userid == userid){
                    users.splice(i,1);
                  }
                }
              }
          }catch(e){console.log(e)}
          console.log(this.multipleSelection)
        },
        isSelect(row){

          //console.log(row.userid);
        },
        submitSelect(){
          
          //console.log(this.multipleSelection);
          //console.log("提交选择的人员");
          //this.$emit("submitSelect",this.multipleSelection);
        }
    },
    watch: {
      filterText(val) {
        this.$refs.orgTree.filter(val);
      }
    },
  }
</script> 
