<template>
  <div id="MessageWallContainer">
    <!--左侧图片-->
    <div id="leftImg">
      <img src="static/img/wheatLeft.png">
    </div>
    <!--右侧图片-->
    <div id="rightImg">
      <img src="static/img/wheatRight.png">
    </div>
    <!--中间留言墙-->
    <div id="messageWallContentContainer">
      <!--留言墙图片-->
      <div id="messageWallTextContainer">
        <img src="static/img/mark.png">
      </div>
      <!--下部输入留言区域-->
      <div id="messageContainer">
        <textarea id="textAreaContent" placeholder="请输入100字以内" autofocus v-model="personComment">

        </textarea>
      </div>
      <!--提交按钮-->
      <div id="messageSubmitContainer" @click='submitPersonComment'>
        <img src="static/img/btn.png">
      </div>
    </div>
    <!--外部评论-->
    <div id="commentA">
    国家还未如此强大的年代，各前辈就有“来生再出生在中国的愿望”这样的感慨，如今我们更有理由赞美，中国是这世上最好的国家。
    </div>
    <div id="commentB">
      <span>党建引领，产业富民。让更多贫困地区旧貌换新颜，祖国一片欣欣向荣的景象。</span> <br>2020年是全面建成小康社会和十三五规划收官之年，一定会<br>画上一个圆满的句号，谱写中华人民的乐谱华章！
    </div>
    <div id="commentC">
        青春扶贫一线闪光
    </div>
    <div id="commentD">
      在扶贫的路上我要有一分热，发一分光。<br>
      让老百姓富起来也是我的心愿！
    </div>
    <div id="commentE">
      吃水不忘挖井人，让我们不忘初心，牢记使命，
      <span>永远跟党走！</span>
    </div>
    <div id="commentF">
      脱贫攻坚加把劲,不破楼兰终不还!在全面建成小康社会的最后一程,<span>在中华民族伟大复兴的关键一步,坚持脱贫攻坚不放松!我们一定能如期完成脱贫攻坚历史性任务!</span>
    </div>
    <div id="commentG">
      我国脱贫路上，一个也不能落下，<span>实现共同富裕，是人类历史上的伟大创举。</span>
    </div>
    <div id="commentH">
      又是一个具有历史意义的八年！伟大的中国人民勠力同心，攻坚克难，利用八年时间实现了整体脱贫，共同富裕，<span>这必将成为中国历史和世界历史上最伟大的胜利。</span>
    </div>
    <div id="commentI">
      脱贫攻坚是国家长远发展大局中的重要一环，<span>各部门通力协作的精神值得发扬光大！</span>
    </div>
    <div id="commentJ">
      我自己家就是受益者，<span>脱贫攻坚必胜。</span>
    </div>

    <!--查看更多留言-->
    <div id='seeMoreTextBtnContainer'>
      <el-button type="text" @click="openAllMessage">点击查看更多留言</el-button>
    </div>

    <transition name="allMessageAni">
    <!--所有留言-->
    <div id="allMessageContainer" v-show="allMessageShow">
      <!--退出按钮-->
     <div id="closeAllMessageBtnContainer" title="关闭所有留言">
       <el-button id="closeAllMessageBtn" circle icon="el-icon-close" @click="closeAllMessageBox"></el-button>
     </div>
      <!--标题-->
      <div id="allMessageTitle">所有留言</div>
      <!--内容-->
      <div class="singleMessageContainer" v-for="item in allMessage" :key="item.content">
        <!--一条评论的发表用户发表时间-->
        <div class="messageNameAndTime">
          <span class="messageName">
            {{ item.username }}
          </span>
          <span class="messageTime">
            {{ item.time }}
          </span>
        </div>
        <!--一条评论的内容-->
        <div class="messageContent">
          {{ item.content }}
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "messageWall",
  props:{
    username:String
  },
  data(){
    return{
      personComment:'',
      allMessage:[],
      allMessageShow:false
    }
  },
  methods:{
    //提交评论
    submitPersonComment(){
      var content = this.personComment;
      var username = this.username;
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      var day = date.getDate();
      date = year.toString()+"-"+month.toString()+"-"+day.toString();

      let param = new URLSearchParams();
      param.append("content",content);
      param.append("username",username);
      param.append("time",date);

      this.axios.post('http://localhost:3000/insert',param,{
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        }
      }).then(res=>{
        if(res.data==false){
          this.$message({
            message: '留言失败!原因：禁止发表重复留言',
            type: 'warning'
          });
          return;
        }
        this.$message({
          message: '留言成功!',
          type: 'success'
        });
        this.personComment='';
        //刷新列表
        this.refreshAllRequest();
      });
    },
    initMessageWall() {
      if(this.intercalId!=undefined) clearInterval(this.intercalId);
      //让两侧图片动起来
      // var rightBasicDeg = 0;
      // var leftBasicDeg = 0;
      // var change = 0.03
      //
      // this.intercalId = setInterval(()=>{
      //   if(rightBasicDeg<=-3){
      //     change=-0.03;
      //   }else if(rightBasicDeg>=0){
      //     change=0.03;
      //   }
      //   rightBasicDeg=rightBasicDeg-change;
      //   leftBasicDeg=leftBasicDeg+change;
      //   document.getElementById('rightImg').style.transform='rotate('+rightBasicDeg+'deg)';
      //   document.getElementById('leftImg').style.transform='rotate('+leftBasicDeg+'deg)';
      // },30)
    },
    openAllMessage(){
      this.allMessageShow=true;
      this.refreshAllRequest();
    },
    refreshAllRequest(){
      this.allMessage.length=0;
      //向数据库发送请求获取数据
      this.axios.get('http://localhost:3000/usergetallmessage').then(res=>{
        // this.allMessage=res.data;
        for(let item of res.data){
          item.time = item.time.split('T')[0];
        }
        for(var i = 0;i < res.data.length;i++){
          this.allMessage.push({
            username:res.data[i].username,
            time:res.data[i].time,
            content:res.data[i].content
          });
        }
      });
    },
    closeAllMessageBox(){
      this.allMessageShow=false;
    }
  }
}
</script>

<style scoped>
  #MessageWallContainer{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    /*background-color: #5B55E6;*/
    overflow: hidden;
  }
  #leftImg{
    position: absolute;
    height: 100%;
    width: 42.55%;
    /*background-color: red;*/
    top: 0;
    left: -50px;
    z-index: 1;
    transform-origin:bottom left;
  }
  #messageWallContentContainer{
    height: 100%;
    width: 80%;
    /*background-color: yellow;*/
    position: absolute;
    left: 10%;
    top: 0;
    z-index: 10;
  }
  #rightImg{
    position: absolute;
    height: 100%;
    width: 42.55%;
    /*background-color: blue;*/
    top: 0;
    right: -50px;
    /*z-index: -1;*/
    transform-origin:bottom right;
  }
  #messageWallTextContainer{
    position: absolute;
    left: 38%;
    right: 0;
    bottom: 50%;
    /*background-color: yellow;*/
    width: 317px;
    height: 256px;
  }
  #messageContainer{
    position: absolute;
    left: 34%;
    top: 55%;
    width: 30%;
    background-color: rgb(247,242,238);
    z-index: 999;
  }
  #textAreaContent{
    width: 100%;
    height: 120px;
    outline: none;
    border: 1px solid #ceb578;
    z-index: 999;
    color: black;
    font-size: 15px;
    resize: none;
  }
  #messageSubmitContainer{
    position: absolute;
    left: 43%;
    top: 72%;

  }
  #commentA{
    top: 10%;
    left: 10%;
    position: absolute;
    z-index: 9999;
    width: 770px;
    height: 100px;
    color: #532e1f;
    font: normal 24px/36px "Microsoft Yahei,SimHei,STHeiti,PingFang SC";
    border-bottom: 1px solid #aca7a4;
  }
  #commentB{
    top: 30%;
    left: 7%;
    position: absolute;
    width: 650px;
    z-index: 9999;
    height: 130px;
    font: normal 24px/36px "Microsoft Yahei,SimHei,STHeiti,PingFang SC";
    color: #532e1f;
    border-bottom: 1px solid #aca7a4;
  }
  #commentB>span{
    color:  #532e1f;
    font: normal 18px/36px "Microsoft Yahei,SimHei,STHeiti,PingFang SC" !important;
  }
  #commentC{
    top: 22%;
    left: 25%;
    position: absolute;
    width: 250px;
    z-index: 9999;
    height: 50px;
    font: normal 30px/36px "Microsoft Yahei,SimHei,STHeiti,PingFang SC";
    color: #532e1f;
    border-bottom: 1px solid #aca7a4;
  }
  #commentD{
    top: 53%;
    left: 15%;
    position: absolute;
    width: 420px;
    z-index: 9999;
    height: 80px;
    font: normal 22.77px/27.33px "Microsoft Yahei,SimHei,STHeiti,PingFang SC";
    color: #532e1f;
    border-bottom: 1px solid #aca7a4;
  }
  #commentE{
    top: 63%;
    left: 15%;
    position: absolute;
    width: 300px;
    z-index: 9999;
    height: 100px;
    font: normal 18px/36px "Microsoft Yahei,SimHei,STHeiti,PingFang SC" ;
    color: #532e1f;
    border-bottom: 1px solid #aca7a4;
  }
  #commentE>span{
    font: normal 30px/36px "Microsoft Yahei,SimHei,STHeiti,PingFang SC";
  }
  #commentF{
    top: 10%;
    right: 7%;
    position: absolute;
    width: 770px;
    z-index: 9999;
    height: 80px;
    font: normal 18px/36px "Microsoft Yahei,SimHei,STHeiti,PingFang SC" !important;
    border-bottom: 1px solid #aca7a4;
    color: #532e1f;
  }
  #commentF>span{
    font: normal 24px/36px "Microsoft Yahei,SimHei,STHeiti,PingFang SC";
  }
  #commentG{
    top: 20%;
    right: 10%;
    position: absolute;
    width: 555px;
    z-index: 9999;
    height: 100px;
    font: normal 18px/36px "Microsoft Yahei,SimHei,STHeiti,PingFang SC" !important;
    color: #532e1f;
    border-bottom: 1px solid #aca7a4;
  }
  #commentG>span{
    font: normal 24px/36px "Microsoft Yahei,SimHei,STHeiti,PingFang SC";
  }
  #commentH{
    top: 33%;
    right: 8%;
    position: absolute;
    width: 570px;
    z-index: 9999;
    height: 130px;
    font: normal 18px/36px "Microsoft Yahei,SimHei,STHeiti,PingFang SC" !important;
    color: #532e1f;
    border-bottom: 1px solid #aca7a4;
  }
  #commentH>span{
    font: normal 30px/36px "Microsoft Yahei,SimHei,STHeiti,PingFang SC";
  }
  #commentI{
    top: 50%;
    right: 10%;
    position: absolute;
    width: 450px;
    z-index: 9999;
    height: 100px;
    font: normal 18px/36px "Microsoft Yahei,SimHei,STHeiti,PingFang SC" !important;
    color: #532e1f;
    border-bottom: 1px solid #aca7a4;
  }
  #commentI>span{
    font: normal 30px/36px "Microsoft Yahei,SimHei,STHeiti,PingFang SC";
  }
  #commentJ{
    top: 65%;
    right: 17%;
    position: absolute;
    width: 350px;
    z-index: 9999;
    height: 50px;
    font: normal 18px/36px "Microsoft Yahei,SimHei,STHeiti,PingFang SC" !important;
    border-bottom: 1px solid #aca7a4;
    color: #532e1f;
  }
  #commentJ>span{
    font: normal 22.77px/27.33px "Microsoft Yahei,SimHei,STHeiti,PingFang SC";
  }
  #messageSubmitContainer:hover{
    cursor: pointer;
  }
  #seeMoreTextBtnContainer{
    overflow-y: auto;
    position: absolute;
    left: 46.5%;
    bottom: 17%;
    width: 300px;
    z-index: 999;
    color: #532e1f;
  }
  /*所有留言*/
  #allMessageContainer{
    position: absolute;
    top: 5%;
    height: 90%;
    width: 30%;
    left: 5%;
    /*background-color: #5B55E6;*/
    z-index: 9999;
    background-color: white;
    overflow-y: auto;
    border: solid rgb(217,213,210) 2px;
  }
  #allMessageTitle{
    width: 100%;
    height: 80px;
    background-color: rgb(140,48,39);
    color: rgb(217,200,180);
    text-align: center;
    font-size: 30px;
    line-height: 80px;
    letter-spacing: 20px;
  }
  .singleMessageContainer{
    height: 100px;
    width: 100%;
    color:black;
    border-bottom:dashed 1px black;
    position: relative;
  }
  .messageNameAndTime{
    height: 60px;
    width: 100%;
    line-height: 60px;
    /*border-bottom: dashed black 1px;*/
  }
  .messageNameAndTime>.messageName{
    font-size: 20px;
    font-weight: bolder;
    letter-spacing: 5px;
    margin-left: 15px;
  }
  .messageNameAndTime>.messageTime{
    font-size: 20px;
  }
  .messageContent{
    letter-spacing: 1px;
    margin-left: 15px;
    overflow-y: auto;
    height: 40px;
    line-height: 40px;
    font: normal 14px/190% \5B8B\4F53;
    overflow-y: auto;
  }

  .allMessageAni-enter-active {transition: all 1s ease;}
  .allMessageAni-leave-active{transition: all 0.5s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
  .allMessageAni-enter,.allMessageAni-leave-to{transform: translateX(-300px);opacity: 0;}
  #closeAllMessageBtnContainer{
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
