<template>
  <div>
    
    <el-button type="primary" icon="plus"  @click="dialogFormVisible = true">新增</el-button>

    <el-table :data="tableData" border style="width: 100%" class="umar-t10">
      <el-table-column fixed prop="name" label="名称" width="150"></el-table-column>
      <el-table-column prop="group" label="所属群组" width="120"></el-table-column>
      <el-table-column prop="admin" label="创建人" width="120"></el-table-column>
      <el-table-column prop="note" label="备注" width="300"></el-table-column>
      <el-table-column prop="date" label="创建日期" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作">
      <template prop="id" scope="scope">
        <el-button  @click.native.prevent="edit(scope.$index, tableData)" type="text" size="small">编辑</el-button>
        <el-button  @click.native.prevent="del(scope.$index, tableData)" type="text" size="small">查看</el-button>
        <el-button  @click.native.prevent="del(scope.$index, tableData)" type="text" size="small">删除</el-button>
      </template>
      </el-table-column>
    </el-table>

	<!--编辑添加dialog-->
    <el-dialog title="新增功能分类" size="large" v-model="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称：" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
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
			  v-model="note">
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
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
  export default {
    name:'activePublic',
    data() {
      return {
        tableData: [{
          id:'1',
          date: '2016-05-03',
          name: '邮件服务',
          admin : '张小明',
          group : "总裁办",
          note : '总裁办所有人都有权限'
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
    methods: {
      edit(idx,data){
        this.dialogFormVisible = true;
        this.form={
          name : data[idx].name
        }
      },
      del(idx){
        this.dialogVisible = true;
        //this.tableData.splice(idx,1);
      },
      submit(){
        alert(11);
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
