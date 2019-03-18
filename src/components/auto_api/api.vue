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
							<el-button @click="editApi(scope.row)" type="success" size="small">Edit</el-button>
							<el-button @click="delApi(scope.row)" type="danger" size="small">Delete</el-button>
						</template>
					</el-table-column>
			    </el-table>
			</div>
		</el-row>
		<el-dialog title="新增接口" :visible.sync="dialogCreateApi" width="700px" @open="openCreateDialog()" @close="queryApi()">
			<el-form :model="api" label-width="100px">
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
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="ensureCreateApi">确定</el-button>
				<el-button @click="dialogCreateApi=false">取消</el-button>
			</span>
		</el-dialog>
		<el-dialog title="编辑接口" :visible.sync="dialogEditApi" @close="queryApi()">
			<el-form :model="api" label-width="100px">
				<el-form-item label="接口路径" :required="true">
					<el-input v-model="api.apiPath"></el-input>
				</el-form-item>
				<el-form-item label="接口描述" :required="true">
					<el-input v-model="api.apiDescription"></el-input>
				</el-form-item>
				<el-form-item label="接口ID">
					<el-input v-model="api.apiId" disabled></el-input>
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
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="ensureEditApi">确定</el-button>
				<el-button @click="dialogEditApi=false">取消</el-button>
			</span>
		</el-dialog>
		<el-dialog title="删除接口" :visible.sync="dialogDelApi" width="30%" @close="queryApi()">
			<span>确定是否删除接口:{{api.apiPath}} </span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="ensureDelApi">确定</el-button>
				<el-button @click="dialogDelApi=false">取消</el-button>
			</span>
		</el-dialog>
	</div>
		
</template>
<script>
	export default {
		name:'api',
		mounted:function(){
			this.getAllProject();
			this.queryApi();
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
				response:{
					result:"",
					msg:"",
					data:[]
				},
				apiPath:"",
				projectName:"",
				dialogCreateApi:false,
				dialogEditApi:false,
				dialogDelApi:false,
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
			editApi:function(row){
				this.dialogEditApi=true,
				this.api.apiId=row.apiId,
				this.api.apiPath=row.apiPath,
				this.api.apiDescription=row.apiDescription,
				this.api.apiProtocol=row.apiProtocol,
				this.api.apiReqMethod=row.apiReqMethod,
				this.api.apiOfProject=row.apiOfProject
			},
			ensureEditApi:function(){
				this.$http.post("api/edit",this.api).then(res=>{
					this.response = res;
					this.afterOperate();
					this.dialogEditApi = false;
				})
                
			},
			delApi:function(row){
				this.dialogDelApi = true;
				this.api.apiId=row.apiId;
				this.api.apiPath=row.apiPath;
				
			},
			ensureDelApi:function(){
				this.$http.get("api/del",{apiId:this.api.apiId}
					).then(res=>{
					this.response = res;
					this.dialogDelApi=false;
					this.afterOperate();
				})
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