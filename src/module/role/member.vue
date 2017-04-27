<template>

  <div> 
    <el-row>
      <el-col :span="6">
        <div class="max-h">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>

          <el-tree
            height="250"
            highlight-current="true"
            node-key="orgid"
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
      <el-col :span="16">
        <div class="">
          <el-table
            :data="userData"
            style="width: 100%"
            height="500"
            @selection-change="handleSelectionChange">
            <el-table-column
              prop="chsname"
              label="姓名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="mobilephone"
              label="电话"
              width="130">
            </el-table-column>
            <el-table-column
              prop="position"
              label="职位">
            </el-table-column>
            <el-table-column
              prop="job"
              label="岗位">
            </el-table-column>
            <el-table-column
              fixed="right"
              type="selection"
              width="55">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="end">
      <el-col :span="4" :offseet="10">
          <el-button type="primary" @click="submitSelect">确定</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<style>
  .max-h{
    height: 500px;
    overflow-y:scroll;
  }
</style>

<script>
  import Dialog from '../../components/Dialog'
	import Cms from '../../base-config'

  export default {
    name:'member',
    data() {
      return {
        filterText: '',
        orgData: [{
          orgid:'1',
          orgname: '角色管理',
          children: [{
            orgid:'2',
            orgname: '角色分类'
          },{
            orgid:'3',
            orgname: '联系人'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'orgname',
          id: 'orgid'
        },
        userData:[],
        multipleSelection: []
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
          this.queryUser(data.orgid);
          console.log(data.orgid);
        },
        handleSelectionChange(val) { //选择的人员
          this.multipleSelection = val;
          //console.log(val[0].chsname)
        },
        submitSelect(){
          console.log(this.multipleSelection);
          alert("提交选择的人员")
        }
    },
    watch: {
      filterText(val) {
        this.$refs.orgTree.filter(val);
      }
    },
  }
</script> 
