<template>
  <div id="adminBody">
    <!--右上角工具箱-->
    <div id=""></div>

    <!--地图div-->
    <div id="reqMap">

    </div>

    <!--负责区域-->
    <div id="adminAreaContainer">
      <span>负责区域:</span>{{adminArea}}
    </div>

    <!--右侧请求处理栏-->
    <div id="reqList">
      <!--表头选项-->
      <div id="reqListTitle">
        <el-menu class="el-menu-demo" mode="horizontal" background-color="#5B55E6" default-active="1" active-text-color="#00ffff" @select="handerSelect">
          <el-menu-item index="1">
            <i class="el-icon-folder-opened"></i>
            <span slot="title">所有请求</span>
          </el-menu-item>
          <el-menu-item index="2" icon="el-icon-loading">
            <i class="el-icon-loading"></i>
            <span slot="title">待处理</span>
          </el-menu-item>
          <el-button id="reflashButton" icon="el-icon-refresh-right" @click="refreshList">刷新</el-button>
        </el-menu>
      </div>

      <!--表列-->
      <div id="listContent">
        <listItem v-for="(value,index) in listData" :itemData="value" :index="index" :key="index" :openDetails="openDetails" :openHandle=openHandle :ref="'listItem1'+index">
        </listItem>
    </div>
    </div>

    <!--个人详细信息-->
    <transition name="detailAni">
    <div id="details" v-show="detailsShow">
      <div id="closeBtn"><el-button icon="el-icon-error" class="cBtn" @click="closeDetail"></el-button></div>
      <div id="info">
        <div id="iphoto">
          <img src="static/img/男头像.png" id="ava">
        </div>
        <div id="iname">{{curItem.name}}</div>
        <div id="istate">{{"申请状态 "+curItem.state}}</div>
        <div id="iphone">{{"联系电话 "+curItem.phone}}</div>
        <div id="iposition">{{"申请地点 "+curItem.position}}</div>
        <div id="iid">{{"申请人身份证号 "+curItem.id}}</div>
        <div id="itime">{{"申请时间 "+curItem.time}}</div>
        <div id="iendtime">{{"审批时间"+curItem.endtime}}</div>
      </div>
      <div id="textInfo">
        <div id="itext">
          {{"&nbsp"+"&nbsp"+"&nbsp"+curItem.text }}
        </div>
      </div>
      <div id="photoInfo">
        <div id="iimage">
            <img v-for="url in imgUrls" :key="url" :src="url" class="detailImg">
        </div>
      </div>
    </div>
    </transition>

    <!--处理请求对话框-->
    <div id="handleReq" v-show="handleShow">
      <div type="primary"><el-button id="closeBtn2" circle class="closeBtn2" icon="el-icon-close" @click="showCharge"></el-button></div>
      <div id="selectBox">
        <div id="selectDesc">
          缓冲区半径
        </div>
        <div id="elSelect">
          <el-select v-model="value" placeholder="选择缓冲区半径" @change="drawCircle">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              >
            </el-option>
          </el-select>
        </div>
      </div>
      <div id="chargePeopleList">
        <el-table
          :data="chargePeopleList"
          class="c"
          @row-dblclick="selectChargePeople"
          height="573"
        >
          <el-table-column
            prop="idc"
            label="id"
            width="50">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="50">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="80">
          </el-table-column>
          <el-table-column
            prop="sexy"
            label="性别"
            width="50">
          </el-table-column>
          <el-table-column
            prop="num"
            label="处理数"
            width="70">
          </el-table-column>
          <el-table-column
            prop="grade"
            label="评分"
            width="50">
          </el-table-column>
          <el-table-column
            prop="position"
            label="位置"
            width="200">
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div id="layerSwitch">
      <el-switch
        v-model="switchs[0]"
        style="display: block"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="负责人点"
        class="switch1"
        @change="changeS1"
      :width="50">
      </el-switch>
      <el-switch
        v-model="switchs[1]"
        style="display: block"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="未处理"
        class="switch1"
        :width="50"
        @change="changeS2">
      </el-switch>
      <el-switch
        v-model="switchs[2]"
        style="display: block"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="处理中"
        class="switch1"
        :width="50"
        @change="changeS3">
      </el-switch>
      <el-switch
        v-model="switchs[3]"
        style="display: block"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="处理完成"
        class="switch1"
        :width="50"
        @change="changeS4">
      </el-switch>
    </div>

    <!--功能列表-->
    <div id="function">
      <function-list :adminChartShow="adminChartShow" :openPersonManage="openPersonManage" :openMessageAdmin="openMessageAdmin" :analysis3D="analysis3D"></function-list>
    </div>
    <!-- <div id="canvas"></div> -->
    <!--图表数据-->
    <div id="acharts" v-show="chartShow">
      <adminCharts :closeCharts="closeCharts" :adminArea="adminArea">

      </adminCharts>
    </div>

    <!--人事管理-->
    <div id="personManageContainer" v-show="personManageShow">
      <person-manage @closePersonManage="closePersonManageBox" :adminArea="adminArea" ref="personManageChild"></person-manage>
    </div>
    <!--舆情分析界面-->
    <div id="messageAdminContainer" ref="adminMessage" v-show="messageAdminShow">
      <messageAdmin ref="adminMessageChild" @closeMessage="closeMessage" :adminArea="adminArea"></messageAdmin>
    </div>
</div>

</template>

<script>
import {loadModules} from 'esri-loader';
import listItem from "../registercomponent/listItem";
import functionList from '../registercomponent/functionList'
import adminCharts from "../registercomponent/adminCharts";
import personManage from "../registercomponent/personManage";
import messageAdmin from "../registercomponent/messageAdmin";

export default {
  name: "admin",
  components:{
    listItem,
    functionList,
    adminCharts,
    personManage,
    messageAdmin
  },
  created() {
    //初始化列表
    this.axios.get("http://120.27.240.160:3000/getAllrequest").then(res=>{
      this.listData=res.data;
    });
  },
  props:{
    earseLoad:Function
  },
  mounted() {
    setTimeout(()=>{
      this.earseLoad();
    },1000)
    this.adminArea = this.$route.params.adminArea;
    this.createScene();
    this.createList();
    this.initUrl();
  },
  data(){
    return{
      Is3DHeatFlag:false,
      messageAdminShow:false,
      adminArea:'',
      personManageShow:false,
      Is3DHeatMapShow:false,
      listData:{},
      selectIndex:"1",
      detailsShow:false,
      curItem:{
        state:"",
        name:"",
        id:"",
        time:"",
        endtime:"",
        text:"",
        position:"",
        phone:"",
      },
      chargePeopleData:[],
      imgUrls:[],
      options:[
        {
          value: '500',
          label: '500m'
        },
        {
          value: '1000',
          label: '1000m'
        },
        {
          value: '2000',
          label: '2000m'
        },
        {
          value: '3000',
          label: '3000m'
        }
      ],
      handleShow:false,
      curIndex:-1,
      value:"",
      chargePeopleList:[],
      switchs:[true,true,true,true],
      chartShow:false
    }
  },
  methods:{
    closePersonManageBox(){
      this.personManageShow = false;
    },
    refreshChargeLine(){
      this.chargeLine.graphics.removeAll();
      //向数据库请求数据 绘制直线
      for(var i = 0;i < this.chargePeopleData.length;i++){
        ((i)=>{
          this.axios.get('http://120.27.240.160:3000/getchargepeoplebyidc?idc='+this.chargePeopleData[i].idc).then(res=>{
            var startLongitude = parseFloat(this.chargePeopleData[i].longitude);
            var startLatitude = parseFloat(this.chargePeopleData[i].latitude);
            for(let item of res.data){
              var endLongitude = parseFloat(item.longitude);
              var endLatitude = parseFloat(item.latitude);
              // 添加线数据
              // 创建线几何
              const polyline = {
                type: 'polyline',
                // 二维数组，每个元素是一个地点的经纬度，点越多路线越精准
                paths: [
                  [startLongitude, startLatitude],
                  [endLongitude, endLatitude]
                ]
              }
              // 254,230,50
              // 路径的属性定制
              var color;
              if(item.state=='2'){
                color = 'rgb(254,230,50)'
              }else if(item.state=='1'){
                color='#54FF9F';
              }
              const lineSymbol = {
                type: 'simple-line', // 类型
                color: color, // 颜色 rgb or rgba [255, 0, 0, 0.5] or 16进制
                width: 2 // 宽度 px
              }
              const polylineGraphic = new this.Graphic({
                geometry: polyline,
                symbol: lineSymbol
              })
              this.chargeLine.graphics.add(polylineGraphic);
            }
          });
        })(i)
      }
    },
    createList() {
      // var getAllrequestUrl;
      if(this.adminArea=='全国'){
        this.getAllrequestUrl='http://120.27.240.160:3000/getAllrequest';
      }else{
        this.getAllrequestUrl = 'http://120.27.240.160:3000/getpartrequest?belong='+this.adminArea;
      }
      //初始化列表
      this.axios.get(this.getAllrequestUrl).then(res=>{
        this.listData=res.data;
      });
    },
    closeMessage(){
      this.messageAdminShow = false;
    },
    openMessageAdmin(){
      this.messageAdminShow=!this.messageAdminShow;
      this.personManageShow = false;
      this.chartShow=false;
      if(this.messageAdminShow==true){
        setTimeout(()=>{
          this.$refs.adminMessageChild.refreshadminAllMessage();
        },500);
      }
    },
    initUrl(){
      if(this.adminArea=='全国'){
        //待处理请求
        this.someRequestUrl = 'http://120.27.240.160:3000/getsomerequest';
      }else{
        this.someRequestUrl='http://120.27.240.160:3000/getpartsomerequest?belong='+this.adminArea;
      }
    },
    openPersonManage(){
      this.personManageShow = !this.personManageShow;
      this.chartShow=false;
      this.messageAdminShow = false;
      this.$refs['personManageChild'].refreshAdminTable();
    },
    createScene:function (){
      const _self = this;   //定义一个_self防止后续操作中this丢失
      const option = {      //定义一个包含有JS API中js开发包和css样式文件的对象
        url: 'https://js.arcgis.com/4.20/',
        css: "https://js.arcgis.com/4.20/esri/themes/light/main.css"
      };
      //通过loadModules来做衔接
      loadModules(["dojo/_base/lang","esri/config","esri/Map", "esri/views/SceneView", "esri/layers/SceneLayer", "esri/layers/FeatureLayer","esri/geometry/Point","esri/WebScene","esri/layers/GraphicsLayer",'esri/Graphic',"esri/geometry/Circle","esri/widgets/LayerList"],option)
      .then(([lang,esriConfig,Map,SceneView,SceneLayer,FeatureLayer,Point,WebScene,GraphicsLayer,Graphic,Circle,LayerList])=>{
        this.Circle = Circle;
        this.Graphic = Graphic;
        this.Point = Point;
        this.FeatureLayer=FeatureLayer;
        esriConfig.apiKey = "AAPKf36563646971486495a735ebc79605460PP-JogfopxIQxEW9cdNBRAYKlZVdvdzQhCtLCo4qsJ3TqjCa-dF-Pc25egARMZ4";

        let scene = new WebScene({
          portalItem: { // autocasts as new PortalItem()
            id: "c1ec1aedc5a34777b03239778db8f17c"  // ID of the WebScene on arcgis.com
          }
        });
        this.scene=scene;

        const view = new SceneView({
          container: "reqMap",
          map: scene,
          environment: {
            starsEnabled: false,
            atmosphereEnabled: false,
            background: {
              type: "color",
              color: "rgb(0,15,26)"
            }
          },
          zoom:1,
        });
        this.view = view;

        //三维热力图
        /*封装热力图*/
        class HeatLayer {
          constructor(obj) {
              this.view = obj.view
              this.config = obj.config
              this.canvas = null
              this.context = null
              this.minnum = 1
              this.maxnum = 1
              this.visible = true
              this.createCanvas()
          }
          /*创建Canvaslayer的容器canvas，添加到map的layers下面*/
          createCanvas() {
              let canvas = document.createElement('canvas');
              canvas.width = this.view.width;
              canvas.height = this.view.height;
              canvas.setAttribute("id", "heatmap");
              canvas.style.position = "absolute";
              canvas.style.top = 0;
              canvas.style.left = 0;
              let parent = document.getElementsByClassName("esri-view-surface")[0];
              parent.appendChild(canvas);
              this.canvas = canvas;
              this.context = document.getElementById("heatmap").getContext('2d');
              this.startMapEventListeners();
          }
          /*转换数据*/
          convertHeatmapData(data) {
              var heatPluginData = [];
              for (let i = 0; i < data.length; i++) {
                  let screenpoint = this.view.toScreen(new Point({
                  longitude: data[i][0],
                  latitude: data[i][1],
                  }));

                  // 判断数据是否带有权重，未带有权重属性是默认为1
                  if (data[0].length == 3) {
                    heatPluginData.push([Math.round(screenpoint.x), Math.round(screenpoint.y), data[i][2]]);
                  }
                  else {
                    heatPluginData.push([Math.round(screenpoint.x), Math.round(screenpoint.y), 1]);
                  }
                  if (this.minnum > data[i][2]) {
                    this.minnum = data[i][2];
                  }
                  if (this.maxnum < data[i][2]) {
                    this.maxnum = data[i][2];
                  }
              }
              return {
                  points: heatPluginData,
                  min: this.minnum,
                  max: this.maxnum
              };
          }
          //添加点数据
          addPoint(data) {
              this.data = data;
              let points = this.convertHeatmapData(data);
              //console.log(points)
              points.points.forEach(point => {
              this.context.beginPath();
              let alpha = (point[2] - points.min) / (points.max - points.min);
              this.context.globalAlpha = alpha;
              this.context.arc(point[0], point[1], this.config.radius, 0, Math.PI * 2, true);
              //绘制一个放射渐变样式的圆
              let gradient = this.context.createRadialGradient(point[0], point[1], 0, point[0], point[1], this.config.radius);
              gradient.addColorStop(0, 'rgba(0,0,0,1)');
              gradient.addColorStop(1, 'rgba(0,0,0,0)');
              this.context.fillStyle = gradient;
              this.context.closePath();
              this.context.fill();
              });
              this.MapColors();
          }
          //设置渐变色带
          getColorPaint() {
              let paletteCanvas = document.createElement('canvas');
              let paletteCtx = paletteCanvas.getContext('2d');
              let gradientConfig = this.config.gradient;
              paletteCanvas.width = 256
              paletteCanvas.height = 1
              let gradient = paletteCtx.createLinearGradient(0, 0, 256, 1);
              for (let key in gradientConfig) {
                gradient.addColorStop(key, gradientConfig[key])
              }
              paletteCtx.fillStyle = gradient;
              paletteCtx.fillRect(0, 0, 256, 1);
              return paletteCtx.getImageData(0, 0, 256, 1).data
          }
          //映射颜色
          MapColors() {
            let palette = this.getColorPaint();
            let img = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
            let imgData = img.data;
            for (let i = 0; i < imgData.length; i++) {
              let alpha = imgData[i];
              let offset = alpha * 4;
              if (!offset) {
                continue
              }
              //映射颜色RGB值
              imgData[i - 3] = palette[offset];
              imgData[i - 2] = palette[offset + 1];
              imgData[i - 1] = palette[offset + 2];
            }
            this.context.putImageData(img, 0, 0, 0, 0, this.canvas.width, this.canvas.height);
          }
          /*刷新layer*/
          freshenLayer() {
            this.clearCanvas();
            this.addPoint(this.data);
          }
          //析构
          deleteCanvas() {
            this.context.clearRect(0, 0, this.view.width, this.view.height);
            let view = this.view;
            view.watch("extent", lang.hitch(this, () => {
              this.context.clearRect(0, 0, this.view.width, this.view.height);
              return;
            }));
            view.watch("camera", lang.hitch(this, () => {
              this.context.clearRect(0, 0, this.view.width, this.view.height);
              return;
            }));
          }
          /*清除渲染效果*/
          clearCanvas() {
            this.context.clearRect(0, 0, this.view.width, this.view.height);
          }
          /*添加监听*/
          startMapEventListeners() {
            let view = this.view;
            view.watch("extent", lang.hitch(this, ()=>{
              if (!this.visible) return;
              this.freshenLayer();
            }));
            view.watch("camera", lang.hitch(this, ()=>{
              if (!this.visible) return;
              this.freshenLayer();
            }));
          }
        }
        this.HeatLayer=HeatLayer;
        //配置热力图的颜色、半径
        var heatMapConfig = {
            radius: 15,
            gradient: {
                '0.2':'rgba(0,0,255,0.2)',
                '0.3':'rgba(43,111,231,0.3)',
                '0.4':'rgba(2,192,241,0.4)',
                '0.6':'rgba(44,222,148,0.6)',
                '0.8':'rgba(254,237,83,0.8)',
                '0.95':'rgba(255,118,50,0.9)',
                '1':'rgba(255,64,28,1)'
            }
        };
        this.heatMapConfig=heatMapConfig;
        setTimeout(()=>{
          //未完成申请点数据添加
          var reqPoint = new GraphicsLayer();
          this.reqPoint= reqPoint;
          scene.layers.unshift(reqPoint);
          //已完成申请点数据添加
          var finishedPoint = new GraphicsLayer();
          this.finishedPoint= finishedPoint;
          scene.layers.unshift(finishedPoint);
          //处理中申请点数据添加
          var ingPoint = new GraphicsLayer();
          this.ingPoint= ingPoint;
          scene.layers.unshift(ingPoint);
          //负责人点数据添加
          var chargePeople = new GraphicsLayer();
          this.chargePeople= chargePeople;
          scene.layers.unshift(chargePeople);
          //直线绘制
          var chargeLine = new GraphicsLayer();
          this.chargeLine= chargeLine;
          scene.layers.unshift(chargeLine);

          //向数据库请求数据添加申请点
          var positionUrl;
          if(this.adminArea==='全国'){
            positionUrl='http://120.27.240.160:3000/getreqposition';
          }else{
            //获取所有请求通过县名
            positionUrl='http://120.27.240.160:3000/getreqpositionbyname?belong='+this.adminArea;
          }

          this.axios.get(positionUrl).then(res=>{
            let symbolSuccess = {
              type: "picture-marker",
              url: 'static/img/成功.png',
              width: "25px",
              height: "25px"
            };
            let symboling = {
              type: "picture-marker",
              url: 'static/img/等待.png',
              width: "25px",
              height: "25px"
            };
            let symbolWait = {
              type: "picture-marker",
              url: 'static/img/wb_医院.png',
              width: "25px",
              height: "25px"
            };

            res.data.forEach((value,index)=>{

              var lng = parseFloat(value['longitude']);
              var lat = parseFloat(value['latitude']);

              if(index==0){
                view.goTo({
                  target: [lng,lat],
                  // heading: 180,
                  tilt: 20,
                  zoom:16,
                },{duration: 3000})
              }
              let pt = new Point({
                latitude: lat,
                longitude: lng
              });
              var graphicsr = new Graphic(pt);

              if(value['state']==0){
                graphicsr.symbol=symbolWait;
                reqPoint.graphics.add(graphicsr);
              }else if(value['state']==1){
                graphicsr.symbol=symbolSuccess;
                finishedPoint.graphics.add(graphicsr);
              }else{
                graphicsr.symbol=symboling;
                ingPoint.graphics.add(graphicsr);
              }
            })
          });

          /*添加图层列表*/
          // var layerList = new LayerList({
          //   view: view
          // });
          // view.ui.add(layerList, "top-left");

          //向数据库请求数据添加负责人
          this.axios.get('http://120.27.240.160:3000/getchargeposition').then(res=>{
            this.chargePeopleData.length=0;
            res.data.forEach((value,index)=>{
              this.chargePeopleData.push({
                idc:value['idc'],
                longitude:value['longitude'],
                latitude:value['latitude']
              });
              var lng = parseFloat(value['longitude']);
              var lat = parseFloat(value['latitude']);
              let pt = new Point({
                latitude: lat,
                longitude: lng
              });
              let symbol = {
                type: "picture-marker",
                url: 'static/img/负责人.png',
                width: "40px",
                height: "40px"
              };
              var graphicsr = new Graphic(pt);
              graphicsr.symbol = symbol;
              chargePeople.graphics.add(graphicsr);
            });
            this.refreshChargeLine();
          });
        },3000)
      })
    },
    handerSelect(index){
      //选中“所有请求”
      if(index==1){
        this.axios.get(this.getAllrequestUrl).then(res=>{
          this.listData=res.data;
          this.selectIndex="1";
        });
      }else if(index==2){//选中“待处理请求”
        this.axios.get(this.someRequestUrl).then(res=>{
          this.listData=res.data;
          this.selectIndex="2";
        });
      }
    },
    refreshList(){
      if(this.selectIndex=="1"){
        this.axios.get(this.getAllrequestUrl).then(res=>{
          this.listData=res.data;
          this.selectIndex="1";
        });
      }else{
        this.axios.get(this.someRequestUrl).then(res=>{
          this.listData=res.data;
          this.selectIndex="2";
        });
      }
    },
    //格局请求index打开详情页
    openDetails(index){
      this.handleShow = false;
      //先清除上一次得图片
      this.imgUrls.length=0;

      //确定页面数据
      this.curItem.name = this.listData[index].name;
      this.curItem.position = this.listData[index].position;
      this.curItem.state = this.listData[index].state;
      this.curItem.id = this.listData[index].id;
      this.curItem.phone = this.listData[index].phone;
      this.curItem.time = this.listData[index].time;
      this.curItem.entime = this.listData[index].endtime;
      this.curItem.text = this.listData[index].text;
      //初始化图片列表

      for(var i = 0;i < 5;i++){
        if(this.listData[index]['photo'+(i+1)]!=''){
          this.imgUrls.push('data:image/png;base64,'+this.listData[index]['photo'+(i+1)]);
        }
      }
      //打开详情页面
      this.detailsShow=true;
      this.view.goTo({
        target: [parseFloat(this.listData[index].longitude),parseFloat(this.listData[index].latitude)],
        // heading: 180,
        tilt: 20,
        zoom:16,
      },{duration: 1000})
    },
    closeDetail(){
      this.detailsShow = false;
    },
    //画圆函数
    drawCircle(r){
      //移去上一次的圆
      if(this.circleGeometry!=undefined){
        this.view.graphics.removeAll();
      }
      //定义圆
      const circleGeometry = new this.Circle({
        center: [ parseFloat(this.listData[this.curIndex].longitude), parseFloat(this.listData[this.curIndex].latitude)],
        geodesic: true,
        numberOfPoints: 100,
        radius: parseInt(r),
        radiusUnit: "meters"
      });


      //添加圆形
      this.circleGeometry = circleGeometry;
      this.view.graphics.add(new this.Graphic({
        geometry: circleGeometry,
        symbol: {
          type: "simple-fill",
          color: [205,38,38,0.5],
        }
      }));

      //求满足要求交集负责人点
      let query = {
        geometry: circleGeometry,
        returnGeometry: true,
        outFields: ["*"]
      };

      this.chargePeople.graphics.removeAll();
      var EARTH_RADIUS = 6378137.0; //单位M
      var PI = Math.PI;

      function getRad(d) {
        return d * PI / 180.0;
      }

      function getDistance( lat1, lng1, lat2, lng2){
        var f = getRad((lat1 + lat2)/2);
        var g = getRad((lat1 - lat2)/2);
        var l = getRad((lng1 - lng2)/2);

        var sg = Math.sin(g);
        var sl = Math.sin(l);
        var sf = Math.sin(f);

        var s,c,w,r,d,h1,h2;
        var a = EARTH_RADIUS;
        var fl = 1/298.257;

        sg = sg*sg;
        sl = sl*sl;
        sf = sf*sf;

        s = sg*(1-sl) + (1-sf)*sl;
        c = (1-sg)*(1-sl) + sf*sl;

        w = Math.atan(Math.sqrt(s/c));
        r = Math.sqrt(s*c)/w;
        d = 2*w*a;
        h1 = (3*r -1)/2/c;
        h2 = (3*r +1)/2/s;

        return d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));
      }


      //更新列表
      var length = this.chargePeopleList.length;
      for(var i = 0;i < length;i++){
        this.chargePeopleList.pop();
      }

      this.axios.get('http://120.27.240.160:3000/getchargeposition').then(res=>{
        res.data.forEach((value,index)=>{
          var lng = parseFloat(value['longitude']);
          var lat = parseFloat(value['latitude']);

          if(getDistance(parseFloat(this.listData[this.curIndex].latitude), parseFloat(this.listData[this.curIndex].longitude),lat,lng) <= parseInt(r)) {
            if(value.state=='0'){
              value.state='空闲中';
            }else{
              value.state='忙碌中';
            }
            this.chargePeopleList.push(value);

            let pt = new this.Point({
              latitude: lat,
              longitude: lng
            });
            let symbol = {
              type: "picture-marker",
              url: 'static/img/负责人.png',
              width: "40px",
              height: "40px"
            };
            var graphicsr = new this.Graphic(pt);
            graphicsr.symbol = symbol;
            this.chargePeople.graphics.add(graphicsr);
          }
        })
      });

    },
    //处理框展示
    openHandle(index){
      this.curIndex=index;
      if(this.circleGeometry!=undefined){
        this.view.graphics.removeAll();
      }
      //视角转换
      this.view.goTo({
        target: [parseFloat(this.listData[index].longitude),parseFloat(this.listData[index].latitude)],
        // heading: 180,
        tilt: 20,
        zoom:16,
      },{duration: 1000})


      //初始化负责人列表
      var length = this.chargePeopleList.length;
      for(var i = 0;i < length;i++){
        this.chargePeopleList.pop();
      }
      this.axios.get('http://120.27.240.160:3000/getchargepeople?id='+this.listData[index].id).then(res=>{
        //初始化数据列表
        res.data.forEach((value,index)=>{
          this.chargePeopleList.push(value);
        })
      })
      this.handleShow=true;
      this.detailsShow=false;
    },
    //表格双击事件
    selectChargePeople(rowValue){
      //判断状态
      if(rowValue.state=="忙碌中"){
        this.$message.error('该负责人正在处理其他申请！无法指派');
        return;
      }else{
        this.$confirm('确认指派该负责人?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //更新数据库
          this.axios.get('http://120.27.240.160:3000/updateState?idc='+rowValue.idc+'&id='+this.listData[this.curIndex].id).then(res=>{
            this.$message({
              message: '指派成功!',
              type: 'success'
            });
            //去除指派列表
            this.handleShow=false;
            //刷新地图
            this.refreshList();
            //更新责任人
            this.chargePeople.graphics.removeAll();
            this.axios.get('http://120.27.240.160:3000/getchargeposition').then(res=>{
              res.data.forEach((value,index)=>{
                var lng = parseFloat(value['longitude']);
                var lat = parseFloat(value['latitude']);
                let pt = new this.Point({
                  latitude: lat,
                  longitude: lng
                });
                let symbol = {
                  type: "picture-marker",
                  url: 'static/img/负责人.png',
                  width: "40px",
                  height: "40px"
                };
                var graphicsr = new this.Graphic(pt);
                graphicsr.symbol = symbol;
                this.chargePeople.graphics.add(graphicsr);
              })
            });
            //更新请求
           this.refreshReq();
            //去除缓冲区
            this.view.graphics.removeAll();
          })
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '取消指派'
          });
        })
      }
    },
    changeS1(value){
      if(value==false){
        this.chargePeople.opacity=0;
      }else{
        this.chargePeople.opacity=1;
      }
    },
    changeS2(value){
      if(value==false){
        this.reqPoint.opacity=0;
      }else{
        this.reqPoint.opacity=1;
      }
      if(this.Is3DHeatMapShow){
        this.heatMapLoad();
      }

    },
    changeS3(value){
      if(value==false){
        this.ingPoint.opacity=0;
      }else{
        this.ingPoint.opacity=1;
      }
      if(this.Is3DHeatMapShow){
        this.heatMapLoad();
      }
    },
    changeS4(value){
      if(value==false){
        this.finishedPoint.opacity=0;
      }else{
        this.finishedPoint.opacity=1;
      }
      if(this.Is3DHeatMapShow){
        this.heatMapLoad();
      }
    },
    heatMapLoad(){
      let pointArr=[];
      if(this.heatmap.data){
        this.heatmap.clearCanvas();
      }
      // heatmap.addPoint([["118.66124335378005","28.92588513213444",40],["118.08115584871544","29.04952406765118",66],["118.38722644164108","29.059406055009923",32],["118.41649535128697","29.135673493885232",80],["118.55019107002441","29.300640724771107",25],["118.57374080604751","28.685810835578355",76],["118.70453463048833","28.824715624332843",58],["118.86481914446486","28.946912041540134",67],["118.8727276271301","28.972530779387345",100]]);
      //向数据库请求数据添加申请点
      this.axios.get("http://120.27.240.160:3000/getreqposition").then(res=>{
        res.data.forEach((value,index)=>{
          if(this.switchs[0]&&value['state']==0){
            var lng = parseFloat(value['longitude']);
            var lat = parseFloat(value['latitude']);
            pointArr.push([
              lng,lat,40
            ]);
          }
          else if(this.switchs[1]&&value['state']==1){
            var lng = parseFloat(value['longitude']);
            var lat = parseFloat(value['latitude']);
            pointArr.push([
              lng,lat,40
            ]);
          }
          else if(this.switchs[2]&&value['state']==2){
            var lng = parseFloat(value['longitude']);
            var lat = parseFloat(value['latitude']);
            pointArr.push([
              lng,lat,40
            ]);
          }
        });
        this.heatmap.addPoint(pointArr);
      });
    },

    showCharge(){
      this.handleShow=false;
      this.chargePeople.graphics.removeAll();
      this.view.graphics.removeAll();

      var length = this.chargePeopleList.length;
      for(var i = 0;i < length;i++){
        this.chargePeopleList.pop();
      }
      this.axios.get('http://120.27.240.160:3000/getchargepeople?id='+this.listData[this.curIndex].id).then(res=>{
        //初始化数据列表
        res.data.forEach((value,index)=>{
          this.chargePeopleList.push(value);
        })
      })

      this.axios.get('http://120.27.240.160:3000/getchargeposition').then(res=>{
        res.data.forEach((value,index)=>{
          var lng = parseFloat(value['longitude']);
          var lat = parseFloat(value['latitude']);
          let pt = new this.Point({
            latitude: lat,
            longitude: lng
          });
          let symbol = {
            type: "picture-marker",
            url: 'static/img/负责人.png',
            width: "40px",
            height: "40px"
          };
          var graphicsr = new this.Graphic(pt);
          graphicsr.symbol = symbol;
          this.chargePeople.graphics.add(graphicsr);
        })
      });
    },
    refreshReq(){
      this.reqPoint.graphics.removeAll();
      this.finishedPoint.graphics.removeAll();
      this.ingPoint.graphics.removeAll();
      let symbolSuccess = {
        type: "picture-marker",
        url: 'static/img/成功.png',
        width: "25px",
        height: "25px"
      };
      let symboling = {
        type: "picture-marker",
        url: 'static/img/等待.png',
        width: "25px",
        height: "25px"
      };
      let symbolWait = {
        type: "picture-marker",
        url: 'static/img/wb_医院.png',
        width: "25px",
        height: "25px"
      };
      this.axios.get("http://120.27.240.160:3000/getreqposition").then(res=>{
        res.data.forEach((value,index)=>{
          var lng = parseFloat(value['longitude']);
          var lat = parseFloat(value['latitude']);
          let pt = new this.Point({
            latitude: lat,
            longitude: lng
          });
          var graphicsr = new this.Graphic(pt);

          if(value['state']==0){
            graphicsr.symbol=symbolWait;
            this.reqPoint.graphics.add(graphicsr);
          }else if(value['state']==1){
            graphicsr.symbol=symbolSuccess;
            this.finishedPoint.graphics.add(graphicsr);
          }else{
            graphicsr.symbol=symboling;
            this.ingPoint.graphics.add(graphicsr);
          }
        })
      })
    },
    adminChartShow(){
      this.chartShow=!this.chartShow;
      this.personManageShow = false;
      this.messageAdminShow = false;
    },
    analysis3D(){
      if(!this.Is3DHeatFlag){
        this.Is3DHeatFlag=true;
        this.Is3DHeatMapShow=true;
        let obj = {
          view: this.view,
          config: this.heatMapConfig
        };
        var heatmap = new this.HeatLayer(obj);
        this.heatmap = heatmap;
        this.heatMapLoad();
      }
      else{
        if(this.Is3DHeatMapShow){
          this.Is3DHeatMapShow=!this.Is3DHeatMapShow;
          this.heatmap.clearCanvas();
          this.heatmap.visible=false;

        }
        else {
          this.Is3DHeatMapShow = !this.Is3DHeatMapShow;
          this.heatMapLoad();
          this.heatmap.visible=true;
        }
      }

    },
    closeCharts(){
      this.chartShow = false;
    },
  }
}
</script>

<style scoped>
#reqMap{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /*background-color: #2e6da4;*/
}
/* #ca{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

} */

/*右侧请求列表样式*/
#reqList{
  position: absolute;
  right: 10px;
  top: 1%;
  width: 350px;
  height: 98%;
  border: 1px solid white;
  background-color: rgb(11,42,49);
  opacity: 0.9;
}

#reqListTitle{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5.5%;
}
.el-menu-item{
  height: 50px !important;
  line-height: 50px !important;
  margin-left: 5px;
  font-weight: bolder;
  color: white;
}
#reflashButton{
  margin-top: 5px;
  margin-left: 0px;
  background-color: #5B55E6;
  color: white !important;
}

#listContent{
  position: absolute;
  left: 0;
  top: 5.6%;
  width: 100%;
  height: 94.6%;
  /*background-color: #00d8ff;*/
  overflow-y: auto;
}

/*个人详细申请介绍*/
#details{
  position: absolute;
  left: 10px;
  top: 300px;
  width: 600px;
  height: 400px;
  background-color: rgb(11,42,49);
  opacity: 0.9;
  /*border: solid 1px #98F5FF;*/
  /*border-radius: 10px;*/
}

#info{
  position: absolute;
  width: 100%;
  height: 40%;
  /*background-color: #00b09b;*/
  top: 0;
  left: 0;
}
#textInfo{
  position: absolute;
  top: 40%;
  width: 55%;
  /*background-color: #fba540;*/
  left:0;
  height: 60%;
}
#photoInfo{
  position: absolute;
  top: 40%;
  width: 45%;
  /*background-color: #3c763d;*/
  left:55%;
  height: 60%;
}

#iphoto{
  position: absolute;
  left: 0;
  top: 0;
  /*background-color: #2e6da4;*/
  width: 30%;
  height: 100%;
  border: solid white 2px;
  border-left: none;
}

#istate{
  position: absolute;
  left:30%;
  top: 0;
  width: 70%;
  height: 20%;
  line-height: 20px;
  /*background-color: red;*/
  font-weight: bolder;
  border-bottom: solid white 1px;
  color: white;
}
#iposition{
  position: absolute;
  left:30%;
  top: 20%;
  width: 70%;
  height: 20%;
  /*background-color: orange;*/
  line-height: 30px;
  font-weight: bolder;
  border-bottom: solid white 1px;
  color: white;
}
#iid{
  position: absolute;
  left:30%;
  top: 40%;
  width: 70%;
  height: 20%;
  /*background-color: yellow;*/
  line-height: 30px;
  font-weight: bolder;
  border-bottom: solid white 1px;
  color: white;
}
#itime{
  position: absolute;
  left:30%;
  top: 60%;
  width: 70%;
  height: 20%;
  /*background-color: green;*/
  line-height: 30px;
  font-weight: bolder;
  border-bottom: solid white 1px;
  color: white;
}
#iendtime{
  position: absolute;
  left:30%;
  top: 80%;
  width: 70%;
  height: 20%;
  /*background-color: purple;*/
  line-height: 30px;
  font-weight: bolder;
  border-bottom: solid white 1px;
  color: white;
}
#ava{
  width: 100%;
  height: 60%;
  border: solid 0px black;
  border-radius: 50%;
}
#iname{
  position: absolute;
  border-bottom: solid white 1px;
  color: white;
  left: 0;
  top: 60%;
  width: 30%;
  height: 20%;
  text-align: center;
  color: white !important;
}
#iphone{
  position: absolute;
  left: 0;
  top: 80%;
  width: 30%;
  height: 20%;
  text-align: center;
  color: white !important;;
}
#itext{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: white !important;;
  font-size: 20px;
  line-height: 20px;
  overflow-x: hidden;
  overflow-y: auto;
}

#iimage{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: auto;
  border: #00b09b solid 2px;
}
.detailImg{
  width: 100%;
  height:100%;
}
.detailAni-enter-active {transition: all 0.5s ease;}
.detailAni-leave-active{transition: all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
.detailAni-enter,.detailAni-leave-to{transform: translateX(-64px);opacity: 0;}
#closeBtn{
  position: absolute;
  width: 10px;
  height: 8%;
  top: -5px;
  right: 30px;
  /*background-color: #00b09b;*/
  z-index: 999;
  text-align: center;
}
.cBtn{
  font-size: 20px;
  width: 10px;
  height: 100%;
  text-align: center;
  border: none !important;
  border-radius: 0;
  background-color: transparent !important;
  color: white;
}
.cBtn:hover{
  color: skyblue !important;
}

/*负责人列表*/
#handleReq{
  position: absolute;
  left: 10px;
  top: 250px;
  width: 400px;
  height: 600px;
  background-color: #00b09b;
  z-index: 999;
  background-color: rgb(24,51,54);
  opacity: 0.9;
  border: solid 2px #81b0df;
}
#selectBox{
  position: absolute;
  height: 15%;
  width: 100%;
  top: 2px;
  left: 2px;
  border-bottom: 2px white solid;
}
#selectDesc{
  position: absolute;
  top: 0;
  left: 30%;
  color: rgb(49,177,177);
  background-color: rgb(91,85,230);
  width: 40%;
  height: 40%;
  font-weight: bolder;
  font-size: 20px;
  text-align: center;
  border: 0px solid #fba540;
  border-radius: 2px;
}
#elSelect{
  position: absolute;
  top: 43%;
  width: 100%;
  height: 60%;
  left: 23%;
  overflow-y: auto;
  overflow-x: auto;
}
#chargePeopleList{
  position: absolute;
  left: 0;
  top: 15%;
  width: 100%;
  height: 85%;
  /*background-color: #9a6e3a;*/
}
.tbody{
  background-color:  rgb(24,51,54) !important;
}
/*图层列表样式*/
#layerSwitch{
  position: absolute;
  /*right: 370px;*/
  bottom: 20px;
  left: 10px;
  width: 150px;
  /*height: 200px;*/
  background-color: rgb(24,51,54);
  opacity: 0.9;
  height: 200px;
  border-radius: 20% 0% 20% 0%;
}
.switch1{
  margin-bottom: 8px;
  height: 50px;
  font-size: 50px;
  margin-left: 12px;
  /*text-align: center;*/
  font-weight: bolder !important;
}
#closeBtn2{
  position: absolute;
  top: 0px;
  right: 0;
  /*width: 20px;*/
  /*height: 20px;*/
  background-color: #2e6da4;
}
.closeBtn2{
  z-index: 9999;
  color: white !important;
}
/*功能列表定位*/
#function{
  position: absolute;
  left: 50px;
  top:10px;
  width: 30%;
  height: 200px;
  background-color: rgb(11,42,49);
  opacity: 0.9;
  border-radius: 3px;
}

/*设置图表位置*/
#acharts{
  position: absolute;
  left: 5%;
  width: 70%;
  top: 25%;
  height: 70%;
}
/*人事管理界面定位*/
#personManageContainer{
  position: absolute;
  left: 5%;
  width: 70%;
  top: 25%;
  height: 70%;
}
/*舆情分析位置*/
#messageAdminContainer{
  position: absolute;
  left: 5%;
  width: 70%;
  top: 25%;
  height: 70%;
}
#adminAreaContainer{
  position: absolute;
  right: 20%;
  top: 10px;
  font-size: 40px;
  /*background-color: #528B8B;*/
  opacity: 0.9;
  color: #7FFFD4;
  /*border: solid 2px white;*/
}
#adminAreaContainer>span{
  color: white;
  font-size: 20px;
}
#threeDContainer {
  position: absolute;
  top: 20%;
  left: 0;
  background-color: #8c8c8c;
  width: 200px;
  height: 200px;
}
</style>
