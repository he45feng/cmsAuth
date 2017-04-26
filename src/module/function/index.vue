<template>
  <div>
    
    <el-button type="primary" icon="plus"  @click="add()">新增</el-button>

    <el-table :data="tableData" border style="width: 100%" class="umar-t10">
      <el-table-column fixed prop="fun_grp_name" label="名称" width="150"></el-table-column>
      <el-table-column prop="create_user_name" label="创建人" width="120"></el-table-column>
      <el-table-column prop="fun_grp_description" label="备注" width="300"></el-table-column>
      <el-table-column prop="create_date" label="创建日期" width="160"></el-table-column>
      <el-table-column fixed="right" label="操作" >
      <template prop="fun_grp_id" scope="scope">
        <el-button  @click.native.prevent="edit(scope.$index, tableData)" type="text" size="small">编辑</el-button>
        <el-button  @click.native.prevent="ShowRoleDialog(scope.$index)" type="text" size="small">查看功能列表</el-button>
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
              ref="tree"
        :data="fun"
        :props="props"
        node-key="fun_id"
        show-checkbox
        @check-change="handleCheckChange"
        @node-expand="nodeexpand"
        >
      </el-tree>
        </el-form-item>
        <el-form-item label="备注：" :label-width="formLabelWidth">
          <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="form.fun_grp_description">
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
        <el-button type="primary" @click="del(tableData)">确 定</el-button>
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
        tableData: [],
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
        fun: [],
        props: {
          id:'fun_id',
          label: 'fun_name',
          children: 'children'
        },
        count: 1
      }
    },
    mounted(){
      this.getFunctionsGrpList();
      //this.handleNodeClick(this.fun);
    },
    methods: {
      add(){
        this.dialogType=0;
        this.dialogFormVisible=true;
        this.form={
          fun_grp_name : '',
          fun_grp_description:''
        };
        var that=this;
        var url=Cms.ip+'/rms/rmsService/queryFunctions';
           Cms.axios(url,{},function(response){
              if(response.status==200){
                that.fun=response.data;
                 that.$refs.tree.setCheckedKeys([]);
              }
            });
      },
      edit(idx,data){
        this.dialogType=1;
        this.indexidx=idx;
        this.dialogFormVisible = true;
        this.form={
          fun_grp_name : data[idx].fun_grp_name,
          fun_grp_description:data[idx].fun_grp_description
        };
        var that=this;
        let url=Cms.ip+'/rms/rmsService/queryFunctions';
            Cms.axios(url,{},function(res){ 
            if(res.status==200){
                  that.fun=res.data;
                  let url=Cms.ip+'/rms/rmsService/queryFunctionsRight';
                  Cms.axios(url,{},function(subres){
                      let arr=[];
                      for(let i=0;i<subres.data.length;i++){
                          arr.push(subres.data[i].fun_id);
                      }
                      that.$refs.tree.setCheckedKeys(arr);
                  });
              }
         });
      },
      ShowDelDialog(idx,data){
        this.indexidx=idx;
        this.dialogVisible = true;
      },
      ShowRoleDialog(idx){
        this.indexidx=idx;
        //this.dialogVisible=true;
      },
      del(data){
        var url=Cms.ip+'/rms/rmsService/deleteFunctionsGroup';
        console.log(data[this.indexidx].fun_grp_id);
        var param={fun_grp_id:data[this.indexidx].fun_grp_id};
        var that=this;
        Cms.axios(url+'?'+JSON.stringify(param),{},function(res){
          if(res.status==200){
            that.tableData.splice(that.indexidx,1);
          }
        });
        this.dialogVisible=false;
      },
      submit(){
        let checknodes=this.$refs.tree.getCheckedNodes();
        if(this.dialogType==0){
          var url=Cms.ip+'/rms/rmsService/addFunctionsGroup';
          var param={
            fun_grp_name:this.form.fun_grp_name,
            fun_grp_description:this.form.fun_grp_description
          };
          var that=this;
          Cms.axios(url+'?'+JSON.stringify(param),{},function(res){
            if(res.status==200){
              that.tableData.unshift(res.data);
              url=Cms.ip+'/rms/rmsService/addFunctionsRight';
              for(let i=0;i<checknodes.length;i++){
              let subparam={
                fun_id:checknodes[i].fun_id,
                fun_grp_id :res.data.fun_grp_id
              };
              Cms.axios(url+'?'+JSON.stringify(subparam),{},function(subres){
                
              });
            }
            }
          });
          
        }
        else if(this.dialogType==1){
          var url=Cms.ip+'/rms/rmsService/updateFunctionsGroup';
          var param={
            fun_grp_id:this.tableData[this.indexidx].fun_grp_id,
            fun_grp_name:this.form.fun_grp_name,
            fun_grp_description:this.form.fun_grp_description
          }
          var that=this;
          Cms.axios(url+'?'+JSON.stringify(param),{},function(res){
            if(res.status==200){
              that.tableData[that.indexidx].fun_grp_name=param.fun_grp_name;
              that.tableData[that.indexidx].fun_grp_description=param.fun_grp_description;
            }
          });

        }
        this.dialogFormVisible=false;
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
        //console.log(data, checked, indeterminate);
        //console.log(this.$refs.tree.getCheckedNodes());
      },
      handleNodeClick(data) {
      },
      loadNode(node, resolve) {
        console.log('已经触发');
        if (node.level === 0) {
          var url=Cms.ip+'/rms/rmsService/queryFunctions';
           Cms.axios(url,{},function(response){
              if(response.status==200){
                let funs=response.data;
                return resolve(funs);
              }
            });
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
          data = [];
          resolve(data);

          }, 500);
      },
      //功能选择结束
    
    }
  }
</script> 
