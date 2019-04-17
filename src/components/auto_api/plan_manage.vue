<template>
	<div id="api">
		<el-row>
			<el-button type="success" round @click="createSuite">新增计划</el-button>
		</el-row>
		
		<el-row style="height:40px;margin:40px" >
			<el-col :span="8">所属服务：
				<el-select v-model="projectName" placeholder="请输入项目名">
					<el-option v-for="item in projectList" :key="item" :label="item" :value="item"></el-option>
				</el-select>
			</el-col>
			<el-col :span="8">
				<el-input v-model="planName" placeholder="请输入计划名称" clearable></el-input>
			</el-col>
			<el-col :span="4">
				<el-button type="success" @click="getAllPlan">查询</el-button>
			</el-col>
		</el-row>
		<el-row>
			<div id="tableData">
				<el-table :data="planData" border>
					<el-table-column type="index"></el-table-column>
					<el-table-column prop="planId" label="计划ID" v-if=false></el-table-column>
					<el-table-column prop="planName" label="计划名称"></el-table-column>
					<el-table-column prop="projectName" label="关联服务" ></el-table-column>
					<el-table-column prop="baseUrl" label="请求网址"></el-table-column>
					<el-table-column prop="userName" label="登录用户名" ></el-table-column>
					<el-table-column prop="passWord" label="登录密码" ></el-table-column>
					<el-table-column prop="email" label="收件人邮箱" ></el-table-column>
					<el-table-column>
						<template slot="header" slot-scope="scope">操作</template>
						<template slot-scope="scope">
							<el-button @click="editPlan(scope.row)" type="success" size="small">Edit</el-button>
							<el-button @click="delPlan(scope.row)" type="danger" size="small">Delete</el-button>
						</template>
					</el-table-column>
			    </el-table>
			</div>
		</el-row>
		<el-dialog title="编辑计划" :visible.sync="dialogEditPlan">
			<el-form :model="plan">
				<el-form-item label="计划名称" :required="true">
					<el-input v-model="plan.planName" placeholder="请输入计划名称"></el-input>
				</el-form-item>
				<el-form-item label="关联服务" :required="true">
					<el-select v-model="plan.projectName">
						<el-option v-for="item in projectList" :key="item" :value="item" :lable="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="请求网址" :required="true">
					<el-input v-model="plan.baseUrl" placeholder="请输入请求网址"></el-input>
				</el-form-item>
				<el-form-item label="登录用户名">
					<el-input v-model="plan.userName" placeholder="请输入登录用户名"></el-input>
				</el-form-item>
				<el-form-item label="请求网址">
					<el-input v-model="plan.passWord" placeholder="请输入用户名密码"></el-input>
				</el-form-item>
				<el-form-item label="收件人邮箱">
					<el-input v-model="plan.passWord" placeholder="请输入收件人邮箱"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="ensureEditPlan">确定</el-button>
				<el-button @click="dialogEditPlan=false">取消</el-button>
			</span>
		</el-dialog>
		<el-dialog title="删除计划" :visible.sync="dialogDelPlan">
			<span>请确认是否删除{{plan.planName}}</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="ensureDeletePlan">确认</el-button>
				<el-button @click="dialogDelPlan=false">取消</el-button>
			</span>
		</el-dialog>
	</div>
		
</template>
<script>
	export default {
		name:'case',
		mounted:function(){
			this.getAllProject();
			this.getAllPlan();
		},
		data(){
			return {
				projectList:[],
				projectName:"",
				planName:"",
				dialogEditPlan:false,
				dialogDelPlan:false,
				plan:{
					planId:0,
					planName:"",
					projectName:"",
					baseUrl:"",
					userName:"",
					passWord:"",
					email:""
				},
				response:{
					result:"",
					msg:"",
					data:[]
				},
				planData : [
				]
			}
		},
		methods:{
			getAllProject:function(){
				this.$http.getUrl("project/getAll").then(res=>{
					this.projectList = res.data;
				});
			},
			getAllPlan:function(){
				this.$http.get("plan/queryPlan",{projectName:this.projectName,planName:this.planName}).then(res=>{
					this.planData = res.data;
				});
			},
			editPlan:function(row){
				this.dialogEditPlan = true;
				this.plan.planId = row.planId;
				this.plan.planName = row.planName;
				this.plan.projectName = row.projectName;
				this.plan.baseUrl = row.baseUrl;
				this.paln.userName = row.userName;
				this.plan.passWord = row.passWord;
				this.plan.email = row.email;

			},
			ensureEditPlan:function(){
				this.$http.post("plan/updatePlan",this.plan).then(res=>{
					this.response = res;
					this.dialogEditPlan = false;
					//this.step = Object.assign({}, this.newStep);
					this.afterOperate();
					this.getAllPlan();
				})
			},
			delPlan:function(row){
				this.plan.planId = row.planId;
				this.plan.planName = row.planName;
				this.dialogDelPlan = true;
			},
			ensureDeletePlan:function(){
				this.$http.post("plan/delPlan",{planId:this.plan.planId}).then(res=>{
					this.response = res;
					this.dialogDelPlan = false;
					//this.step = Object.assign({}, this.newStep);
					this.afterOperate();
					this.getAllPlan();
				})
			},
			afterOperate(){
				if(this.response.result=="200"){
					this.$message.success(this.response.msg)
				}else{
					this.$message.error(this.response.msg)
				}
			}
			
		}
	}
</script>