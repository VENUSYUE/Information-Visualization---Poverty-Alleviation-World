<template>
    <div id="nomalBody">
      <div id="topBar">
        <div id="personCenter" class="selectOption" @click="letCenterShow">
          <div id="icon1">
          <i class="iconfont">&#xe653;</i>
          </div>
          <span>个人中心</span>
        </div>
        <div id="diffi" class="selectOption" @click="warn" ref="diffiUp">
          <div id="icon3">
            <i class="iconfont">&#xe61a;</i>
          </div>
          困难上报
        </div>
        <div id="talk" class="selectOption" @click="letMessageWallShow">
          <div id="icon2">
          <i class="iconfont">&#xe60e;</i>
          </div>
          留言墙
        </div>
        <div id="backToMainMap" class="selectOption" @click="backToMainMap">
          <div id="icon4">
            <i class="iconfont">&#xe670;</i>
          </div>
          返回地图
        </div>
      </div>


      <!--个人中心div-->
      <div id="CenterBody" v-show="centerShow">
        <!--背景图片-->
        <div id="backImgContainer">
          <img src="static/img/backgroundImg.jpg">
        </div>
        <div id="Container">
        <div id="Content">
          <div id="photo">
            <img :src="imgurl" id="imgUser">
            <div id="typeDiv">{{type}}</div>
          </div>
          <!--基本信息-->
          <div id="hasinfo">
            <div v-for="(value,index) in Arr" class="InfoLine">
              <span class="leftSpan">{{keys[index]}}</span>
              <input v-model="Arr[index]" class="hasInfoIn" :disabled="editAbled[index]"></input>
              <el-button type="primary" icon="el-icon-edit" circle class="editBtn" @click="edit(index)"></el-button>
            </div>
          </div>
          <div></div>
          <div id="indBtn" v-show="!isPoor && !isCancel">
            <el-button type="success" @click="writeForm">申请成为认证贫困户</el-button>
          </div>

          <div id="specialInfo" v-show="isPoor ">贫困户专属信息</div>
          <div id="basicInfo">基本信息</div>

          <div id="needInfo" v-show="isPoor">
            <div v-for="(value,index) in needkeys">
                <span class="spanToInput">{{value.key}}</span>
                <input v-model="needkeys[index].value" :disabled="editAbled[index+4]" class="needInfoInput"></input>
            </div>
          </div>

          <div id="cancel"  v-show="isCancel">
            <el-button type="danger" class="cancellBtn" @click="cancel">取消申请</el-button>
            <el-button type="success" @click="submit">提交申请</el-button>
          </div>
        </div>
          <!--百度地图div-->
<!--          <div id="BDMapContainer">-->
<!--            <baidu-map class="map" :center="center" :zoom="map.zoom">-->
<!--              &lt;!&ndash;缩放&ndash;&gt;-->
<!--              <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>-->
<!--              &lt;!&ndash;点&ndash;&gt;-->
<!--              <bm-marker :position="center" :dragging="map.dragging" animation="BMAP_ANIMATION_BOUNCE">-->
<!--                &lt;!&ndash;提示信息&ndash;&gt;-->
<!--                <bm-info-window :show="map.show">你在这儿呢~</bm-info-window>-->
<!--              </bm-marker>-->
<!--            </baidu-map>-->
<!--          </div>-->
          <div id="xgBtn"><el-button type="primary" @click="submitChange" class="submitChangeOfPerson">提交修改</el-button></div>
        </div>
      </div>

      <!--困难申报组件-->
      <diffi v-show="diffiShow" ref="diffiChild" :username="Arr" :needkeys="sizeForm"></diffi>
      <!--留言墙组件-->
      <messageWall v-show="messageWallShow" :username="sizeForm[1]" ref="messageWallChild"></messageWall>
    </div>
</template>

<script>
  import diffi from '../registercomponent/diffi'
  import messageWall from "./messageWall";
    export default {
        name: "normalUser",
      components:{
        diffi,
        messageWall
      },      props:{
        sizeForm:Array,
        center:Object
      },
      created(){

      },
      data(){
        return{
          centerShow:true,
          diffiShow:false,
          type:"",
          imgurl:"",
          keys:["用户名","密码","手机号码","性别"],
          needkeys:[{key:"姓名",value:""},{key:'身份证号',value:""},{key:"所属贫困县",value:""},{key:'建档立卡号',value:""},{key:"真实住址",value:""}],
          Arr:[],
          isPoor:false,
          isCancel:false,
          editAbled:["true","true","true","true","true","true","true","true","true"],
          map:{
            zoom: 15,
            show: true,
            dragging: true
          },
          messageWallShow:false,
          intercalId:undefined
        }
      },
      methods:{
        letCenterShow(){
          this.centerShow = true;
          this.messageWallShow=false;
          this.diffiShow=false;
        },
        warn(){
          this.$message({
            message: '请先在个人中心认证成为贫困户!',
            type: 'warning'
          });
        },
        letMessageWallShow(){
          this.centerShow = false;
          this.diffiShow=false;
          this.messageWallShow=true;
          this.$refs['messageWallChild'].initMessageWall();
        },
        //判断用户类型，初始化头像与功能
        init(){
            if(this.sizeForm[0]==0){
              this.type="普通用户";
              this.imgurl="static/img/用户.png";
              this.$refs['diffiUp'].style.opacity='50%';
              this.isPoor=false;
              this.sizeForm.forEach((value,index)=>{
                if(index <= 4){
                  this.Arr.push(value)
                }
              })
              this.Arr.shift();
            }
            else{
              this.type="认证贫困户";
              this.imgurl="static/img/农民.png";
              this.isPoor=true;
              this.sizeForm.forEach((value,index)=>{
                if(index <= 4){
                  this.Arr.push(value)
                }
              })
              this.Arr.shift();

              //更新表
              for(var i = 5;i < this.sizeForm.length-2;i++){
                this.needkeys[i-5].value = this.sizeForm[i];
              }
              //打开困难上报功能
              this.warn = ()=>{
                this.centerShow = false;
                this.diffiShow = true;
                this.messageWallShow=false;
              }
            }
            this.$refs["diffiChild"].initReq();
        },
        writeForm(){
          this.isPoor=true;
          this.isCancel=true;

          for(var i = 4;i <= 8;i++){
            this.editAbled[i] = false;
          }
        },
        edit(index) {
          if(this.editAbled[index]===false){
            this.editAbled.splice(index,1,true);
            return;
          }

          if(index==0){
            this.$message({
              message: '用户名不可更改!',
              type: 'warning'
            });
            return;
          }
          for (var i = 0; i < 4; i++) {
            this.editAbled.splice(i,1,true)
          }
          this.editAbled.splice(index,1,false)
        },
        cancel(){
          this.isPoor=false;
          this.isCancel=false;
          for(var i = 4;i <= 8;i++){
            this.editAbled[i] = true;
          }
        },
        submit(){
          var Info = [];
          for(var i = 0;i < 4;i++){
            if(this.needkeys[i].value==''){
              this.$message({
                message: '信息必须填写完整!',
                type: 'warning'
              });
              return;
            }
            else{
              Info.push(this.needkeys[i].value);
            }
          }
          //向服务器传递数据
          this.$notify.info({
            title: '消息',
            message: '信息校验中,请稍后'
          });
          let param = new URLSearchParams();
          param.append("name",this.needkeys[0].value);
          param.append("id",this.needkeys[1].value);
          param.append("jid",this.needkeys[3].value);
          param.append("belong",this.needkeys[2].value);
          param.append("position",this.needkeys[4].value);
          param.append("username",this.sizeForm[1]);

          //根据百度地图api获取经纬度
          this.axios.get("http://localhost:3000/getposition?address="+this.needkeys[4].value,{
            header:{
              'Content-Type':'text/html;charset=utf-8'
            }
          }).then(res=>{
            //对经纬度进行处理
            var lng = res.data['lng'];
            var lat = res.data['lat'];
            //body参数中增加真实地址和经纬度
            param.append("longitude",lng);
            param.append("latitude",lat);

            //向服务器发送请求更新数据库
            this.axios.post("http://localhost:3000/tobepoor",param,{
              headers:{
                'Content-Type':'application/x-www-form-urlencoded'
              }
            }).then(res=>{
              //修改成功
              setTimeout(()=>{
                if(res.data==true){
                  this.$notify({
                    title: '成功',
                    message: '贫困户认证成功！您可以提出困难申报！',
                    type: 'success'
                  });
                  //更新网页
                  for (var i = 4; i <=7; i++) {
                    this.editAbled.splice(i, 1, true)
                  }
                  this.isCancel=false;
                  this.imgurl="static/img/农民.png";
                  this.type='认证贫困户';
                  // this.$refs['diffiUp'].style.opacity='100%';
                  //开启困难上报功能
                  this.warn = ()=>{
                    this.centerShow = false;
                    this.messageWallShow=false;
                    this.diffiShow = true;
                  }
                  //更新数据
                  this.axios.get('http://localhost:3000/login?username='+this.sizeForm[1]+"&passWord="+this.sizeForm[2]).then(res=>{
                    this.$refs['diffiChild'].needkeys.length=0;
                    this.$refs['diffiChild'].needkeys.push(1);
                    this.$refs['diffiChild'].needkeys.push(res.data[0].username);
                    this.$refs['diffiChild'].needkeys.push(res.data[0].passWord);
                    this.$refs['diffiChild'].needkeys.push(res.data[0].phone);
                    this.$refs['diffiChild'].needkeys.push(res.data[0].sexy);
                    this.$refs['diffiChild'].needkeys.push(res.data[0].name);
                    this.$refs['diffiChild'].needkeys.push(res.data[0].id);
                    this.$refs['diffiChild'].needkeys.push(res.data[0].belong);
                    this.$refs['diffiChild'].needkeys.push(res.data[0].jid);
                    this.$refs['diffiChild'].needkeys.push(res.data[0].position);
                    this.$refs['diffiChild'].needkeys.push(res.data[0].longitude);
                    this.$refs['diffiChild'].needkeys.push(res.data[0].latitude);
                  })
                }else if(res.data==false){
                  this.$notify.error({
                    title: '错误',
                    message: '贫困户认证失败！请校验信息后再试'
                  });
                }else{
                  this.$notify.error({
                    title: '错误',
                    message: '贫困户认证失败！该卡号已被注册！'
                  });
                }
              },1000)
            })
          })
        },
        submitChange(){
          for(var i = 0;i < 4;i++){
            this.editAbled.splice(i,1,true);
          }
          this.$notify.info({
            title: '消息',
            message: '信息录入中,请稍后'
          });
          let param = new URLSearchParams();
          param.append("passWord",this.Arr[1]);
          param.append("phone",this.Arr[2]);
          param.append("sexy",this.Arr[3]);
          param.append("username",this.Arr[0]);
          this.axios.post("http://localhost:3000/changeinfo",param,{
            headers:{
              'Content-Type':'application/x-www-form-urlencoded'
            }
          }).then(res=>{
              setTimeout(()=>{
                this.$notify({
                  title: '成功',
                  message: '信息修改成功！',
                  type: 'success'
                });
              },800)
          })
        },
        backToMainMap(){
          this.$confirm('返回地图后需要重新登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.replace('/mapshow');
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消返回'
            });
          });
        }
      }
    }
</script>

<style scoped>
  #nomalBody{
    overflow-x: hidden;
    overflow-y: hidden;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: white;
  }
  #topBar{
    top: 5%;
    position: absolute;
    width: 6%;
    bottom: 20px;
    right: 0%;
    height: 900px;
    font-weight: bolder;
    color: black;
    z-index: 999;
    display: flex;
    flex-direction: column;
  }
  .selectOption{
    height: 90px;
    top: -30px;
    line-height: 80px;
  }
  .selectOption:hover{
    transform:scale(1.3,1.3);
  }

  /*topbar样式*/
  #personCenter{
    border-radius: 10px;
    position: absolute;
    left: 1%;
    width: 100%;
    height: 20%;
    top: 0;
    background-color: black;
    /*opacity: 50%;*/
    opacity: 0.5;
    text-align: center;
    color: white;
  }
  #personCenter:hover{
    cursor: pointer;
    color: rgb(255,200,73);
  }

  #talk{
    position: absolute;
    border-radius: 10px;
    height: 20%;
    width: 100%;
    /*opacity: 50%;*/
    text-align: center;
    top: 50%;
    left: 1%;
    background-color:black;
    color: white;
    opacity: 0.5;
  }
  #talk:hover{
    cursor: pointer;
    color: rgb(255,200,73);
  }

  #diffi{
    position: absolute;
    border-radius: 10px;
    width: 100%;
    height: 20%;
    /*opacity: 50%;*/
    text-align: center;
    top: 25%;
    left: 1%;
    background-color:black;
    opacity: 0.5;
    color: white;
  }
  #diffi:hover{
    cursor: pointer;
    color: rgb(255,200,73);
  }

  #icon1,#icon2,#icon3{
    position: absolute;
    left: 0;
    top: 50px;
    height: 40px;
    width: 100%;
  }
  .iconfont{
    font-size: 50px;
  }

  .iconfont:hover{
    color: rgb(255,200,73);
  }

  #CenterBody{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /*background-color: #f3f4ed;*/
  }

  /*个人中心样式*/
  #Container{
    position: absolute;
    /*background-color: #0c5460;*/
    width: 80%;
    top: 0%;
    height: 99.5%;
    left: 10%;
    /*border: 1px #0c5460 solid;*/
    box-shadow: 0px 22px 87px -24px rgba(0, 0, 0, 0.75);
    /*opacity: 70%;*/
  }
  #Content{
    position: absolute;
    top: 0;
    left: 0%;
    width: 100%;
    height: 100%;
  }
  #photo{
    position: absolute;
    left: 5%;
    top: 0;
    width: 100%;
    height: 10%;
    background-color: rgb(26,26,56);
  }
  #photo:hover{
    background-color: rgb(20,22,43);
   }

  #imgUser{
    position: absolute;
    left: 35%;
    top: 8%;
    width: 80px;
    height: 80px;
  }
  #typeDiv{
    color: #0c5460;
    font-weight:bolder;
    text-align: center;
    font-size: 25px;
    position: absolute;
    top: 30px;
    width: 10%;
    left: 40%;
    color: white;
  }
  #hasinfo{
    position: absolute;
    left: 26%;
    top: 20%;
    width: 45%;
    height: 35%;
    background-color: white;
    border: 2px solid #0070ef;
    opacity: 1;
    /*background: transparent;*/
  }
  .InfoLine{
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px black solid;
  }
  .leftSpan{
    margin-right: 50px;
    margin-left: 5px;
    font-weight: bolder;
    color: black;
    font-size: 15px;
  }
  #indBtn{
    position: absolute;
    left: 43%;
    top: 65%;
  }
  #needInfo{
    position: absolute;
    left: 23%;
    top: 63%;
    width: 52%;
    background-color: whitesmoke;
    height: 35%;
    color: black;
    font-weight: bolder;
    border: 2px solid #0070ef;
  }
  #cancel{
    position: absolute;
    left: 42%;
    top:95%;
    z-index: 9999;
  }
  .el-input{
    color: white !important;
  }
  .hasInfoIn{
    /*border: solid 1px orange;*/
    height: 40px;
    position: absolute;
    left: 15%;
    color: black;
    /*background-color: rgb(0,112,239);*/
    background-color: rgb(33,0,39);
    margin-top: 5px;
    font-weight: bolder;
    color: white;
  }
  input::-webkit-input-placeholder{
    color:black;
    opacity: 0.5;
  }
  input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:black;
    opacity: 0.5;
  }
  input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:black;
    opacity: 0.5;
  }
  input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color:black;
    opacity: 0.5;
  }
  .editBtn{
    position: absolute;
    left: 90%;
    margin-top: 5px;
    background-color: rgb(255,85,112) !important;
    outline: none;
    border: none;
  }
  #specialInfo{
    position: absolute;
    top: 58%;
    width: 52%;
    left: 23%;
    height: 50px;
    background-color: rgb(58,51,117);
    text-align: center;
    font-size: 20px;
    line-height: 50px;
    color: white;
    font-weight: bolder;
  }
  #xgBtn{
  position: absolute;
    background-color: #1b6d85;
    top: 47%;
    left: 45%;
}
  #basicInfo{
    position: absolute;
    left: 26%;
    height: 50px;
    font-weight: bolder;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
    top: 14.5%;
    width: 45%;
    background-color: rgb(33,0,39);
    color: white;
  }
  .needInfoInput{
    margin-top: 5px;
    height: 50px;
    width: 670px;
    margin-bottom: 5px;
    /*background-color: rgb(0,112,239) !important;*/
    background-color: rgb(58,51,117);
    color: white;
  }
  .spanToInput{
    margin-right: 0px;
    width: 100px;
    height: 33px;
    display: inline-block;
    border-bottom: solid black 2px;
  }
  .submitChangeOfPerson{
    color: white !important;
    background-color: rgb(33,0,39);
  }
  #BDMapContainer{
    position: absolute;
    top: 57%;
    height: 43%;
    width: 98%;
    left: 1%;
    /*background-color: #5B55E6;*/
    border: 2px solid #0070ef;
  }
  .map{
    width: 100%;
    height: 100%;
  }
  #backToMainMap{
    position: absolute;
    border-radius: 10px;
    width: 100%;
    height: 20%;
    /*opacity: 50%;*/
    text-align: center;
    top: 75%;
    background-color: black;
    opacity: 0.5;
    left: 1%;
    color: white;
  }
  #icon4{
    position: absolute;
    left: 0;
    top: 50px;
    height: 40px;
    width: 100%;
  }
  #backToMainMap:hover{
    cursor: pointer;
    color: rgb(255,200,73);
  }

/*背景图片样式*/
  #backImgContainer{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
