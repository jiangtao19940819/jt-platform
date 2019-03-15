<template>
	<div id="api">
		<el-row>
			<el-button type="success" round @click="createApi">新增接口</el-button>
		</el-row>
		
		<el-row style="height:40px;margin:40px" >
			<el-col :span="8">所属服务：
				<el-select v-model="projectName" placeholder="请输入项目名">
					<el-option v-for="item in projectList" :key="item" :label="item" :value="item"></el-option>
				</el-select>
			</el-col>
			<el-col :span="8">
				<el-input v-model="apiPath" placeholer="请输入接口路径" clearable></el-input>
			</el-col>
			<el-col :span="4">
				<el-button type="success" @click="queryApi()">查询</el-button>
			</el-col>
		</el-row>
		<el-row>
			<div id="tableData">
				<el-table :data="apiData" border>
					<el-table-column type="index"></el-table-column>
					<el-table-column prop="apiPath" label="接口路径"></el-table-column>
					<el-table-column prop="apiId" label="接口Id" ></el-table-column>
					<el-table-column prop="apiDescription" label="接口描述"></el-table-column>
					<el-table-column prop="apiProtocol" label="接口协议" ></el-table-column>
					<el-table-column prop="apiReqMethod" label="请求方式" ></el-table-column>
					<el-table-column prop="apiOfProject" label="所属服务"></el-table-column>
					<el-table-column>
						<template slot="header" slot-scope="scope">操作</template>
						<template slot-scope="scope">
							<el-button @click="editProject(scope.row)" type="success" size="small">Edit</el-button>
							<el-button @click="deleteProject(scope.row)" type="danger" size="small">Delete</el-button>
						</template>
					</el-table-column>
			    </el-table>
			</div>
		</el-row>
		<el-dialog title="新增接口" :visible.sync="dialogCreateApi" width="700px" @open="openCreateDialog()" @close="openCreateDialog()">
			<el-form :model="api">
				<el-form-item label="接口路径" :required="true">
					<el-input v-model="api.apiPath" placeholder="请输入接口路径"></el-input>
				</el-form-item>
				<el-form-item label="接口描述" :required="true">
					<el-input v-model="api.apiDescription" placeholder="请输入接口描述"></el-input>
				</el-form-item>
				<el-form-item label="接口协议">
					<el-select v-model="api.apiProtocol">
						<el-option v-for="item in apiProtocolList" :key="item" :value="item" :lable="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="请求方式">
					<el-select v-model="api.apiReqMethod">
						<el-option v-for="item in apiReqMethodList" :key="item" :value="item" :lable="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所属服务">
					<el-select v-model="api.apiOfProject">
						<el-option v-for="item in projectList" :key="item" :value="item" :lable="item"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer">
				<el-button type="primary" @click="ensureCreateApi">确定</el-button>
				<el-button @click="dialogCreateApi=false">取消</el-button>
			</span>
		</el-dialog>
		<el-dialog title="编辑接口">
			
		</el-dialog>
	</div>
		
</template>
<script>
	export default {
		name:'api',
		mounted:function(){
			this.getAllProject();
		},
		data(){
			return {
				apiData : [
					{   
						apiId:1,
						apiPath:"createProject",
						apiDescription:"创建PPT",
						apiProtocol:"http",
						apiReqMethod:"POSTJSON",
						apiOfProject:"crmdata"
					}
				],
				projectList:[],
				api :{
					apiId:0,
					apiPath:"",
					apiDescription:"",
					apiProtocol:"HTTP",
					apiReqMethod:"GET",
					apiOfProject:""
				},
				apiTemplate :{
					apiPath:"",
					apiDescription:"",
					apiProtocol:"HTTP",
					apiReqMethod:"GET",
					apiOfProject:""
				},
				response:{
					result:"",
					msg:"",
					data:[]
				},
				apiPath:"",
				projectName:"",
				dialogCreateApi:false,
				apiProtocolList:["HTTP","HTTPS","RPC","SOA"],
				apiReqMethodList:["GET","POSTJSON","POST"]
			}
		},
		methods:{
			createApi:function(){
				this.dialogCreateApi = true;
			},
			openCreateDialog:function(){
				this.api.apiPath = "";
				this.api.apiDescription = "";
				this.getAllProject();
			},
			ensureCreateApi:function(){
				this.$http.post("api/create",this.api).then(res=>{
					this.response = res;
					this.afterOperate();
					this.dialogCreateApi=false;
					
				});
			},
			editApi:function(){
				this.$http.get("api/queryApi",{projectName:this.projectName,apiPath:this.apiPath}
					).then(res=>{
					this.response = res;
					this.apiData = res.data;
					
				});
			},
			queryApi:function(){
				this.$http.get("api/query",{projectName:this.projectName,apiPath:this.apiPath}
					).then(res=>{
					this.response = res;
					this.apiData = res.data;
				})
			},
			getAllProject:function(){
				this.$http.getUrl("project/getAll").then(res=>{
					this.projectList = res.data;
					if(this.projectList.length>0){
						this.projectName = this.projectList[0];
						this.api.apiOfProject = this.projectList[0];
					}
				});
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