<template>
    <div id="itemm">

      <div id="photocontainer">
        <img v-for="src in photoArr" :src="'data:image/png;base64,'+src" class="photos" :key="src">
      </div>

      <div class="reqTitle">申请信息</div>
      <div class="textContent">
        <div id="threeContents">
          <div class="textItem"><span class="reqTitles1">申请状态:</span><span class="reqContent1">{{state }}</span></div>
          <div class="textItem"><span class="reqTitles1">申请时间:</span><span class="reqContent1">{{ time }}</span></div>
          <div class="textItem"><span class="reqTitles1">完成时间:</span><span class="reqContent1">{{ endtime }}</span></div>
        </div>
        <div id="oneContent">
          <div class="textItem"><span class="reqTitles2">申请内容:</span><span class="reqContent2">{{ text }}</span></div>
        </div>
      </div>

    </div>
</template>

<script>
export default {
  name: "descriptionList",
  data:function(){
    return{
      photoArr:[],
    }
  },
  mounted () {
    var i = 0;
    if(this.photo1!=''){
      i++;
      this.photoArr.push(this.photo1)
    }
    if(this.photo2!=''){
      i++;
      this.photoArr.push(this.photo2)
    }
    if(this.photo3!=''){
      i++;
      this.photoArr.push(this.photo3)
    }
    if(this.photo4!=''){
      i++;
      this.photoArr.push(this.photo4)
    } if(this.photo5!=''){
      i++;
      this.photoArr.push(this.photo5)
    }
  },
  props:{
    state:String,
    time:String,
    endtime:String,
    text:String,
    photo1:String,
    photo2:String,
    photo3:String,
    photo4:String,
    photo5:String,
  }
}
</script>

<style scoped>
  #itemm{
    display: flex;
    height: 300px;
    border-bottom: black 1px solid;
    margin-bottom: 5px;
  }
  #photocontainer{
    width: 400px;
    height: 295px;
    overflow-x: hidden;
    overflow-y: auto;
    border: 2px solid rgb(58,51,117);
  }
  .photos{
    width: 400px;
    height: 290px;
    margin-right: 20px;
  }
  .textContent{
    display: flex;
    /*flex-direction: column;*/
    margin-top: 50px;
  }
  .textItem>.reqContent1{
    display: inline-block;
    padding-top:13px ;
    border-bottom: 2px solid rgb(86,29,41);
    height: 35px;
    font-size:14px;
    /*line-height: 30px;*/
    color: rgb(84,101,169);
    font-weight: bolder;
    overflow-y: auto;
    /*background-color: rgb(22,23,49);*/
    /*width: 1050px;*/
    /*line-height: 30px;*/
    margin-top: 30px;
    width: 300px;
  }
  .textItem>.reqTitles1{
    padding-left: 10px;
    width: 300px;
    /*line-height: 30px;*/
    font-size: 15px;
    font-weight: bolder;
    color: black;
    background-color: white;
  }
  .reqTitle{
    position: absolute;
    /*top: 0%;*/
    left: 45%;
    color: white;
    font-size: 20px;
    width: 200px;
    height: 30px;
    /*background-color: rgb(0,112,239);*/
    text-align: center;
    font-size: 30px;
    line-height: 30px;
    margin-top: 10px;
    color: black;
    font-family: 黑体;
    font-weight: bolder;
    /*border-bottom: solid black 2px;*/
  }
  #threeContents{
    width: 300px;
  }
  .textItem{
    width: 500px;
  }
  #oneContent{
    width: 700px;
  }
  .reqContent2{
    padding-left: 10px;
    display: inline-block;
    padding-top:13px;
    /*border-bottom: 2px solid rgb(86,29,41);*/
    height: 200px;
    font-size:14px;
    /*line-height: 30px;*/
    color: rgb(84,101,169);
    font-weight: bolder;
    overflow-y: auto;
    /*background-color: rgb(22,23,49);*/
    /*width: 1050px;*/
    /*line-height: 30px;*/
    margin-top: 30px;
    width: 720px;
    margin-left: 100px;
    border-left: 2px black solid;
  }
  .reqTitles2{
    font-weight: bolder;
    position: absolute;
    /*top: 0%;*/
    left:50%;
    color: white;
    font-size: 20px;
    width: 200px;
    height: 30px;
    /*background-color: rgb(0,112,239);*/
    text-align: center;
    font-size: 20px;
    line-height: 30px;
    margin-top: 10px;
    color: black;
    /*border-bottom: solid black 2px;*/
  }
</style>
