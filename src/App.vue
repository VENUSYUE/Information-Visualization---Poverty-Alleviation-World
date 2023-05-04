<template>
  <div>
    <div id="hearder2">
    </div>

    <transition name="loadAni">
    <div id="container" v-show="isLoadShow">
    <div id="load" >
      <div>中</div>
      <div>载</div>
      <div>加</div>
      <div>图</div>
      <div>地</div>
      <div>贫</div>
      <div>脱</div>
    </div>
      <transition name="sayy">
      <div id="say" v-show="isLoadShow">全面建成小康社会,一个也不能少</div>
      </transition>
    </div>
    </transition>

    <div id="bodyer" v-show="!isLoadShow">
      <router-view :earseLoad="earseLoad"></router-view>
    </div>
  </div>
</template>

<script>
export default{
    data(){
      return{
        isLoadShow:false
      }
    },
  mounted() {
      this.isLoadShow = true;
  },
  methods:{
    earseLoad(){
        if (this.isLoadShow==true){
          this.isLoadShow = false;
        }
      },
  }
}
</script>

<style>

 /*#hearder2{*/
 /*   background-color:#CE8483;*/
 /*   display: block;*/
 /*   height: 50px !important;*/
 /*  overflow: hidden;*/
 /* }*/

  #register{
    right: 50px;
    float: left;
    color:black;
    font-size: 20px;
    margin-right: 20px;
  }

  #mapShow{
    float:left;
    color:black;
    font-size: 20px;
    margin-left:20px;
  }
  #threeDShow{
    float:left;
    color:black;
    font-size: 20px;
  }

  #bodyer{
    overflow-y: hidden !important;
  }


 #load {
   position:absolute;
   width:600px;
   height:36px;
   left:50%;
   top:40%;
   margin-left:-300px;
   overflow:visible;
   -webkit-user-select:none;
   -moz-user-select:none;
   -ms-user-select:none;
   user-select:none;
   cursor:default;
 }

 #load div {
   position:absolute;
   width:20px;
   height:36px;
   opacity:0;
   font-size: 20px;
   font-family:Helvetica, Arial, sans-serif;
   animation:move 2s linear infinite;
   -o-animation:move 2s linear infinite;
   -moz-animation:move 2s linear infinite;
   -webkit-animation:move 2s linear infinite;
   transform:rotate(180deg);
   -o-transform:rotate(180deg);
   -moz-transform:rotate(180deg);
   -webkit-transform:rotate(180deg);
   color:#35C4F0;
 }

 #load div:nth-child(2) {
   animation-delay:0.2s;
   -o-animation-delay:0.2s;
   -moz-animation-delay:0.2s;
   -webkit-animation-delay:0.2s;
 }
 #load div:nth-child(3) {
   animation-delay:0.4s;
   -o-animation-delay:0.4s;
   -webkit-animation-delay:0.4s;
   -webkit-animation-delay:0.4s;
 }
 #load div:nth-child(4) {
   animation-delay:0.6s;
   -o-animation-delay:0.6s;
   -moz-animation-delay:0.6s;
   -webkit-animation-delay:0.6s;
 }
 #load div:nth-child(5) {
   animation-delay:0.8s;
   -o-animation-delay:0.8s;
   -moz-animation-delay:0.8s;
   -webkit-animation-delay:0.8s;
 }
 #load div:nth-child(6) {
   animation-delay:1s;
   -o-animation-delay:1s;
   -moz-animation-delay:1s;
   -webkit-animation-delay:1s;
 }
 #load div:nth-child(7) {
   animation-delay:1.2s;
   -o-animation-delay:1.2s;
   -moz-animation-delay:1.2s;
   -webkit-animation-delay:1.2s;
 }

 @keyframes move {
   0% {
     left:0;
     opacity:0;
   }
   35% {
     left: 41%;
     -moz-transform:rotate(0deg);
     -webkit-transform:rotate(0deg);
     -o-transform:rotate(0deg);
     transform:rotate(0deg);
     opacity:1;
   }
   65% {
     left:59%;
     -moz-transform:rotate(0deg);
     -webkit-transform:rotate(0deg);
     -o-transform:rotate(0deg);
     transform:rotate(0deg);
     opacity:1;
   }
   100% {
     left:100%;
     -moz-transform:rotate(-180deg);
     -webkit-transform:rotate(-180deg);
     -o-transform:rotate(-180deg);
     transform:rotate(-180deg);
     opacity:0;
   }
 }

 @-moz-keyframes move {
   0% {
     left:0;
     opacity:0;
   }
   35% {
     left:41%;
     -moz-transform:rotate(0deg);
     transform:rotate(0deg);
     opacity:1;
   }
   65% {
     left:59%;
     -moz-transform:rotate(0deg);
     transform:rotate(0deg);
     opacity:1;
   }
   100% {
     left:100%;
     -moz-transform:rotate(-180deg);
     transform:rotate(-180deg);
     opacity:0;
   }
 }

 @-webkit-keyframes move {
   0% {
     left:0;
     opacity:0;
   }
   35% {
     left:41%;
     -webkit-transform:rotate(0deg);
     transform:rotate(0deg);
     opacity:1;
   }
   65% {
     left:59%;
     -webkit-transform:rotate(0deg);
     transform:rotate(0deg);
     opacity:1;
   }
   100% {
     left:100%;
     -webkit-transform:rotate(-180deg);
     transform:rotate(-180deg);
     opacity:0;
   }
 }

 @-o-keyframes move {
   0% {
     left:0;
     opacity:0;
   }
   35% {
     left:41%;
     -o-transform:rotate(0deg);
     transform:rotate(0deg);
     opacity:1;
   }
   65% {
     left:59%;
     -o-transform:rotate(0deg);
     transform:rotate(0deg);
     opacity:1;
   }
   100% {
     left:100%;
     -o-transform:rotate(-180deg);
     transform:rotate(-180deg);
     opacity:0;
   }
 }
  #container{
    width: 100%;
    height:100%;
    position: absolute;
    background-color: rgb(0,15,26);
    left: 0;
    top: 0%;
  }

  #say{
    position: absolute;
    left: 32%;
    top: 50%;
    color: red;
    font-size: 50px;
    font-family: 'my-font1';
  }
 .sayy-enter{
   opacity: 0;
 }
 .sayy-enter-active{
   transition: opacity 8s;
 }


</style>
