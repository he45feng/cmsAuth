<template>
	<div>
		<el-button type="primary" icon="plus" @click="addUser">新增</el-button>

		<el-table c-loading="loading" element-loading-text="拼命加载中" :data="userTatle" border style="width :100%" class="umar-t10">
			<el-table-column prop="id" label="角色ID" width="80"></el-table-column>
			<el-table-column prop="display_name" label="角色名称" width="120"></el-table-column>
			<el-table-column prop="user_type" label="用户类型" width="120"></el-table-column>
			<el-table-column prop="create_user_name" label="创建者名称" width="120"></el-table-column>
			<el-table-column prop="create_date" label="创建时间" width="160"></el-table-column>
			<el-table-column prop="create_user_account" label="描述" width="160"></el-table-column>
			<el-table-column fixed="right" label="操作">
				<template prop="id" scope="scope">
					<el-button @click.native.prevent="edit(scope.$index,userTatle)" type="text" size="small">编辑</el-button>
					<el-button @click.native.prevent="del(scope.$index, userTatle)" type="text" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--http://172.254.48.7:8081/rms/rmsService/queryFunctionsGroupUser  IP-->
		<!-- 编辑、添加dialog-->
		<el-dialog :title="dialogTitle" size="small" v-model="dialogFormVisible">
			<el-form :model="editFrom">
				
				<el-form-item label="用户名称" :label-width="formLabelWidth">
					<el-input v-model.trim="editFrom.display_name" placeholder="请输入用户名称" auto-complete="off"></el-input>
				</el-form-item>
				
				<el-form-item label="用户类型" :label-width="formLabelWidth">
					<el-select v-model="editFrom.user_type" style="width: 100%;">
						<el-option label="个人" value="1"></el-option>
						<el-option label="公司" value="2"></el-option>
						<el-option label="政府" value="3"></el-option>
					</el-select>
				</el-form-item>
				
				<el-form-item label="描述：" :label-width="formLabelWidth">
					<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model.trim="editFrom.create_user_account">
					</el-input>
				</el-form-item>
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click=" dialogFormVisible = false  ">取消</el-button>
				<el-button type="primary" @click="submit(dialogType)">确定</el-button>
			</div>
		</el-dialog>

		<cms-dialog :showDialog="showDialog"></cms-dialog>
	</div>
</template>

<script>
	import Dialog from '../../components/Dialog'
	import Cms from '../../base-config'

	export default {
		name: 'userTatle',
		data() {
			return {
				loading: false, //加载中...
				showDialog: {}, // 删除 
				infoIdx: 0, // 索引值
				dialogType: 0, //对话框类型   
				dialogTitle: '', // 头部名称
				dialogTableVisible: false,
				dialogFormVisible: false, //是否显示编辑框
				formLabelWidth: '120px', //宽度
				userTatle: [],
				editFrom: {} //form 提交的数据
			}
		},
		components: {
			"cms-dialog": Dialog
		},
		mounted() {
			this.readyQuery();
		},
		methods: {
			addUser() {
				this.dialogType = 0;
				this.editFrom = {};
				this.dialogFormVisible = true;
				this.dialogTitle = "新增用户";
			},
			edit(idx,data) {
				this.dialogType = 1;
				this.infoIdx = idx;
				this.dialogFormVisible = true;
				this.dialogTitle = "编辑用户";
				this.editFrom = {
					'display_name': data[idx].display_name,
					'user_type': data[idx].user_type,
					"create_user_account": data[idx].create_user_account
				}

			},
			del(idx) {
				var This = this;
				This.showDialog = { //显示删除提示框
					dialogVisible: true,
					title: '提示',
					content: '确定要删除吗？',
					callBack: function() {
						alert(111)
						var url = Cms.ip + '/rms/funcGUSer/deleteFunctionsGroupUser';
						Cms.axios(url, { //发送删除请求
							'id': This.userTatle[idx].id
						}, function(response) {
							if(response.status == 200) {
								This.userTatle.splice(idx, 1);
								This.showDialog.dialogVisible = false;
							} else {
								This.$notify.error({
									title: '提示',
									message: '抱歉，出错了！'
								});
							}
						});
					}
				}

			},
			submit(dialogType) {
				var that = this;
				console.log(that.editFrom)
				if(!that.editFrom.display_name) {
					alert('请输入名称');
					return;
				} else if(!that.editFrom.user_type) {
					alert("请选择用户类型");
					return;
				}
				that.loading = true;
				that.dialogFormVisible = false;
				if(that.dialogType == 0) {
					var url = Cms.ip + '/rms/funcGUSer/addFunctionsGroupUser'
					Cms.axios(url, {
						display_name: that.editFrom.display_name,
						user_type: that.editFrom.user_type,
						create_user_account: that.editFrom.create_user_account
					
					}, function(response) {
						alert(111);
						that.loading = false;
						if(response.status == 200) {
							that.userTatle.unshift(response.data);
						} else {
							that.$notify.error({
								title: '提示',
								message: '抱歉，出错了！'
							});
						}
					})
				} else if(dialogType == 1) {
					var url = Cms.ip + '/rms/funcGUSer/updateFunctionsGroupUser'
					alert(111)
					console.log(that.editFrom)
//					console.log(that.editFrom[that.infoIdx].id)
					Cms.axios(url, {
						id : that.userTatle[that.infoIdx].id,
						user_id:'UR1000007140',
						fun_grp_id:27,
						display_name: that.editFrom.display_name,
						user_type: that.editFrom.user_type,
						create_user_account: that.editFrom.create_user_account
					}, function(response) {
						that.loading = false;
						if(response.status == 200) {
							alert(222)
							//console.log(response);
							that.userTatle[that.infoIdx].display_name = that.editFrom.display_name;
							that.userTatle[that.infoIdx].user_type = that.editFrom.user_type;
							that.userTatle[that.infoIdx].create_user_account = that.editFrom.create_user_account;
						} else {
							that.$notify.error({
								title: '提示',
								message: '抱歉，出错了！'
							});
						}
					});
				}

			},
			readyQuery() {
				var that = this;
				var url = Cms.ip + '/rms/funcGUSer/queryFunctionsGroupUser';

				Cms.axios(url, {}, function(response) {
					if(response.status == 200) {
						var roles = response.data;
						for(let i = 0; i < roles.length; i++) {
							that.userTatle.push(roles[i]);
						}
					} else {
						that.$notify.error({
							title: '提示',
							message: '抱歉，出错了！'
						});
					}
				})
			}

		}

	}
</script>