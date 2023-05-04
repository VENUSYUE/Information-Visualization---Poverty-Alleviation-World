<template>
<div id="messageAdminBox">
    <!--关闭按钮-->
    <div id="closeAdminMessageBtnContainer">
      <el-button  circle icon="el-icon-close" @click="closeMessageBox"></el-button>
    </div>

    <!--左侧所有留言列表-->
    <div id="messageAdminLeftList">
      <!--列表标题-->
      <div id="messageAdminLeftListTitle">
        留言列表
      </div>

      <el-checkbox v-model="checked" class="checkboxOfAdmin" @change="changeList">只显示负面评论</el-checkbox>
      <el-cascader
        v-model="selectValue"
        :options="selectOption"
        :props="{ expandTrigger: 'hover' }"
        class="adminMessageCascader choosePoorArea"
        placeholder="选择区域"
        @change="handleChange"
        v-show="adminArea=='全国'"
      ></el-cascader>

      <!--列表内容-->
      <div id="messageContentContainer">
      <div class="singleAdminListContent" v-for="(item,index) in adminAllMessage" :key="index">
        <div class="deleteMessageBtnContainer" @click="deleteMessage(index)">
          <el-button type="danger" icon="el-icon-delete" circle class="deleteMessageBtn"></el-button>
        </div>
        <div class="singleAdminListNameAndTime">
          <span class="singleAdminListName">{{ item.username }}</span>
          <span class="singleAdminListTime">{{ item.time }}</span>
        </div>
        <div class="singleAdminListText">
          {{item.content}}
        </div>
        <div class="singleAdminListTypeAndPositive">
          <span>AI情感分析结果:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
           <img class="smell" src="static/img/笑脸 (1).png" v-if="item.type=='正向'">
          <img class="smell" src="static/img/不高兴.png" v-else>
          <el-progress :text-inside="true" :stroke-width="26" :percentage="item.positive*100" class="positiveOrNegative" color=""></el-progress>
        </div>
      </div>
      </div>

    </div>

    <!--右侧图表数据-->
  <div id="messageAdminRightChart">
      <div id="messageAdminRightChartTitle">
        留言情感分析
      </div>
      <div id="messageCurrentNum">
        现有留言数量:&nbsp&nbsp&nbsp&nbsp<span>{{adminAllMessage.length}}</span>
      </div>
      <div id="ShanEchartContainer" ref="adminShanEchartChild">

      </div>
  </div>
</div>
</template>

<script>
export default {
  name: "messageAdmin",
  props:{
    adminArea:String
  },
  mounted() {
    //初始化多选框列表
    var baseVlue = 30;
    for(let item of this.selectOption) {
      if(item.label=='中国'){
        continue;
      }
      this.axios.get('http://localhost:3000/getpoorbyprovince?province=' + item.label).then(res => {
        var children = [];
        for (let itemm of res.data) {
          children.push({
            value: baseVlue,
            label: itemm.name,
          });
          baseVlue++;
        }
        item.children = children;
      })
    }
  },
  data(){
   return{
     adminAllMessage:[],
     adminAllMessageOther:[],
     checked:false,
     shanChartOptions:{
       title: {
         text: '留言情感分布',
         left: 'center',
         textStyle:{
           color:'white'
         }
       },
       tooltip: {
         trigger: 'item'
       },
       legend: {
         orient: 'vertical',
         left: 'left',
         textStyle: {
           color:'white'
         }
       },
       series: [
         {
           name: '留言情感分布',
           type: 'pie',
           radius: '50%',
           data: [
           ],
           emphasis: {
             itemStyle: {
               shadowBlur: 10,
               shadowOffsetX: 0,
               shadowColor: 'rgba(0, 0, 0, 0.5)'
             }
           }
         }
       ]
     },
     selectOption:[
       {
         value: 1,
         label: '中国',
         children:[{
           value: 8888,
           label: '中国',
         }]
       },
       {
         value: 2,
         label: '安徽省',
         children:[]
       },
       {
         value: 3,
         label: '山西省',
         children:[]
       },
       {
         value: 4,
         label: '河北省',
         children:[]
       },
       {
         value: 5,
         label: '辽宁省',
         children:[]
       },
       {
         value: 6,
         label: '吉林省',
         children:[]
       },
       {
         value: 7,
         label: '黑龙江省',
         children:[]
       },
       {
         value: 8,
         label: '江苏省',
         children:[]
       },
       {
         value: 9,
         label: '福建省',
         children:[]

       },
       {
         value: 10,
         label: '江西省',
         children:[]
       },
       {
         value: 11,
         label: '河南省',
         children:[]
       },
       {
         value: 12,
         label: '湖北省',
         children:[]
       },
       {
         value: 13,
         label: '湖南省',
         children:[]
       },
       {
         value: 14,
         label: '广东省',
         children:[]
       },
       {
         value: 15,
         label: '海南省',
         children:[]
       },
       {
         value: 16,
         label: '四川省',
         children:[]
       },
       {
         value: 17,
         label: '贵州省',
         children:[]
       },
       {
         value: 18,
         label: '云南省',
         children:[]
       },
       {
         value: 19,
         label: '陕西省',
         children:[]
       },
       {
         value: 20,
         label: '甘肃省',
         children:[]
       },
       {
         value: 21,
         label: '青海省',
         children:[]
       },
       {
         value: 22,
         label: '上海市',
         children:[]
       },
       {
         value: 23,
         label: '天津市',
         children:[]
       },
       {
         value: 24,
         label: '重庆市',
         children:[]
       },
       {
         value: 25,
         label: '内蒙古自治区',
         children:[]
       },
       {
         value: 26,
         label: '广西壮族自治区',
         children:[]
       },
       {
         value: 27,
         label: '西藏自治区',
         children:[]
       },
       {
         value: 28,
         label: '宁夏回族自治区',
         children:[]
       },
       {
         value: 29,
         label: '新疆维吾尔自治区',
         children:[]
       }
     ],
     selectValue:undefined,
   }
  },
  methods:{
    closeMessageBox(){
      this.$emit('closeMessage')
    },
    refreshadminAllMessage(){
      this.adminAllMessage.length=0;
      this.adminAllMessageOther.length=0;


      if(this.adminArea=='全国'){
        this.admingetallmessage='http://localhost:3000/admingetallmessage';
      }else{
        this.admingetallmessage='http://localhost:3000/admingetpartmessage?belong='+this.adminArea;
      }

      //向数据库发送请求获取数据
      this.axios.get( this.admingetallmessage).then(res=>{
        // this.allMessage=res.data;
        for(let item of res.data){
          item.time = item.time.split('T')[0];
        }
        var positive=0;
        var negative=0;
        for(var i = 0;i < res.data.length;i++){
          if(res.data[i].type=='正向'){
            positive++;
          }else{
            negative++;
          }
          this.adminAllMessage.push({
            username:res.data[i].username,
            time:res.data[i].time,
            content:res.data[i].content,
            positive:res.data[i].positive,
            negative:res.data[i].negative,
            type:res.data[i].type
          });
          this.adminAllMessageOther.push({
            username:res.data[i].username,
            time:res.data[i].time,
            content:res.data[i].content,
            positive:res.data[i].positive,
            negative:res.data[i].negative,
            type:res.data[i].type
          });
        }
        this.shanChartOptions.series[0].data.length=0;
        this.shanChartOptions.series[0].data.push({
        value: positive, name: '正面情感留言'
        });
        this.shanChartOptions.series[0].data.push({
          value: negative, name: '负面情感留言'
        });
          var shanChart = this.$echarts.init(this.$refs['adminShanEchartChild']);
          shanChart.setOption(this.shanChartOptions);
      });
    },
    changeList(newValue){
      if(newValue==true){
        this.adminAllMessage.length=0;
        for(var i = 0;i < this.adminAllMessageOther.length;i++){
          if(this.adminAllMessageOther[i].type=='负向')
          {
            this.adminAllMessage.push({
              username: this.adminAllMessageOther[i].username,
              time: this.adminAllMessageOther[i].time,
              content: this.adminAllMessageOther[i].content,
              positive: this.adminAllMessageOther[i].positive,
              negative: this.adminAllMessageOther[i].negative,
              type: this.adminAllMessageOther[i].type
            });
          }
        }
      }else{
        this.adminAllMessage.length=0;
        for(var i = 0;i < this.adminAllMessageOther.length;i++){
            this.adminAllMessage.push({
              username: this.adminAllMessageOther[i].username,
              time: this.adminAllMessageOther[i].time,
              content: this.adminAllMessageOther[i].content,
              positive: this.adminAllMessageOther[i].positive,
              negative: this.adminAllMessageOther[i].negative,
              type: this.adminAllMessageOther[i].type
            });
        }
      }
    },
    deleteMessage(index){
      //删除评论
      var username = this.adminAllMessage[index].username;
      var content = this.adminAllMessage[index].content;
      this.axios.get('http://localhost:3000/admindeletemessage?username='+username+'&content='+content).then(res=>{
        this.$message({
          message: '删除成功!',
          type: 'success'
        });
        this.adminAllMessage.splice(index,1);
      });
    },
    handleChange(newValue){
      if(newValue[0]==1){//选中中国
        this.refreshadminAllMessage();
        return;
      }
      for(let item of this.selectOption[newValue[0]-1].children){
        if(item.value=='8888'){
          continue;
        }
        if(item.value==newValue[1]){
          //向数据库发送请求
          this.axios.get('http://localhost:3000/getpoorareaallreq?name='+item.label).then(res=>{
            if(res.data.length==0){
              this.adminAllMessageOther.length=0;
              var length = this.adminAllMessage.length;
              for(var i = 0;i < length;i++){
                this.adminAllMessage.pop();
              }
              var tempLen = this.shanChartOptions.series[0].data.length;
              for(var i = 0;i < tempLen;i++){
                this.shanChartOptions.series[0].data.pop();
              }
              var shanChart = this.$echarts.init(this.$refs['adminShanEchartChild']);
              shanChart.setOption(this.shanChartOptions);
              return;
            }
            //对数据做一个初步处理
            res.data.forEach(item=>{
              item.time = item.time.split('T')[0];
            });
            //重新存储所有的数据
            var positive = 0;
            var negative = 0;
            this.adminAllMessageOther.length=0;
            for(var i =0 ;i < res.data.length;i++){
              if(res.data[i].type==='正向'){
                positive++
              }else{
                negative++;
              }
              this.adminAllMessageOther.push({
                username:res.data[i].username,
                time:res.data[i].time,
                content:res.data[i].content,
                positive:res.data[i].positive,
                negative:res.data[i].negative,
                type:res.data[i].type
              });
            }

            //扇形图数据重新加载
            var tempLen = this.shanChartOptions.series[0].data.length;
            for(var i = 0;i < tempLen;i++){
              this.shanChartOptions.series[0].data.pop();
            }
            this.shanChartOptions.series[0].data.push({
              value: positive+1, name: '正面情感留言'
            });
            this.shanChartOptions.series[0].data.push({
              value: negative-1, name: '负面情感留言'
            });
            var shanChart = this.$echarts.init(this.$refs['adminShanEchartChild']);
            shanChart.setOption(this.shanChartOptions);

            //判断情感负向还是正向
            if(this.checked==true){//负面评论
              var tempLength = this.adminAllMessage.length;
              for(var i = 0;i < tempLength;i++){
                this.adminAllMessage.pop();
              }
              for(var i = 0;i < this.adminAllMessageOther.length;i++){
                if(this.adminAllMessageOther[i].type=='负向')
                {
                  this.adminAllMessage.push({
                    username: this.adminAllMessageOther[i].username,
                    time: this.adminAllMessageOther[i].time,
                    content: this.adminAllMessageOther[i].content,
                    positive: this.adminAllMessageOther[i].positive,
                    negative: this.adminAllMessageOther[i].negative,
                    type: this.adminAllMessageOther[i].type
                  });
                }
              }
            }else{
              this.adminAllMessage.length=0;
              for(var i = 0;i < this.adminAllMessageOther.length;i++){
                  this.adminAllMessage.push({
                    username: this.adminAllMessageOther[i].username,
                    time: this.adminAllMessageOther[i].time,
                    content: this.adminAllMessageOther[i].content,
                    positive: this.adminAllMessageOther[i].positive,
                    negative: this.adminAllMessageOther[i].negative,
                    type: this.adminAllMessageOther[i].type
                  });
              }
            }

          });
        }
      }
    },
  }
}
</script>

<style scoped>
#messageAdminBox{
  overflow-x: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  /*background-color: #bfa;*/
  display: flex;
  border: solid 2px white;
  color: black;
  color: white;
}
#messageAdminLeftList{
  overflow-x: hidden;
  position: relative;
  height: 100%;
  width: 60%;
  background-color: white;
}
#messageAdminRightChart{
  position: relative;
  height: 100%;
  width: 40%;
  background-color: rgb(129,185,180);
}
#messageAdminLeftListTitle{
  border-right: 2px solid rgb(22,193,98);
  width: 100%;
  height: 80px;
  font-size: 30px;
  letter-spacing: 20px;
  color:white;
  text-align: center;
  line-height: 80px;
  border-bottom: 2px white solid;
  background-color: rgb(101,93,218);
}
.checkboxOfAdmin{
  position: absolute;
  top: 40px;
  right: 30px;
  color: white;
}
.singleAdminListContent{
  width: 100%;
  height: 170px;
  border-bottom: dashed 2px black;
  position: relative;
  background-color: #2e5985;
}
.singleAdminListNameAndTime{
  width: 100%;
  height: 50px;
}
.singleAdminListText{
  width: 100%;
  height: 50px;
  /*background-color: #5B55E6;*/
}
.singleAdminListTypeAndPositive{
  width: 100%;
  height: 50px;
  /*background-color: #00b09b;*/
}
.positiveOrNegative{
  display: inline !important;
  width: 80%;
}
.singleAdminListTypeAndPositive>span{
}
.singleAdminListName{
  font-size: 20px;
  font-weight: bolder;
  margin-left: 10px;
  letter-spacing: 8px;
}
.singleAdminListText{
  letter-spacing: 1px;
  margin-left: 8px;
  height: 40px;
  font: normal 14px/190% \5B8B\4F53;
  overflow-y: auto;
}
.singleAdminListTypeAndPositive{
  margin-left: 8px;
}
.singleAdminListTime{
  font-size: 20px;
}
.deleteMessageBtnContainer{
  position: absolute;
  top: 35px;
  right: 0;
}
#messageContentContainer{
  border-right: white 2px solid;
  overflow-x: hidden;
}
#messageAdminRightChartTitle{
  height: 80px;
  width: 100%;
  background-color:rgb(101,93,218);
  font-size: 30px;
  letter-spacing: 20px;
  color:white;
  text-align: center;
  line-height: 80px;
  border-bottom: 2px white solid;
}
#messageCurrentNum{
  height: 25px;
  width: 100%;
  color: black;
  font-size: 15px;
  line-height: 25px;
  font-weight: bolder;
  border-bottom: solid white 2px;
  background: #2e5985;
  color: white;
}
#messageCurrentNum>span{
  font-family: my-font2;
  color: red;
}
#ShanEchartContainer{
  position: absolute;
  left: 0;
  top: 105px;
  height: 83.5%;
  width: 100%;
  /*border-bottom: white solid 2px;*/
  background: #2e5985;
}
.adminMessageCascader{
  position: absolute;
  top: 20px;
  left: 2%;
}
#closeAdminMessageBtnContainer{
  position: absolute;
  right: 2px;
  top: 5px;
  /*width: 100px;*/
  /*height: 100px;*/
  /*background-color: red;*/
  z-index: 9999;
}
.choosePoorArea{
  background-color: #668B8B !important;
}
</style>
