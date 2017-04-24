<template>
  <div>
    
    <el-button type="primary" icon="plus"  @click="add()">新增</el-button>

    <el-table :data="tableData" border style="width: 100%" class="umar-t10">
      <el-table-column fixed prop="name" label="名称" width="150"></el-table-column>
      <el-table-column prop="group" label="所属群组" width="120"></el-table-column>
      <el-table-column prop="create_user_name" label="创建人" width="120"></el-table-column>
      <el-table-column prop="fun_grp_description" label="备注" width="300"></el-table-column>
      <el-table-column prop="date" label="创建日期" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作">
      <template prop="fun_grp_id" scope="scope">
        <el-button  @click.native.prevent="edit(scope.$index, tableData)" type="text" size="small">编辑</el-button>
        <el-button  @click.native.prevent="ShowDelDialog(scope.$index, tableData)" type="text" size="small">查看</el-button>
        <el-button  @click.native.prevent="ShowDelDialog(scope.$index, tableData)" type="text" size="small">删除</el-button>
      </template>
      </el-table-column>
    </el-table>

	<!--编辑添加dialog-->
    <el-dialog title="新增功能分类" size="large" v-model="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称：" :label-width="formLabelWidth">
          <el-input v-model="form.fun_grp_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="功能：" :label-width="formLabelWidth">
          <el-tree 
          	  class="choose-fun"
			  :data="fun"
			  :props="props"
			  :load="loadNode"
			  lazy
			  show-checkbox
			  @check-change="handleCheckChange">
			</el-tree>
        </el-form-item>
        <el-form-item label="备注：" :label-width="formLabelWidth">
        	<el-input
			  type="textarea"
			  :rows="2"
			  placeholder="请输入内容"
			  v-model="form.fun_grp_descrition">
			</el-input>
    	</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>

	<!-- 删除提示 -->
    <el-dialog title="提示" v-model="dialogVisible" size="tiny">
      <span>确定要删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="del()">确 定</el-button>
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
  import Cms from '../../base-config.js'
  export default {
    name:'activePublic',
    data() {
      return {
        tableData: [{
        }],
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        dialogType:0,
        indexidx:0,
        formLabelWidth: '120px',
        dialogVisible:false,
        note:'',

        //功能选择
        fun: [{
          'name': '邮件服务'
        }, {
          'name': '知识中心'
        }],
        props: {
          label: 'name',
          children: 'zones'
        },
        count: 1
      }
    },
    mounted(){
      this.getFunctionsGrpList();
    },
    methods: {
      add(){
        this.dialogType=0;
        this.dialogFormVisible=true;
      },
      edit(idx,data){
        this.dialogType=1;
        this.indexidx=idx;
        this.dialogFormVisible = true;
        this.form={
          name : data[idx].name
        }
      },
      ShowDelDialog(idx,data){
        this.indexidx=idx;
        this.dialogVisible = true;
      },
      del(){
        var url=Cms.ip+'/rms/rmsService/deleteFunctionsGroup';
        var param={fun_grp_id:this.tableData[this.indexidx].fun_grp_id};
        let that=this;
        Cms.axios(url+'?'+JSON.stringify(param),{},function(res){
          if(res.status==200){
            that.tableData.splice(that.indexidx,1);
          }
        });
      },
      submit(){
        if(this.dialogType==0){
          var url=Cms.ip+'/rms/rmsService/addFunctionsGroup';
          var param={
            fun_grp_name:this.form.fun_grp_name,
            fun_grp_descrition:this.form.fun_grp_descrition
          };
          var that=this;
          Cms.axios(url+'?'+JSON.stringify(param),{},function(res){
            if(res.status==200){
              that.tableData.unshift(res.data);
            }
          });
          this.dialogFormVisible=false;
        }
        else if(this.dialogType==1){
          var url=Cms.ip+'/rms/rmsService/updateFunctionsGroup';
          var param={
            fun_grp_id:this.tableData[this.indexidx].fun_grp_id,
            fun_grp_name:this.form.fun_grp_name,
            fun_grp_descritio:this.form.fun_grp_descrition
          }
          var that=this;
          Cms.axios(url+'?'+JSON.stringify(param),{},function(res){
            if(res.status==200){
              that.tableData[that.indexidx].fun_grp_name=param.fun_grp_name;
              that.tableData[that.indexidx].fun_grp_descrition=param.fun_grp_descrition;
            }
          });

        }
      },
      getFunctionsGrpList(){
        var that=this;
        var url=Cms.ip+'/rms/rmsService/queryFunctionsGroup';
        Cms.axios(url,{},function(response){
              if(response.status==200){
                let fungrps=response.data;
                for(let i=0;i<fungrps.length;i++){
                  that.tableData.push(fungrps[i]);
                }
              }
            });
      },
      //功能选择开始
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      handleNodeClick(data) {
        console.log(data);
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: '邮件服务' }, { name: '知识中心' }]);
        }
        if (node.level > 3) return resolve([]);

        var hasChild;
        if (node.data.name === '邮件服务') {
          hasChild = true;
        } else if (node.data.name === '知识中心') {
          hasChild = false;
        } else {
          hasChild = Math.random() > 0.5;
        }

        setTimeout(() => {
          var data;
          if (hasChild) {
            data = [{
              name: '邮件服务' + this.count++
            }, {
              name: '邮件服务' + this.count++
            }];
          } else {
            data = [];
          }

          resolve(data);
        }, 500);
      }
      //功能选择结束

    }
  }
</script> 
