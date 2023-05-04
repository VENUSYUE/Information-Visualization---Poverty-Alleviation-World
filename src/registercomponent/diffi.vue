<template>
  <div id="diffiBody">

    <div id="diffiBackImgContainer">
      <img src="static/img/backgroundImg.jpg">
    </div>

    <div id="container">
      <div id="selectFun">
        <el-button @click="showMyReq" ref="myRequestBtn" type="text" class="myRequestBtn">
          我的申请
        </el-button>
        <el-button @click="newReq" ref="newRequestBtn" type="text" class="newRequestBtn">
          新的申请
        </el-button>
      </div>

      <!--新的申请-->
      <div v-show="noneReq">
        <div id="picture">

          <div class="block" v-for="src in srcArr" >
            <el-image
              style="width: 300px; height: 320px"
              :src="src"
            ></el-image>
          </div>

          <el-upload
            class="upload-demo"
            :before-upload="beforeupload"
            action=""
            list-type="text">
            <el-button size="small" type="primary" class="upBtn">点击上传，最多只能上传5张图片</el-button>
          </el-upload>
        </div>

        <div id="text">
          <div id="textTitle">申报理由</div>
          <el-input
            type="textarea"
            :rows="21"
            placeholder="在此处请填写具体情况"
            class="inputArea"
            v-model="textContent"
          >
          </el-input>
        </div>
        <div id="submitBtn">
          <el-button type="success" @click="submit">提&nbsp&nbsp&nbsp&nbsp交</el-button>
        </div>
      </div>

      <div id="myRequest" v-show="!noneReq">
        <div id="poorRefresh"><el-button circle type="primary" icon="el-icon-refresh" @click="refresh" title="刷新请求列表"></el-button></div>
        <descriptionItem v-for="(value,index) in descriptionList" :key="index" :state="value.state" :time="value.time" :endtime="value.endtime" :text="value.text" :photo1="value.photo1" :photo2="value.photo2" :photo3="value.photo3" :photo4="value.photo4" :photo5="value.photo5">

        </descriptionItem>
      </div>
      <!--完成处理-->
      <div id="finishReq" v-show="proFinish">
        <div id="finishBtn">
          <el-button type="success" plain @click="showGrade">问题已解决</el-button>
        </div>
      </div>
      <transition name="gradeAni">
        <div id="fightGrade" v-show="gradeBox">
        <span>
          请填写对负责人的评价：
        </span>
          <el-rate
            v-model="data"
            :colors="colors"
            show-text
          >
          </el-rate>
          <div id="submitBtns">
            <el-button type="primary" @click="submitGrade" class="submitReqBtn">提交</el-button>
          </div>
        </div>
      </transition>
    </div>
  </div>

</template>

<script>
import descriptionItem from "./descriptionItem";
export default {
  name: "diffi",
  mounted() {
    this.param = new FormData();
  },
  components:{
    descriptionItem
  },
  data:function (){
    return{
      fileList: [],
      textContent:"",
      srcArr:[],
      noneReq:false,
      descriptionList:[],
      data:null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      gradeBox:false,
      proFinish:false
    }
  },
  props:{
    username:Array,
    needkeys:Array
  },
  methods:{
    beforeupload(file){
      if(this.fileList.length>5){
        this.$message({
          message: '最多只能上传五张图片!',
          type: 'warning'
        });
        return false;
      }
      var windowURL = window.URL || window.webkitURL;
      this.srcArr.push(windowURL.createObjectURL(file));
      this.fileList.push(file);
      // this.param.append('img', file);
      return false;
    },
    submit(){
      if(this.fileList.length<1){
        this.$message({
          message: '请至少上传一张图片!',
          type: 'warning'
        });
        return;
      }
      this.$confirm('每个用户在审核完成之前只能申请1次困难援助，请务必认真填写', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        date = year.toString()+"-"+month.toString()+"-"+day.toString();

        this.param.append("time",date)//获取系统当前时间);
        this.param.append("name",this.needkeys[5]);
        this.param.append("id",this.needkeys[6]);
        this.param.append("phone",this.username[2]);
        this.param.append("position",this.needkeys[9]);
        this.param.append("longitude",this.needkeys[10]);
        this.param.append("latidude",this.needkeys[11]);
        this.param.append("text",this.textContent);


        this.fileList.forEach((value,index)=>{
          this.param.append('img'+index, value);
        })
        this.axios.post("http://localhost:3000/diffi",this.param,{
          headers:{
            'Content-Type': 'multipart/form-data'
          }
        }).then(data=>{
          this.$message({
            type: 'success',
            message: '申请成功！请等待审核！'
          });
        })
        //切换页面
        this.noneReq=false;
        //改变颜色
        this.$refs['myRequestBtn'].$el.style.backgroundColor = 'rgb(84,101,169)';
        this.$refs['newRequestBtn'].$el.style.backgroundColor = 'rgb(94,94,94)';
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消申请'
        });
      });
    },
    showMyReq(){
      this.$refs['myRequestBtn'].$el.style.backgroundColor = 'rgb(84,101,169)';
      this.$refs['newRequestBtn'].$el.style.backgroundColor = 'rgb(94,94,94)';

      this.noneReq=false;
    },
    newReq(){
      //判断该用户有没有未审批的请求
      this.axios.get('http://localhost:3000/hasreq?id='+this.needkeys[6]).then(res=>{
        if(res.data.length>=1){
          this.$message({
            message: '你还有未完成的申请~',
            type: 'warning'
          });
          return;
        }else{
          this.$refs['myRequestBtn'].$el.style.backgroundColor = 'rgb(94,94,94)';
          this.$refs['newRequestBtn'].$el.style.backgroundColor = 'rgb(84,101,169)';
          this.noneReq=true;
        }
      })
    },
    initReq(){
      if(this.descriptionList.length!=0){
        this.descriptionList.length=0;
      }

      //获取用户所有申请
      this.axios.get('http://localhost:3000/getReq?id='+this.needkeys[6]).then(res=>{
        //初始化数据
        res.data.forEach((value,index)=>{
          //对数据进行初步处理
          if(value["state"]==0){
            value["state"]="申请审批中";
          }else if(value["state"]==1){
            value["state"]="已完成处理";
          }else{
            value["state"]="负责人赶往中";
          }

          value["time"]=value["time"].split("T")[0];
          value["endtime"]=value["endtime"].split("T")[0];
          if(value["endtime"]=="1899-12-31"){
            value["endtime"]="未完成";
          }

          this.descriptionList.push(value);
        });
        if(res.data[0].state=="负责人赶往中"){
          this.proFinish=true;
        }
      });
    },
    showGrade(){
      this.gradeBox=true;
    },
    submitGrade(){
      var grade = this.data;//评分
      var id = this.needkeys[6];//id号

      var date = new Date();//获取系统时间
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      var day = date.getDate();
      date = year.toString()+"-"+month.toString()+"-"+day.toString();

      this.axios.get('http://localhost:3000/submitrequest?id='+id+'&grade='+grade+'&date='+date).then(res=>{
        this.$message({
          message: '感谢您的评价!',
          type: 'success'
        });
        //关闭提交按钮
        this.gradeBox=false;
        this.proFinish=false;
        //更新列表数据
        this.initReq();
      })
    },
    refresh(){
      if(this.descriptionList.length!=0){
        this.descriptionList.length=0;
      }
      //刷新列表
      this.axios.get('http://localhost:3000/getReq?id='+this.needkeys[6]).then(res=>{
        //初始化数据
        res.data.forEach((value,index)=>{
          //对数据进行初步处理
          if(value["state"]==0){
            value["state"]="申请审批中";
          }else if(value["state"]==1){
            value["state"]="已完成处理";
          }else{
            value["state"]="负责人赶往中";
          }

          value["time"]=value["time"].split("T")[0];
          value["endtime"]=value["endtime"].split("T")[0];
          if(value["endtime"]=="1899-12-31"){
            value["endtime"]="未完成";
          }

          this.descriptionList.push(value);
        });
        if(res.data[0].state=="负责人赶往中"){
          this.proFinish=true;
        }
      });
    }
  },
}
</script>

<style scoped>
#container{
  position: absolute;
  background-color: #0c5460;
  width: 80%;
  top: 0%;
  height: 100%;
  left: 10%;
  border-radius:8px ;
  box-shadow: 0px 22px 87px -24px rgba(0, 0, 0, 0.75);
  /*opacity: 90%;*/
}
#diffiBody{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #f3f4ed;
  overflow-x: hidden;
  overflow-y: hidden;
}
#picture{
  /*padding-left: 1px;*/
  position: absolute;
  top: 10%;
  left: 0%;
  width: 100%;
  height: 35%;
  background-color: white;
  /*padding-left: 10px;*/
  border-bottom: 2px black solid;
}
.upBtn{
  /*position: absolute !important;*/
  margin-top: 20px;
  left: 20% !important;
  width: 80%;
  background-color: rgb(0,112,239);
  color: white !important;
}
.el-upload__tip{
  color: white !important;
}
.upload-demo{
  position: absolute !important;
  left: 41% !important;
  top: 85%  !important;
}
#text{
  position: absolute;
  top: 45%;
  left: 0%;
  width: 100%;
  background-color: white !important;
}
#textTitle{
  /*position: absolute;*/
  /*top: 10%;*/
  /*left: 0;*/
  background-color: rgb(176,232,200);
  width: 30%;
  height: 80px;
  z-index: 9999;
  font-size: 30px;
  letter-spacing: 40px;
  text-align: center;
  line-height: 80px;
  margin: 0 auto;
  margin-top: 5px;
}
#submitBtn{
  position: absolute;
  top: 94%;
  left: 48%;
  height: 45%;
  width: 100%;
}
.block{
  display: inline-block;
  margin-top: 0px;
  margin-right: 7.21px;
}
#myRequest{
  position: absolute;
  background-color: #8a6d3b;
  width: 100%;
  top: 10%;
  height: 90%;
  left: 0%;
  /*border: 1px #0c5460 solid;*/
}
#selectFun{
  position: absolute;
  top: 0;
  left: 0;
  background-color: #5e5e5e;
  height: 10%;
  width: 100%;
}
#myRequest{
  position: absolute;
  top: 10%;
  left: 0;
  width: 100%;
  height: 90%;
  background-color: white;
  overflow-y: auto;
}
/*  完成处理*/
#finishReq{
  position: absolute;
  background-color: #00b09b;
  top: 330px;
  right: 500px;
  border: white solid 2px;
}
#fightGrade{
  position: absolute;
  /*background-color: red;*/
  top: 380px;
  right: 410px;
  width: 300px;
  /*height: 500px;*/
  /*border: 1px solid white;*/
  background-color: #2e6da4;
}
#submitBtns{
  position: absolute;
  top: 0;
  left: 250px;
}

.gradeAni-enter-active {transition: all 0.3s ease;}
.gradeAni-leave-active{transition: all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
.gradeAni-enter,.gradeAni-leave-to{transform: translateX(-64px);opacity: 0;}
.first-item{
  font-size: 50px;
}
#poorRefresh{
  position: absolute;
  right: 10px;
  top: 10px;
}
.myRequestBtn{
  width: 50%;
  height: 100%;
  font-size: 20px;
  background-color: rgb(84,101,169);
  letter-spacing: 20px;
  color: white !important;
  font-weight: bolder;
  border-radius: 0;
}
.newRequestBtn{
  width: 49.72%;
  height: 100%;
  font-size: 20px;
  margin-left: 0px;
  letter-spacing: 20px;
  color: white !important;
  font-weight: bolder;
  border-radius: 0;
}
.inputArea{
  outline: none !important;
  font-size: 20px;
}
#diffiBackImgContainer{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
#submitBtn .el-button{
  width: 150px !important;
  height: 50px !important;
  font-size: 20px;
  font-weight: bolder;
  margin-left: -3%;
}
</style>
