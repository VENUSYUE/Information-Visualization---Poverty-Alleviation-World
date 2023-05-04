<template>
  <div>
    <div id="chargePeoleInfoBox" v-show="chagepeopleInfoShow">
      <div id="chargePeoleInfoBoxTitle">负责人信息表单</div>
      <el-input class="chargePersonInput" placeholder="id号" v-model="chargePersonInfo.idc"></el-input>
      <el-input class="chargePersonInput" placeholder="姓名" v-model="chargePersonInfo.name"></el-input>
      <el-input class="chargePersonInput" placeholder="性别" v-model="chargePersonInfo.sexy"></el-input>
      <el-input class="chargePersonInput" placeholder="负责贫困县" v-model="chargePersonInfo.chargearea"></el-input>
      <el-input class="chargePersonInput" placeholder="具体位置" v-model="chargePersonInfo.position"></el-input>
      <div id="submitBtnContainer">
        <el-button type="success" @click="insertChargePerson">提交</el-button>
        <el-button type="warn" @click="closeAdd">取消</el-button>
      </div>
    </div>
    <el-container>
      <el-aside width="200px" class="peopleManageAside">
        <el-menu
          text-color="#fff"
          class="personManageMenu"
          @select="selectEvent"
        >
          <el-menu-item index="1">
            管理员信息查看
          </el-menu-item>
          <el-menu-item index="2">
            负责人信息管理
          </el-menu-item>
          <el-menu-item index="3">
            用户信息管理
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <div id="personManageCloseBtnContainer">
          <el-button icon="el-icon-close" type="warning" class="personManageCloseBtn" @click="emitClosePersonManage" circle></el-button>
        </div>
        <el-header class="peopleManageTitle"><el-col :span="24"><div>人员信息管理界面</div></el-col></el-header>
        <el-main class="personManageTable">
          <!--管理员表格-->
          <el-table :data="adminTableData" max-height="600" v-show="adminTableShow">
            <el-table-column
              label="管理员账户"
              prop="username">
            </el-table-column>
            <el-table-column
              label="密码"
              prop="password">
            </el-table-column>
            <el-table-column
              align="right">
              <template slot="header" slot-scope="scope">
                <el-input
                  v-show="!adminTableShow"
                  v-model="search"
                  size="mini"
                  placeholder="placeholder"/>
              </template>
              <template slot-scope="scope">
              </template>
            </el-table-column>
          </el-table>
          <!--负责人表格-->
          <el-table :data="chargePeopleTableData" max-height="600" v-show="chargePeopleTableShow" >
            <el-table-column
              label="idc">
              <template slot-scope="scope">
                <span v-if="!showEdit[scope.$index]">{{scope.row.idc}}</span>
                <el-input type="text" v-else v-model="showIdc[0]"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="姓名">
              <template slot-scope="scope">
                <span v-if="!showEdit[scope.$index]">{{scope.row.name}}</span>
                <el-input type="text" v-else v-model="showIdc[1]"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="性别">
              <template slot-scope="scope">
                <span v-if="!showEdit[scope.$index]">{{scope.row.sexy}}</span>
                <el-input type="text" v-else v-model="showIdc[2]"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="负责贫困县">
              <template slot-scope="scope">
                <span v-if="!showEdit[scope.$index]">{{scope.row.chargearea}}</span>
                <el-input type="text" v-else v-model="showIdc[3]"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="位置">
              <template slot-scope="scope">
                <span v-if="!showEdit[scope.$index]">{{scope.row.position}}</span>
                <el-input type="text" v-else v-model="showIdc[4]"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="right">
              <template slot="header" slot-scope="scope">
                <el-button icon="el-icon-document-add" @click="chagepeopleInfoShow=!chagepeopleInfoShow">添加负责人</el-button>
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button
                  size="mini"
                  @click="saveChargePeopleInfo(scope.$index, scope.row)">save</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="deleteChargePeopleInfo(scope.$index, scope.row)" class="deleteBtn">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--用户表格-->
          <el-table :data="userTableData" max-height="600" v-show="userTableShow" style="width: 100%">
            <el-table-column
              label="用户名"
              prop="username">
            </el-table-column>
            <el-table-column
              label="密码"
              prop="passWord">
            </el-table-column>
            <el-table-column
              label="用户类型"
              prop="type">
            </el-table-column>
            <el-table-column
              label="身份证号"
              prop="id">
            </el-table-column>
            <el-table-column
              label="姓名"
              prop="name">
            </el-table-column>
            <el-table-column
              label="所属贫困县"
              prop="belong">
            </el-table-column>
            <el-table-column
              label="位置"
              prop="position">
            </el-table-column>
            <el-table-column
              align="right">
              <template slot="header" slot-scope="scope">
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="deleteUserInfo(scope.$index, scope.row)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "personManage",
  props:{
    adminArea:String
  },
  data() {
    return {
      showEdit:[],
      chagepeopleInfoShow:false,
      showIdc:['','','','',''],
      adminTableShow:true,
      chargePeopleTableShow:false,
      userTableShow:false,
      adminTableData: [
      ],
      chargePeopleTableData: [
      ],
      userTableData: [
      ],
      search: '',
      curIndex:null,
      curIdc:"",
      chargePeopleTableLength:undefined,
      chargePersonInfo:{
        idc:'',
        name:'',
        sexy:'',
        chargearea:'',
        position:''
      }
    }
  },
  created() {
    // this.refreshAdminTable();
  },
  methods: {
    handleEdit(index, row) {
      this.showEdit.forEach((value,index)=>{
        this.showEdit[index] = false;
      });
      this.showIdc[0] = row.idc;
      this.showIdc[1] = row.name;
      this.showIdc[2] = row.sexy;
      this.showIdc[3] = row.chargearea;
      this.showIdc[4]= row.position;
      this.curIndex=index;
      this.curIdc =row.idc;
      this.showEdit.splice(this.curIndex,1,true);
    },
    refreshAdminTable(){
      if(this.adminArea=='全国'){
        this.getalladminUrl='http://localhost:3000/getalladmin'
      }else{
        this.getalladminUrl='http://localhost:3000/getpartadmin?adminarea='+this.adminArea;
      }

      this.axios.get(this.getalladminUrl).then(res=>{
        this.adminTableData = res.data;
      })
    },
    refreshChargePeopleTable(){
      if(this.adminArea=='全国'){
        this.getallchargepeopleUrl='http://localhost:3000/getallchargepeople';
      }else{
        this.getallchargepeopleUrl='http://localhost:3000/getpartchargepeople?chargearea='+this.adminArea;
      }
      this.showEdit.length=0;
      this.axios.get(this.getallchargepeopleUrl).then(res=>{
        this.chargePeopleTableData = res.data;
        this.chargePeopleTableLength = res.data.length;
        for(var i = 0;i<res.data.length;i++){
          this.showEdit.push(false);
        }
      })
    },
    refreshUserTable(){
      if(this.adminArea=='全国'){
        this.getallusersUrl='http://localhost:3000/getallusers';
      }else{
        this.getallusersUrl='http://localhost:3000/getpartusers?belong='+this.adminArea;
      }
      this.axios.get(this.getallusersUrl).then(res=>{
        this.userTableData = res.data;
      })
    },
    selectEvent(index){
      //选中管理员
      if(index==1){
        this.adminTableShow=true;
        this.chargePeopleTableShow=false;
        this.userTableShow=false;
        //数据的更新
        this.refreshAdminTable();
      }else if(index==2){
        this.adminTableShow=false;
        this.chargePeopleTableShow=true;
        this.userTableShow=false;
        //数据的更新
        this.refreshChargePeopleTable();
      }else{
        this.adminTableShow=false;
        this.chargePeopleTableShow=false;
        this.userTableShow=true;
        //数据的更新
        this.refreshUserTable();
      }
    },
    saveChargePeopleInfo(index,row){
      if(this.curIndex!==index){
        return;
      }
      var idcold = row.idc;
      var idc = this.showIdc[0];
      var name = this.showIdc[1];
      var sexy = this.showIdc[2];
      var chargearea = this.showIdc[3];
      var position = this.showIdc[4];
      //更新数据库
      this.axios.get('http://localhost:3000/updatechargepeople?idcold='+idcold+'&idc='+idc+'&name='+name+'&sexy='+sexy+'&chargearea='+chargearea+'&position='+position).then(res=>{
        this.$message({
          message: '更新成功！',
          type: 'success'
        });
        //刷新列表
        this.refreshChargePeopleTable();
        //状态更新
        this.showEdit.forEach((value,index)=>{
          this.showEdit[index]=false;
        })
        this.showIdc.forEach((value,index)=>{
          this.showIdc[index]='';
        })
      });
    },
    deleteChargePeopleInfo(index,row){
      var idc = row.idc;
      this.$confirm('确定要删除该负责人?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.axios.get('http://localhost:3000/deletechargeperson?idc='+idc).then(res=>{
          this.$message({
            message: '删除成功！',
            type: 'success'
          });
          //刷新列表
          this.refreshChargePeopleTable();
        })
      }).catch(()=>{
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    deleteUserInfo(index,row){
      var username = row.username;
      this.$confirm('确定要删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.axios.get('http://localhost:3000/deleteuser?username='+username).then(res=>{
          this.$message({
            message: '删除成功！',
            type: 'success'
          });
          //刷新列表
          this.refreshUserTable();
        })
      }).catch(()=>{
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    insertChargePerson(){
      var idc = this.chargePersonInfo.idc;
      var name = this.chargePersonInfo.name;
      var sexy = this.chargePersonInfo.sexy;
      var chargearea= this.chargePersonInfo.chargearea;
      var position= this.chargePersonInfo.position;

      if(idc===''||name===''||sexy===''||chargearea===''||position===''){
        this.$message.error('信息必须填写完整!');
        return;
      }

      this.axios.get('http://localhost:3000/insertchargepeople?idc='+idc+'&name='+name+'&sexy='+sexy+'&chargearea='+chargearea+'&position='+position).then(res=>{
        if(res.data==false){
          this.$message.error('新建负责人失败!用户名不能重复');
          return;
        }
        this.$message({
          message: '新建负责人成功',
          type: 'success'
        });
        //刷新列表
        this.refreshChargePeopleTable();
        //隐藏页面
        this.chagepeopleInfoShow = false;
        for(let key in this.chargePersonInfo){
          this.chargePersonInfo[key]='';
        }
      })
    },
    closeAdd(){
      this.chagepeopleInfoShow=false;
    },
    emitClosePersonManage(){
      this.$emit('closePersonManage');
    }
  },
}
</script>

<style scoped>
/*#personManageContainerC{*/
/*  width: 100%;*/
/*  height: 100%;*/
/*  position: absolute;*/
/*  top: 0;*/
/*  left: 0;*/
/*  background-color: white;*/
/*}*/
.peopleManageAside{
  /*background-color: #00b09b;*/
}
.peopleManageTitle{
  background-color: rgb(11,42,49);
  padding: 0 !important;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  letter-spacing: 5px;
  /*height: 100% !important;*/
  color: white;
  /*opacity: 90%;*/
}
.personManageTable{
  padding: 0 !important;
}
.personManageMenu{
  height: 100%;
  background-color: rgb(9,29,51);
  opacity: 0.9;
}
.deleteBtn{
  margin-right: 23px !important;
  margin-top: 3px;
}
#chargePeoleInfoBox{
  border: 1px solid #7cbaec;
  position: absolute;
  width: 40%;
  background-color: #8c8c8c;
  top: 50px;
  left: 40%;
  z-index: 9999;
}
#chargePeoleInfoBoxTitle{
  height: 50px;
  font-size: 25px;
  font-weight: bolder;
  line-height: 50px;
  text-align: center;
  color: white;
}
#submitBtnContainer{
  margin-top: 5px;
  text-align: center;
}
.chargePersonInput{
  margin-bottom: 5px;
}
#personManageCloseBtnContainer{
  position: absolute;
  top: 5px;
  right: 5px;
}
.personManageCloseBtn{
  font-size: 20px;
  color: white !important;
  z-index: 9999;
}
</style>
