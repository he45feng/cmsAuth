<template>
  <div> 
    <el-button type="primary" icon="plus"  @click="addRole">新增</el-button>

    <el-table v-loading="loading" element-loading-text="拼命加载中" :data="roleList" border style="width: 100%" class="umar-t10">
      <el-table-column prop="role_id" label="角色ID" width="80"></el-table-column>
      <el-table-column prop="role_name" label="角色名称" width="120"></el-table-column>
      <el-table-column prop="created_user_account" label="创建人账号" width="120"></el-table-column>
      <el-table-column prop="created_user_name" label="创建人" width="120"></el-table-column>
      <el-table-column prop="created_date" label="创建日期" width="120"></el-table-column>
      <el-table-column prop="role_description" label="描述" width="200"></el-table-column>
      <el-table-column fixed="right" label="操作">
      <template prop="id" scope="scope">
        <el-button  @click.native.prevent="edit(scope.$index, roleList)" type="text" size="small">编辑</el-button>
        <el-button  @click.native.prevent="addOuth(scope.$index, roleList)" type="text" size="small">添加权限</el-button>
        <el-button  @click.native.prevent="del(scope.$index, roleList)" type="text" size="small">删除</el-button>
      </template>
      </el-table-column>
    </el-table>

	<!--编辑、添加dialog开始-->
    <el-dialog :title="dialogTitle" size="small" v-model="dialogFormVisible">
      <el-form :model="editFrom">
        <el-form-item label="分类名称：" :label-width="formLabelWidth">
          <el-input v-model.trim="editFrom.role_name"  placeholder="请输入分类名称" auto-complete="off"></el-input>
        </el-form-item>
       
        <el-form-item label="描述：" :label-width="formLabelWidth">
        	<el-input
			  type="textarea"
			  :rows="2"
			  placeholder="请输入内容"
			  v-model.trim="editFrom.role_description">
			</el-input>
    	</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit(dialogType)">确 定</el-button>
      </div>
    </el-dialog>
	<!--编辑、添加dialog结束-->

  <!--添加权限dialog开始-->
    <el-dialog title="选择人员" size="large" v-model="dialogMemberVisible">
      <cms-member v-on:submitSelect="pushOuth"></cms-member>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMemberVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAuth()">确 定</el-button>
      </div>
    </el-dialog>
  <!--添加权限dialog结束-->

  <cms-dialog :showDialog="showDialog"></cms-dialog>

  </div>
</template>

<style>

</style>

<script>
  import Dialog from '../../components/Dialog'
  import Member from '../../components/Member'
	import Cms from '../../base-config'

  export default {
    name:'roleList',
    data() {

      return {
        loading: false,
        showDialog:{},
      	infoIdx : 0, //第几条数据索引
      	dialogType :0, //对话框类型，0：新增，1：编辑
      	dialogTitle : '',
      	dialogTableVisible: false,
        dialogFormVisible: false,
        dialogMemberVisible:false,
        formLabelWidth: '120px',
        roleList: [{'role_id':1}],
        editFrom: {}
      }
    },
    components:{
      "cms-dialog":Dialog,
      "cms-member":Member
    },
    mounted(){
    	this.getRoleList();
    },
    methods: {
    	addRole(){ //新增角色分类
    		this.dialogType = 0;
    		this.editFrom={};
    		this.dialogFormVisible = true;
    		this.dialogTitle = "新增角色分类";
    	},
      edit(idx,data){ //编辑角色分类
      	this.dialogType = 1;
      	this.infoIdx = idx;
        this.dialogFormVisible = true;
        this.dialogTitle = "编辑角色分类";
        this.editFrom={
          'role_name' : data[idx].role_name,
          'role_description' : data[idx].role_description
        }
      },
      del(idx){
          var This = this;
          This.showDialog = {//显示删除提示框
          dialogVisible : true,
          title : '提示',
          content : '确定要删除吗？',
          callBack : function(){
            var url = Cms.ip + '/rms/role/deleteRole';
            Cms.axios(url,{ //发送删除请求
                  'role_id':This.roleList[idx].role_id
                },function(response){
                  if(response.status == 200){
                      This.roleList.splice(idx,1);
                      This.showDialog.dialogVisible = false;
                  }else{
                    This.$notify.error({
                      title: '提示',
                      message: '抱歉，出错了！'
                    });
                  }
            });
          }
        }
      },
      pushOuth(multipleSelection){ //将从Member组件传来的数据保存起来
          console.log(multipleSelection);
      },
      addOuth(idx,data){ //添加权限
        this.infoIdx = idx;
        this.dialogMemberVisible = true;
      },
      submit(dialogType){ //提交
        var This = this;
        
        if(!This.editFrom.role_name){
            alert("请输入分类名称");
            return;
        }
        This.dialogFormVisible = false;
        This.loading = true;
      	if(dialogType==0){ //提交新增角色分类
          var params = {
            'role_name' : This.editFrom.role_name,
            'role_description':This.editFrom.role_description
          };
          var params = JSON.stringify(params);
          var url = Cms.ip + '/rms/role/addRole';
          //发送ajax请求
          Cms.axios(url,{
              'role_name' : This.editFrom.role_name,
              'role_description':This.editFrom.role_description
            },function(response){
              This.loading = false;
              if(response.status == 200){
                This.roleList.unshift(response.data);
              }else{
                This.$notify.error({
                  title: '提示',
                  message: '抱歉，出错了！'
                });
              }
          });
      	}else if(dialogType==1){ //提交修改角色
          var url = Cms.ip + '/rms/role/updateRole';
          //发送ajax请求
          Cms.axios(url,{
              'role_id' : This.roleList[This.infoIdx].role_id,
              'role_name' : This.editFrom.role_name,
              'role_description':This.editFrom.role_description
            },function(response){
              This.loading = false;
              if(response.status == 200){
                //console.log(response);
                This.roleList[This.infoIdx].role_name = This.editFrom.role_name;
                This.roleList[This.infoIdx].role_description = This.editFrom.role_description;
              }else{
                This.$notify.error({
                  title: '提示',
                  message: '抱歉，出错了！'
                });
              }
          });
      	}
      },
      
      getRoleList(){ //查询角色分类列表
      		var This = this;
    			var url = Cms.ip + '/rms/role/queryRole';
          Cms.axios(url,{},function(response){
            if(response.status == 200){
              let roles = response.data;
              for(let i=0; i<roles.length;i++){
                This.roleList.push(roles[i]); 
              }
            }else{
                This.$notify.error({
                  title: '提示',
                  message: '抱歉，出错了！'
                });
              }
          })
    		}
    }
  }
</script> 
