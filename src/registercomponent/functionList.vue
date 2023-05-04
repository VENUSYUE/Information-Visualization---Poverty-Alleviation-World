<template>
  <div id="functionContainerf">
    <!--左上角图标-->
    <div class="spinner-box">
      <div class="blue-orbit leo">
      </div>

      <div class="green-orbit leo">
      </div>

      <div class="red-orbit leo">
      </div>

      <div class="white-orbit w1 leo">
      </div><div class="white-orbit w2 leo">
    </div><div class="white-orbit w3 leo">
    </div>
    </div>
    <!--标题-->
    <div id="titleContent">防返贫服务系统管理平台</div>
    <div id="bottomBorder"></div>
    <!--返回按钮-->
    <div id="backBtn" title="返回地图">
      <el-button icon="el-icon-s-fold" class="backMapBtn" circle @click="backMap"></el-button>
    </div>
    <!--功能列表-->
    <div id="functionContainer">
      <div id="mathChart">
        <div id="icon1" @click="showChart">
          <i class="iconfont" id="adminIconfont1">&#xe85f;</i>
        </div>
        <div id="description1">数据图表</div>
      </div>

      <div id="threeDAnalyse">
        <div id="icon2" @click="analysis3D">
          <i class="iconfont" id="adminIconfont2">&#xe622;</i>
        </div>
        <div id="description2">三维分析</div>
      </div>
      <div id="wbAnalyse">
        <div id="icon3" @click="openMessageAdmin">
          <i class="iconfont" id="adminIconfont3">&#xe6d6;</i>
        </div>
        <div id="description3">舆情分析</div>
      </div>
      <div id="peopleManage">
        <div id="icon4" @click="openPersonManage">
          <i class="iconfont" id="adminIconfont4">&#xe617;</i>
        </div>
        <div id="description4">人员管理</div>
      </div>
    </div>
  </div>
</template>

<script>
import {eventBus} from "../main";
export default {
  name: 'functionList',
  components:{

  },
  props:{
    adminChartShow:Function,
    analysis3D:Function,
    openPersonManage:Function,
    openMessageAdmin:Function
  },
  methods:{
    backMap(){
      this.$confirm('返回地图后需要重新登陆,确定返回吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>{
        this.$router.replace('/mapshow');
      })
    },
    showChart(){
      this.adminChartShow();
      eventBus.$emit('showChart');
    }
  }
}
</script>

<style scoped>
  #titleContent{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 30%;
    /*background-color: red;*/
    text-align: center;
    font-weight: bolder;
    font-size: 30px;
    line-height: 60px;
    letter-spacing: 3px;
    color: white;
  }
  #bottomBorder{
    position: absolute;
    bottom: 70%;
    width: 80%;
    left: 10%;
    height: 2px;
    background-color: white;
  }
  /* KEYFRAMES */

  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to{
      transform: rotate(359deg);
    }
  }

  @keyframes spin3D {
    from {
      transform: rotate3d(.5,.5,.5, 360deg);
    }
    to{
      /*transform: rotate3d(0deg);*/
    }
  }

  @keyframes configure-clockwise {
    0% {
      transform: rotate(0);
    }
    25% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(180deg);
    }
    75% {
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes configure-xclockwise {
    0% {
      transform: rotate(45deg);
    }
    25% {
      transform: rotate(-45deg);
    }
    50% {
      transform: rotate(-135deg);
    }
    75% {
      transform: rotate(-225deg);
    }
    100% {
      transform: rotate(-315deg);
    }
  }

  @keyframes pulse {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: .25;
      transform: scale(.75);
    }
  }

  /* GRID STYLING */

  * {
    box-sizing: border-box;
  }


  .spinner-box {
    width: 60px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
  }

  /* SPINNING CIRCLE */

  .leo-border-1 {
    position: absolute;
    width: 20px;
    height: 20px;
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: rgb(63,249,220);
    background: linear-gradient(0deg, rgba(63,249,220,0.1) 33%, rgba(63,249,220,1) 100%);
    animation: spin3D 1.8s linear 0s infinite;
  }

  .leo-core-1 {
    width: 10%;
    height: 10%;
    background-color: #37474faa;
    border-radius: 5%;
  }

  .leo-border-2 {
    position: absolute;
    width: 10px;
    height: 10px;
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10%;
    background: rgb(251, 91, 83);
    background: linear-gradient(0deg, rgba(251, 91, 83, 0.1) 33%, rgba(251, 91, 83, 1) 100%);
    animation: spin3D 2.2s linear 0s infinite;
  }

  .leo-core-2 {
    width: 10%;
    height: 10%;
    background-color: #1d2630aa;
    border-radius: 10%;
  }

  /* ALTERNATING ORBITS */

  .circle-border {
    width: 10px;
    height: 10px;
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10%;
    background: rgb(63,249,220);
    background: linear-gradient(0deg, rgba(63,249,220,0.1) 33%, rgba(63,249,220,1) 100%);
    animation: spin .8s linear 0s infinite;
  }

  .circle-core {
    width: 10%;
    height: 10%;
    background-color: #1d2630;
    border-radius: 10%;
  }

  /* X-ROTATING BOXES */

  .configure-border-1 {
    width: 115px;
    height: 115px;
    padding: 3px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fb5b53;
    animation: configure-clockwise 3s ease-in-out 0s infinite alternate;
  }

  .configure-border-2 {
    width: 10px;
    height: 10px;
    padding: 3px;
    left: -115px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(63,249,220);
    transform: rotate(45deg);
    animation: configure-xclockwise 3s ease-in-out 0s infinite alternate;
  }

  .configure-core {
    width: 10%;
    height: 10%;
    background-color: #1d2630;
  }

  /* PULSE BUBBLES */

  .pulse-container {
    width: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .pulse-bubble {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #3ff9dc;
  }

  .pulse-bubble-1 {
    animation: pulse .4s ease 0s infinite alternate;
  }
  .pulse-bubble-2 {
    animation: pulse .4s ease .2s infinite alternate;
  }
  .pulse-bubble-3 {
    animation: pulse .4s ease .4s infinite alternate;
  }

  /* SOLAR SYSTEM */

  .solar-system {
    width: 250px;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .orbit {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #fafbfC;
    border-radius: 50%;
  }

  .earth-orbit {
    width: 165px;
    height: 165px;
    -webkit-animation: spin 12s linear 0s infinite;
  }

  .venus-orbit {
    width: 120px;
    height: 120px;
    -webkit-animation: spin 7.4s linear 0s infinite;
  }

  .mercury-orbit {
    width: 90px;
    height: 90px;
    -webkit-animation: spin 3s linear 0s infinite;
  }

  .planet {
    position: absolute;
    top: -5px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #3ff9dc;
  }

  .sun {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #ffab91;
  }

  .leo {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }

  .blue-orbit {
    width: 80px;
    height: 80px;
    border: 1px solid #91daffa5;
    -webkit-animation: spin3D 3s linear .2s infinite;
  }

  .green-orbit {
    width: 60px;
    height: 60px;
    border: 1px solid #91ffbfa5;
    -webkit-animation: spin3D 2s linear 0s infinite;
  }

  .red-orbit {
    width: 40px;
    height: 40px;
    border: 1px solid #ffca91a5;
    -webkit-animation: spin3D 1s linear 0s infinite;
  }

  .white-orbit {
    width: 30px;
    height: 30px;
    border: 2px solid #ffffff;
    -webkit-animation: spin3D 10s linear 0s infinite;
  }

  .w1 {
    transform: rotate3D(1, 1, 1, 90deg);
  }

  .w2 {
    transform: rotate3D(1, 2, .5, 90deg);
  }

  .w3 {
    transform: rotate3D(.5, 1, 2, 90deg);
  }

  .three-quarter-spinner {
    width: 50px;
    height: 50px;
    border: 3px solid #fb5b53;
    border-top: 3px solid transparent;
    border-radius: 50%;
    animation: spin .5s linear 0s infinite;
  }
  #functionContainer{
    position: absolute;
    left: 0;
    top: 30%;
    height: 70%;
    width: 100%;
    color: white;
  }

  /*功能样式*/
  #mathChart{
    position: absolute;
    left: 2.5%;
    top: 0;
    width: 20%;
    height: 100%;
  }
  #threeDAnalyse{
    position: absolute;
    left: 27.5%;
    top: 0;
    width: 20%;
    height: 100%;
  }
  #wbAnalyse{
    position: absolute;
    left: 52.5%;
    top: 0;
    width: 20%;
    height: 100%;
  }

  #peopleManage{
    position: absolute;
    left: 77.5%;
    top: 0;
    width: 20%;
    height: 100%;
  }
  #icon1{
    position: absolute;
    width: 100%;
    height: 70%;
    /*background-color: #2e6da4;*/
    top: 5px;
    left: 0;
    border-radius: 50%;
    border: solid 1px white;
  }
  #icon2{
    position: absolute;
    width: 100%;
    height: 70%;
    /*background-color: #2e6da4;*/
    top: 5px;
    border-radius: 50%;
    left: 0;
    border: solid 1px white;
  }
  #icon3{
    position: absolute;
    width: 100%;
    height: 70%;
    /*background-color: #2e6da4;*/
    border-radius: 50%;
    top: 5px;
    left: 0;
    border: solid 1px white;
  }
  #icon4{
    position: absolute;
    width: 100%;
    height: 70%;
    border-radius: 50%;
    /*background-color: #2e6da4;*/
    top: 5px;
    left: 0;
    border: solid 1px white;
  }
  #description1{
    position: absolute;
    top: 70%;
    height: 29%;
    width: 100%;
    left: 0;
    /*background-color: red;*/
    text-align: center;
    line-height: 40px;
  }
  #description2{
    position: absolute;
    top: 70%;
    height: 29%;
    width: 100%;
    left: 0;
    /*background-color: red;*/
    text-align: center;
    line-height: 40px;
  }
  #description3{
    position: absolute;
    top: 70%;
    height: 29%;
    width: 100%;
    left: 0;
    /*background-color: red;*/
    text-align: center;
    line-height: 40px;
  }
  #description4{
    position: absolute;
    top: 70%;
    height: 29%;
    width: 100%;
    left: 0;
    /*background-color: red;*/
    text-align: center;
    color: white;
    line-height: 40px;
  }
  #adminIconfont1{
    position: absolute;
    font-size: 70px;
    left: 20%;
    top: 2%;
  }
  #adminIconfont2{
    position: absolute;
    font-size: 70px;
    left: 20%;
    top: 2%;
  }
  #adminIconfont3{
    position: absolute;
    font-size: 70px;
    left: 20%;
    top: 2%;
  }
  #adminIconfont4{
       position: absolute;
       font-size: 70px;
       left: 20%;
       top: 2%;
     }

  #icon1:before,#icon2:before,#icon3:before,#icon4:before{
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #00d8ff;
    transform: scaleX(0);
    transition: all 300ms linear;
    transform-origin: center;
    border-radius: 50%;
  }
  #icon1:hover:before,#icon2:hover:before,#icon3:hover:before,#icon4:hover:before{
    transform: scaleX(1);
  }
  #icon1:hover,#icon2:hover,#icon3:hover,#icon4:hover{
    cursor: pointer;
  }
  、
  /*返回主地图按钮*/
  .backMapBtn{
    background-color: transparent;
    border: none;
    font-size: 30px;
    color: white !important;
  }
  #backBtn{
    position: absolute;
    right: 0;
    top: 0;
  }

</style>
