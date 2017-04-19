<template>
  <div>
   <el-button type="primary" icon="plus"  @click="dialogFormVisible = true">新增</el-button>
    <el-table :data="funList" border style="width: 100%" class="umar-t10">
      <el-table-column prop="fun_id" label="功能ID" width="80"></el-table-column>
      <el-table-column prop="fun_name" label="功能名称" width="120"></el-table-column>
      <el-table-column prop="fun_type" label="功能类型" width="120"></el-table-column>
      <el-table-column prop="fun_path" label="节点路径" width="120"></el-table-column>
      <el-table-column prop="create_user_account" label="创建人账号" width="120"></el-table-column>
      <el-table-column prop="create_user_name" label="创建人" width="120"></el-table-column>
      <el-table-column prop="create_date" label="创建日期" width="120"></el-table-column>
      <el-table-column prop="is_publish" label="是否发布" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作">
      <template prop="id" scope="scope">
        <el-button  @click.native.prevent="edit(scope.$index, funList)" type="text" size="small">编辑</el-button>
        <el-button  @click.native.prevent="showDelDialog(scope.$index, funList)" type="text" size="small">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    
	<!--编辑、添加dialog开始-->
    <el-dialog :title="dialogTitle" size="small" v-model="dialogFormVisible">
      <el-form :model="editFrom">
        <el-form-item label="功能名称：" :label-width="formLabelWidth">
          <el-input v-model="editFrom.fun_name"  placeholder="请输入功能名称" auto-complete="off"></el-input>
        </el-form-item>
       <el-form-item label="功能类型":label-width="formlabelwidth">
       	<el-input v-model="editFrom.fun_type" placeholder="请输入功能类型" auto-complete="off"></el-input>
       </el-form-item>
       <el-form-item label="功能节点路径":label-width="formlabelwidth">
       	<el-input v-model="editFrom.fun_path" placeholder="请输入功能节点路径" auto-complete="off"></el-input>
       </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit(dialogType)">确 定</el-button>
      </div>
    </el-dialog>
	<!--编辑、添加dialog结束-->

	<!-- 删除提示 -->
    <el-dialog title="提示" v-model="dialogVisible" size="tiny">
      <span>确定要删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="del(funList)">确 定</el-button>
      </span>
    </el-dialog>


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
import Cms from '../../base-config.js'

  export default {
    name:'activePublic',
    data(){
		return{
			infoIdx:0,
			dialogType:0,
			dialogTitle:'',
			dialogTableVisible:false,
			dialogFormVisible:false,
			formLableWidth:'120px',
			dialogVisible:false,
			funList:[],
			editFrom:{
				'fun_name':'',
				'fun_type':'',
				'fun_path':''
			}
		} 
    },
    mounted(){
    	this.getfunList();
    },
    methods:{
    	addfun(){//新增
    		this.dialogType=0;
    		this.editFrom={};
    		this.dialogFormVisible=true;
    		this.dialogTitle='新增功能';
    	},
    	edit(idx,data){
    		this.dialogType=1;
    		this.dialogTitle='编辑功能';
    		this.infoIdx=idx;
    		this.dialogFormVisible=true;
    		this.editFrom={
    			'fun_name':data[idx].fun_name,
    			'fun_type':data[idx].fun_type,
    			'fun_path':data[idx].fun_path
    		};

    	},
    	showDelDialog(idx,data){
    		this.infoidx=idx;
    		this.dialogVisible=true;
    	},
    	del(data){//删除
    		let funid =data[this.infoidx].fun_id;
    		var url=Cms.ip+'/rms/rmsService/deleteFunctions';
    		var params={fun_id:funid};
    		params=JSON.stringify(params);
    		Cms.axios(url+'?'+params,{},function(response){
    			if(response.status==200){
					this.funList.splice(this.infoidx,1);
    			}
    		});
    		this.dialogVisible=false;
    	},
    	submit(){
    		var url=Cms.ip+'/rms/rmsService/addFunctions?';
    		var params='fun_name:"'+this.editFrom.fun_name+'",';
    		params+='fun_type:"'+this.editFrom.fun_type+'",';
    		params+='fun_path:"'+this.editFrom.fun_path+'"';
    		params='{'+params+'}';
    		axios.get(url+params,{}).then(function(response){
    			console.log(response);
    		}).catch(function(error){
    			console.log(error);
    		});
    		this.dialogFormVisible=false;
    	},
    	getfunList(){
    		var This=this;
    		var url=Cms.ip+'/rms/rmsService/queryFunctions';
    		axios.get(url,{}).then(function(response){
    			if(response.status==200){
    				console.log(response);
    				let funs=response.data;
    				for(let i=0;i<funs.length;i++){
    					This.funList.push(funs[i]);
    				}
    			}
    		}).catch(function(error){
    			console.log(error);
    		});
    	}
    }
  }
</script> 
