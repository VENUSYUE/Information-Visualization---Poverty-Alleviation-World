<template>
  <div id="listli">
    <div id="itemIndex">{{index+1}}</div>
    <div id="itemTitle">
      <div id="itemName">{{itemData.name}}</div>
      <div id="itemState">{{itemData.state}}</div>
      <div id="details" @click="openDetails(index)">详情</div>
    </div>
    <div>
      <div id="contentTime" class="time">{{"报告时间 "+itemData.time}}</div>
      <div id="contentEndtime" class="time">{{"处理时间 "+itemData.endtime}}</div>
      <div id="contentEndPosition">{{"申请地址 "+itemData.position}}</div>
    </div>
    <div id="itemBtn">
      <el-button type="success" size="mini" class="reqBtn1" v-if="whichBtn"></el-button>
      <el-button type="danger" size="mini" class="reqBtn2" v-else-if="ing"></el-button>
      <el-button type="warning" class="reqBtn3" v-else></el-button>
      <div id="itemText1" v-if="whichBtn" @click="fineshed" class="hovers">已处理</div>
      <div id="itemText2" v-else-if="ing" @click="openHandle(index)" class="hovers">去处理</div>
      <div id="itemText3" v-else @click="hasHander" class="hovers">处理中</div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      whichBtn:true,
      ing:false,
    }
  },
  watch:{
    "itemData.state":{
      handler(newValue, oldValue) {
        if(newValue=='处理中'){
          this.whichBtn=false;
          this.ing = false;
        }else if(newValue=="已处理"){
          this.whichBtn=true;
        }
      }
    }
  },
  name: "detailedInfo",
  props:{
    itemData:Object,
    index:Number,
    openDetails:Function,
    openHandle:Function
  },
  mounted() {
    if(this.itemData.state=="未处理"){
      this.whichBtn=false;
      this.ing = true;
    }else if (this.itemData.state=="处理中"){
      this.whichBtn=false;
      this.ing = false;
    }
  },
  methods:{
    changeBtn(){
      this.whichBtn = true;
    },
    hasHander(){
      this.$message({
        message: '负责人火速处理中!',
        type: 'warning'
      });
    },
    fineshed(){
      this.$message({
        message: '已经完成处理!',
        type: 'success'
      });
    }
  }
}
</script>

<style scoped>

#listli{
  position: relative;
  margin-top: 5px;
  margin-left: 10%;
  width: 85%;
  height: 10%;
  background-color:#104E8B;
  /*opacity: 50%;*/
  border: solid 0px white;
  border-radius: 3px;
}

#itemTitle{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 30%;
}

#itemName{
  position: absolute;
  top:0;
  left: 2%;
  color:#00d8ff;
}

#itemState{
  position: absolute;
  top: 0;
  left: 50%;
  color: floralwhite;
}

#details{
  display: block;
  position: absolute;
  top: 1px;
  left: 88%;
  color: white;
  /*border: solid 1px white;*/
  /*border-radius:1px ;*/
}

#details:hover{
  cursor: pointer;
}
#contentTime{
  position: absolute;
  height: 20%;
  width: 85%;
  top: 30%;
  left: 0;
}
#contentEndtime{
  position: absolute;
  height: 20%;
  width: 85%;
  top: 53%;
  left: 0;
}
#contentEndPosition{
  position: absolute;
  height: 20%;
  width: 100%;
  top: 76%;
  left: 0;
  color: white;
}
#itemBtn{
  position: absolute;
  top: 31%;
  left:85%;
  width: 15%;
  height: 45%;
  background-color: #fba540;
  text-align: center;
}
#itemIndex{
  text-align: center;
  line-height: 30px;
  position: absolute;
  width: 35px;
  height: 30px;
  top: 40%;
  left: -11.94%;
  background-color: orangered;
  color: white;
}

.reqBtn1{
  left: 0;
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}
.reqBtn2{
  left: 0;
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}
.reqBtn3{
  left: 0;
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}
#itemText1{
  position: absolute;
  z-index: 999;
  color: white;
  top: 30%;
  left: 10%;
  font-size: 3px;
}
#itemText1:hover,#itemText2:hover{
  cursor: pointer;
}
#itemText2{
  position: absolute;
  z-index: 999;
  top: 30%;
  left: 10%;
  font-size: 3px;
  color: red;
  font-weight: bolder;
}
#itemText3{
  position: absolute;
  z-index: 999;
  top: 30%;
  left: 10%;
  font-size: 3px;
  color: #FF4500;
  font-weight: bolder;
}
.time{
  color: #98F5FF;
}
.hovers:hover{
  cursor: pointer;
}
</style>
