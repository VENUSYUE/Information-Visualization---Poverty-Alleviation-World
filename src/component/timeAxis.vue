<template>
  <div id="timeAxis-bodyer">
    <!-- <button id="timestart" @click="startRun"></button> -->
    <el-button id="timestart2" @click="startRun"  size='mini' type="success" plain :disabled="!isShow" >Start</el-button>
    <div id="timebar">
      <div class="block" id="timeslider">
        <el-slider v-model="alreadyRun" :max="732" :min="1" :show-tooltip="false" :marks="marks" v-show="isShow"></el-slider>
      </div>
    </div>
    <el-button size="small" id="controlTime" :icon="closeOrOpen" type="danger" @click="controlTime"></el-button>
  </div>
</template>

<script>
export default{
  data(){
    return{
      rendType:"",
      isShow:true,
      alreadyRun:1,
      isStart:false,
      timer:0,
      closeOrOpen:"el-icon-circle-close",
      marks:{
        1:{
          style: {
            color: '#FF8247',
            fontSize:"5px"
          },
          label: this.$createElement('strong', '2012')
        },
        49:{
          style: {
            color: '#FF8247',
            fontSize:"5px"
          },
          label: this.$createElement('strong', '2013')
        },
        97:{
          style: {
            color: '#FF8247',
            fontSize:"5px"
          },
          label: this.$createElement('strong', '2014')
        },
        145:{
          style: {
            color: '#FF8247',
            fontSize:"5px"
          },
          label: this.$createElement('strong', '2015')
        },
        193:{
          style: {
            color: '#FF8247',
            fontSize:"5px"
          },
          label: this.$createElement('strong', '2016')
        },
        244:{
          style: {
            color: '#FFFF00',
            fontSize:"5px"
          },
          label: this.$createElement('strong', '2017')
        },
        365:{
          style: {
            color: '#FFFF00',
            fontSize:"5px"
          },
          label: this.$createElement('strong', '2018')
        },
        487:{
          style: {
            color: '#FFFF00',
            fontSize:"5px"
          },
          label: this.$createElement('strong', '2019')
        },
        608:{
          style: {
            color: '#FFFF00',
            fontSize:"5px"
          },
          label: this.$createElement('strong', '2020')
        },
        732:{
          style: {
            color: '#FFFF00',
            fontSize:"5px"
          },
          label: this.$createElement('strong', '2021')
        },
      }
    }
  },
  methods:{
    startRun(){
      if(!this.isStart){
        if(this.alreadyRun==732) this.alreadyRun=0;
        this.isStart=true;
        var alreadyRun=this.alreadyRun;
        this.timer=setInterval(()=>{
          if(alreadyRun<732){
            alreadyRun++;
            this.alreadyRun=alreadyRun;
          }
        },50);
      }
      else{
        this.isStart=false;
        clearInterval(this.timer)
      }
    },
    changePoor(day){
      this.updateNumChart(day);
      this.updateTime(day);
      if(this.rendType=="fireFly") {
        this.changeArea(day);
      }
      else if(this.rendType=="jY") {
        this.changeNoSee(day);
      }
      else if(this.rendType=="heat") {
        this.changeHeatmap(day);
      }
    },
    controlTime(){
      if(this.isShow===true){
        this.isStart=false;
        this.isShow=false;
        clearInterval(this.timer)
        setTimeout(()=>{
          this.closeOrOpen="el-icon-circle-check";},3000)
        let  timebar = document.getElementById("timebar");
        timebar.style.width = '0px';
      }
      else{
        setTimeout(()=>{this.isShow=true;
          this.closeOrOpen="el-icon-circle-close";},3000)
        let  timebar = document.getElementById("timebar");
        timebar.style.width = '726px';
      }
    }
  },
  watch:{
    alreadyRun(value){
      if(value==732){
        this.isStart=false;
      }
      this.changePoor(value);
    },
  },
  props:{
    changeArea:Function,
    changeNoSee:Function,
    changeHeatmap:Function,
    updateNumChart:Function,
    updateTime:Function
  }
}
</script>

<style>
#timeAxis-bodyer{
  height: 25px;
  width: 872px;
  margin: auto;
  position: absolute;
  left:30%;
  top: 93%;
}
#controlTime{
  height: 100%;
  width: 1px;
  color: red !important;
  font-size: 15px;
}

/* #timestart{
   height: 100%;
   width: 27px;
   float: left;
   /* background-color: #0079C1; */
/*     background-color: #FFA500;
   /* } */

#timestart2{
  height: 100%;
  width: 50px;
  float: left;
}

#timebar{
  /* position: absolute; */
  height: 100%;
  width: 732px;
  float: left;
  background-color: #1B6D85;
  transition: width 3s;
  /* border: 3px solid pink; */

}
#alreadyRun{
  background-color: #AC2925;
  position: relative;
  top: 40%;
  /* width: 100%; */
  height: 5px;
}

/*#timeslider{*/
/*  position: absolute;*/
/*}*/

.el-button.el-button--danger.el-button--small{
  background-color: #668B8B;
  border: none
}
.el-button.el-button--success.el-button--mini.is-plain{
  background-color: #668B8B;
  border: none
}

.el-slider{
  position: absolute;
  height: 10px;
  width: 732px;
  margin-bottom: 100px;
}
.el-slider__bar{
  background-color: orange;
}
.el-slider__runway{
  background-color: #2F4F4F;
}

.el-slider__button {
  width: 16px;
  height: 16px;
  border: 2px solid #2F4F4F;
  background-color:#FFD700;
  -webkit-transition: .2s;
  transition: .2s;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
