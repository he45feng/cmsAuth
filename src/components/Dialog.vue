<template>
  <div v-if="showDialog != undefined">
    <el-dialog :title="showDialog.title" v-model="showDialog.dialogVisible" size="tiny">
      <span>{{showDialog.content}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="showDialog.callBack">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  	export default {
       data () {
      return {
        radio: '1'
      };
    },
      props:{
        showDialog : {
          type : Object
        }
      }
  	}
</script>
