<template>
	<div id="project">
		<el-row>
			<el-button type="success" round @click="createProject
			">新增模块</el-button>
		</el-row>
		<el-row style="height:40px"><el-button @click="sendMessage">点击{{response}}</el-button></el-row>
		<el-row>
			<div id="tableData">
				<el-table :data="projectData.filter(data=>data.name.includes(search))" stripe border>
					<el-table-column type="index">
					
					</el-table-column>
					<el-table-column prop="name" label="模块名">
					</el-table-column>
					<el-table-column prop="time" label="创建时间">
						
					</el-table-column>
					<el-table-column prop="description" label="描述">
						
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
			<span>这是一个提示</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="ensureDelProject">确 定</el-button>
   			  	<el-button @click="dialogTableVisible = false">取 消</el-button>
  			</span>
		</el-dialog>
		<el-dialog title="编辑项目" :visible.sync="dialogEditProject">
			<el-form :model="project">
				<el-form-item label="名称">
					<el-input v-model="project.name" placeholder="project.name"></el-input>
				</el-form-item>
				<el-form-item label="时间">
					<el-input v-model="project.time" placeholder="project.time"></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input v-model="project.description" placeholder="project.description"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="ensurEditProject">确 定</el-button>
   			  	<el-button @click="dialogEditProject = false">取 消</el-button>
  			</span>
		</el-dialog>
		<el-dialog title="新增模块" :visible.sync="dialogCreateProject" id="addProject">
			<el-form :model="project">
				<el-form-item label="名称">
					<el-input v-model="project.projectName" placeholder="请输入项目名"></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input v-model="project.description" placeholder="请输入备注"></el-input>
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
					createTime: '',
					description: ''
				},
				name:{
					username: 'jiangtao',
					password: '1308830b'
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
			methods: {
				editProject(row){
					this.project.name = row.name;
					this.project.time = row.time;
					this.project.description = row.description;
					this.dialogEditProject = true;
				},
				ensurEditProject(){
					console.log(this.project.name)
					this.dialogEditProject = false;
				},
				deleteProject(row){
					this.project.name = row.name;
					this.project.time = row.time;
					this.project.description = row.description;
					this.dialogTableVisible = true;
				},
				ensureDelProject(){
					console.log(this.project.name)
					this.dialogTableVisible = false;
				},
				createProject(){
					this.project.name  = "";
					this.project.time  = "";
					this.project.description  = "";
					this.dialogCreateProject = true

				},
				ensureAddProject(){
					this.$http.post("project/create",this.project).then(res=>{
						this.response = res
					});
					console.log(this.response.msg)
					this.afterOperate();
					//this.dialogCreateProject = false;
				},
				sendMessage(){
					this.$http.post("getParam7",this.name).then(response=>{
						this.response = response.data
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