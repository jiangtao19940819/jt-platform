<template>
	<div id="project">
		<el-row>
			<el-button type="success" round @click="createProject
			">新增模块</el-button>
		</el-row>
		<el-row style="height:40px"><el-button @click="sendMessage">点击</el-button></el-row>
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
					<el-input v-model="project.name" placeholder="请输入项目名"></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input v-model="project.description" placeholder="请输入备注"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="ensureAddEditProject">确 定</el-button>
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
				projectData: [{
						name: 'yunguan',
						time: '2018-01-08',
						description: '运管系统'
       				},{
       					name: 'bo',
						time: '2018-02-08',
						description: '代理商系统'
       				},{
       					name: 'kabo',
						time: '2018-05-08',
						description: 'KA代理商系统'
       				},{
       					name: 'crmdata',
						time: '2018-05-08',
						description: '数据组接口'
       				},{
						name: 'yunguan',
						time: '2018-01-08',
						description: '运管系统'
       				},{
       					name: 'bo',
						time: '2018-02-08',
						description: '代理商系统'
       				},{
       					name: 'kabo',
						time: '2018-05-08',
						description: 'KA代理商系统'
       				},{
       					name: 'crmdata',
						time: '2018-05-08',
						description: '数据组接口'
       				}
				],
				project:{
					name: '',
					time: '',
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
				response:""
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
				ensureAddEditProject(){
					console.log(this.project.name);
					this.dialogCreateProject = false
				},
				sendMessage4(){
					this.$http.get("http://localhost:8888/getParam6",{
						params:this.name
					}).then(function(response){
						console.log(response)
					}).catch(function(err){
						console.log(err)
					})
				},
				sendMessage2(){
					this.$http.get(
						"http://localhost:8888/getParam6?username=jiangtao&password=123456"
					).then(function(response){
						console.log(response)
					}).catch(function(err){
						console.log(err)
					})
				},
				sendMessage3(){
					this.$http.post("http://localhost:8888/getParam7",
						this.name).then(function(res){
							console.log(res)
						}).catch(function(err){
							console.log(err)
						})
				},
				sendMessage5(){
					this.$http.get("getParam6",this.name)
				},
				sendMessage(){
					this.result = this.$http.post("getTest");
					console.log(this.result.code);
				},

			}
		}
</script>