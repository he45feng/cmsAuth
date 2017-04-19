<template>
  <div>
    
    <el-button type="primary" icon="plus"  @click="addRole">新增</el-button>

    <el-table :data="roleList" border style="width: 100%" class="umar-t10">
      <el-table-column prop="role_id" label="角色ID" width="80"></el-table-column>
      <el-table-column prop="role_name" label="角色名称" width="120"></el-table-column>
      <el-table-column prop="created_user_account" label="创建人账号" width="120"></el-table-column>
      <el-table-column prop="created_user_name" label="创建人" width="120"></el-table-column>
      <el-table-column prop="created_date" label="创建日期" width="120"></el-table-column>
      <el-table-column prop="role_description" label="描述" width="200"></el-table-column>
      <el-table-column fixed="right" label="操作">
      <template prop="id" scope="scope">
        <el-button  @click.native.prevent="edit(scope.$index, roleList)" type="text" size="small">编辑</el-button>
        <el-button  @click.native.prevent="showDelDialog(scope.$index, roleList)" type="text" size="small">删除</el-button>
      </template>
      </el-table-column>
    </el-table>

	<!--编辑、添加dialog开始-->
    <el-dialog :title="dialogTitle" size="small" v-model="dialogFormVisible">
      <el-form :model="editFrom">
        <el-form-item label="分类名称：" :label-width="formLabelWidth">
          <el-input v-model="editFrom.role_name"  placeholder="请输入分类名称" auto-complete="off"></el-input>
        </el-form-item>
       
        <el-form-item label="描述：" :label-width="formLabelWidth">
        	<el-input
			  type="textarea"
			  :rows="2"
			  placeholder="请输入内容"
			  v-model="editFrom.role_description">
			</el-input>
    	</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit(dialogType)">确 定</el-button>
      </div>
    </el-dialog>
	<!--编辑、添加dialog结束-->

	<!-- 删除提示开始 -->
    <el-dialog title="提示" v-model="dialogVisible" size="tiny">
      <span>确定要删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="del">确 定</el-button>
      </span>
    </el-dialog>
	<!-- 删除提示结束 -->
  </div>
</template>
<style>
  .choose-fun{
  	max-height: 500px;
  	overflow-y: scroll;
  }
</style>
<script>
	import axios from 'axios'
	import  Cms from '../../base-config'
  export default {
    name:'activePublic',
    data() {
      return {
      	infoIdx : 0, //第几条数据索引
      	dialogType :0, //对话框类型，0：新增，1：编辑
      	dialogTitle : '',
      	dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '120px',
        dialogVisible:false,
        roleList: [{
          'role_id':'1',
          'role_name':'总裁办',
          'created_user_account':'78232',
          'created_user_name':'李宁',
          'created_date':'2017-03-09',
          'role_description' : '总裁办所有人都有权限'
        }],
        editFrom: {
          'role_name': 'ff',
          'role_description' : '总裁办所有人都有权限'
        }
      }
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
      showDelDialog(idx){ //显示删除提示框
      	this.infoIdx = idx;
        this.dialogVisible = true;
      },
      del(){ //删除
      	this.roleList.splice(this.infoIdx,1);
      	this.dialogVisible = false;
      },
      submit(dialogType){ //提交
      	if(dialogType==0){
      		this.roleList.unshift({
	          'role_id':'2888',
	          'role_name':'人事部',
	          'created_user_account':'7652',
	          'created_user_name':'张小明',
	          'created_date':'2017-03-09',
	          'role_description' : '张小明独享'
	        });
      	}else if(dialogType==1){
      		this.roleList[this.infoIdx].role_name = this.editFrom.role_name;
      		this.roleList[this.infoIdx].role_description = this.editFrom.role_description;
      	}
      	this.dialogFormVisible = false;
      },
      
      getRoleList(){ //查询角色分类列表
      		var This = this;
			var url = Cms.ip + '/rms/role/queryRole';
			axios.get(url, {}).then(function (response) {
				if(response.status == 200){
					console.log(response);
					let roles = response.data;
					for(let i=0; i<roles.length;i++){
						This.roleList.push(roles[i]);
					}
				}
		  	}).catch(function (error) {
		    	console.log(error);
		  	});
		}

    }
  }
</script> 
