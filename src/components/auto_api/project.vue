<template>
	<div id="project">
		<el-row>
			<el-button type="success" round @click="createProject
			">新增模块</el-button>
		</el-row>
		<el-row style="height:40px"><el-button @click="queryProjectList">点击</el-button></el-row>
		<el-row>
			<div id="tableData">
				<el-table :data="projectData">
					<el-table-column type="index">
					
					</el-table-column>
					<el-table-column prop="projectName" label="项目名称">
					</el-table-column>
					<el-table-column prop="projectId" label="项目ID">
					</el-table-column>
					<el-table-column prop="createTime" label="创建时间">
						
					</el-table-column>
					<el-table-column prop="projectDescription" label="项目描述">
						
					</el-table-column>
					<el-table-column>
						<template slot="header" slot-scope="scope">
							<el-input v-model="search" placeholder="请输入项目名" />
						</template>
						<template slot-scope="scope">
							<el-button @click="editProject(scope.row)" type="success">Edit</el-button>
							<el-button @click="deleteProject(scope.row)" type="danger">Delete</el-button>
						</template>
					</el-table-column>
			    </el-table>
			</div>
		</el-row>
		<el-dialog title="是否删除" :visible.sync="dialogTableVisible" width="30%">
			<span>请确认是否删除：{{project.projectName}}</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="ensureDelProject">确 定</el-button>
   			  	<el-button @click="dialogTableVisible = false">取 消</el-button>
  			</span>
		</el-dialog>
		<el-dialog title="编辑项目" :visible.sync="dialogEditProject">
			<el-form :model="project" label-width="100px">
				<el-form-item label="项目ID">
					<el-input v-model="project.projectId" disabled></el-input>
				</el-form-item>
				<el-form-item label="项目名称" :required="true">
					<el-input v-model="project.projectName"></el-input>
				</el-form-item>
				<el-form-item label="创建时间">
					<el-input v-model="project.createTime" disabled></el-input>
				</el-form-item>
				<el-form-item label="项目描述">
					<el-input v-model="project.projectDescription"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="ensurEditProject">确 定</el-button>
   			  	<el-button @click="dialogEditProject = false">取 消</el-button>
  			</span>
		</el-dialog>
		<el-dialog title="新增模块" :visible.sync="dialogCreateProject" id="addProject">
			<el-form :model="project" label-width="100px">
				<el-form-item label="名称" :required="true">
					<el-input v-model="project.projectName" placeholder="请输入项目名"></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input v-model="project.projectDescription" placeholder="请输入备注"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="ensureAddProject">确 定</el-button>
   			  	<el-button @click="dialogCreateProject = false">取 消</el-button>
  			</span>
		</el-dialog>

			
	</div>
		
</template>
<script>
	export default {
		name:'project',
		data(){
			return {
				projectData: [
				],
				project:{
					projectName: '',
					projectId:0,
					createTime: '',
					projectDescription: ''
				},
				search:"",
				dialogCreateProject:false,
				dialogTableVisible:false,
				dialogEditProject:false,
				response:{
					result:"",
					msg:"",
					data:[]
					}
				}
			},
			mounted:function(){
				this.queryProjectList();
			},
			
			methods: {
				editProject(row){
					this.project.projectId = row.projectId;
					this.project.projectName = row.projectName;
					this.project.createTime = row.createTime;
					this.project.projectDescription = row.projectDescription;
					this.dialogEditProject = true;
				},
				ensurEditProject(){
					this.$http.post("project/update",this.project).then(res=>{
						this.response = res;
						this.afterOperate();
						this.queryProjectList();
						this.dialogEditProject = false;
					});
					
				},
				deleteProject(row){
					this.project.projectId = row.projectId;
					this.project.projectName = row.projectName;
					this.project.projectTime = row.createTime;
					this.project.projectDescription = row.projectDescription;
					this.dialogTableVisible = true;
				},
				ensureDelProject(){
					this.$http.post("project/delete",this.project).then(res=>{
						this.response = res;
						this.afterOperate();
						this.queryProjectList();
						this.dialogTableVisible = false;
					})
				},
				createProject(){
					this.project.projectName  = "";
					this.project.crateTime  = "";
					this.project.projectDescription  = "";
					this.dialogCreateProject = true

				},
				ensureAddProject(){
					this.$http.post("project/create",this.project).then(res=>{
						this.response = res;
						this.afterOperate();
						this.queryProjectList();
						this.dialogCreateProject = false;
					});
					
					//this.dialogCreateProject = false;
				},
				queryProjectList(){
					this.$http.get("project/query",{search:this.search}).then(res=>{
						this.response = res;

						this.projectData = this.response.data;
					})
				},
				sendMessage2(){
					this.$http.get("project/query",{search:this.search}).then(res=>{
						this.response = res;

						this.projectData = this.response.data;
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