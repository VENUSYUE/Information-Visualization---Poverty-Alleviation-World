<template>
  <!-- 地图主体
  包括：
  测边栏 和地图
   -->

  <div id="mapShow-body" @mouseup="sliderFixed"  ondragstart="return false;" oncontextmenu="return false;" @mousemove="showSidebar">
    <!-- 加载等待div loading... -->
      <div id="Loading" v-show="isLoading">
        <div id="threeBalls">
          <div class="loader-inner ball-beat">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    <!-- 地图容器 -->
        <div id="viewDiv" v-show="Is2DShow">
        </div>
        <div id="view3DDiv" v-show="!Is2DShow">
        </div>


    <!--标签关闭按钮-->
    <div id="labelTextContainer" v-show="legendShow && btnShow && !anaShow" ref="closeLegendChild">
      <span>图例</span>
      <el-button class="closeLegendBtn" size="mini" icon="el-icon-close" @click="closeLegend"></el-button>
    </div>

    <!--标签容器-->
    <div id="infoDiv" class="esri-widget">
      <div id="legendDiv"></div>
    </div>
    <!--标签开启按钮-->
    <div id="openLegendBtnContainer" v-show="!legendShow && btnShow && !anaShow" @click="openLegend" title="打开标签">
      <div id="forPosition"><el-button class="iconfont closeLegendIcon" size='mini'>&#xe610;</el-button></div>
    </div>

    <!--图标-->
    <div id="iconContainer">
      <img src="static/img/icon.png" id="systemIcon">
      <span class="iconText">扶贫视界</span>
    </div>

    <!--侧边栏提示-->
    <transition name="sidebarTipAni">
      <div id="sidebarTip" v-show="sidebarTipShow">
        <div id="tipImgContainer">
          <img src="static/img/右箭头.png" class="tipImg">
        </div>
      </div>
    </transition>

    <!--侧边栏-->
    <transition name="sideBarAni">
      <div id="sidebar" v-show="sidebarShow">
        <el-col :span="24">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#928dab"
            :collapse="true"
            @select="selectEvent"
            id="elMenu"
          >

            <el-menu-item index="4">
              <i class="el-icon-search"></i>
              <span slot="title">搜索</span>
            </el-menu-item>

            <!--设置一级导航栏标题与icon-->
            <el-submenu index="1" class="first-item" :unique-opened="true">
              <template slot="title">
                <i class="iconfont">&#xe6b6;</i>
                <span>减贫地图</span>
              </template>

              <!-- 设置子项 -->
              <el-menu-item index="1-2">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp贫&nbsp&nbsp困&nbsp&nbsp聚&nbsp&nbsp合&nbsp&nbsp图</el-menu-item>
              <el-menu-item index="1-3">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp贫&nbsp&nbsp困&nbsp&nbsp热&nbsp&nbsp力&nbsp&nbsp图</el-menu-item>
              <el-menu-item index="1-4">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp贫&nbsp&nbsp困&nbsp&nbsp渐&nbsp&nbsp隐&nbsp&nbsp图</el-menu-item>
              <el-menu-item index="1-5">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp分&nbsp&nbsp散&nbsp&nbsp萤&nbsp&nbsp火&nbsp&nbsp图 </el-menu-item>
              <el-menu-item index="1-6">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp帮&nbsp&nbsp扶&nbsp&nbsp轨&nbsp&nbsp迹&nbsp&nbsp图</el-menu-item>
            </el-submenu>


            <!--设置二级导航栏标题与icon-->
            <el-submenu index="2">
              <template slot="title">
                <i class="iconfont">&#xe709;</i>
                <span>减贫分析</span>
              </template>

              <!--加上子选项-->
              <el-menu-item index="2-1">&nbsp&nbsp&nbsp&nbsp&nbsp贫&nbsp&nbsp困&nbsp&nbsp时&nbsp&nbsp空&nbsp&nbsp分&nbsp&nbsp析</el-menu-item>
              <!--加上子选项-->
              <el-menu-item index="2-2">&nbsp&nbsp&nbsp&nbsp&nbsp对&nbsp&nbsp比&nbsp&nbsp图&nbsp&nbsp表&nbsp&nbsp分&nbsp&nbsp析</el-menu-item>
              <!--加上子选项-->
              <el-menu-item index="2-3">&nbsp&nbsp&nbsp&nbsp&nbsp三&nbsp&nbsp维&nbsp&nbsp区&nbsp&nbsp域&nbsp&nbsp分&nbsp&nbsp析</el-menu-item>
            </el-submenu>

            <!--设置三级导航栏标题与icon-->
            <el-menu-item index="5">
              <i class="iconfont">&#xe639;</i>
              <span slot="title">地图导出</span>
            </el-menu-item>

            <!--设置四级导航栏标题与icon-->
            <!-- <el-menu-item index="6">
              <i class="el-icon-s-custom"></i>
              <span slot="title">防返贫系统</span>
            </el-menu-item> -->
          </el-menu>
        </el-col>
      </div>
      </transition>

    <!--时间与剩余贫困县-->
    <div v-show="timeAndPoorShow" id="timeAndNum">
      <div id="timeChange">
        {{startTime}}
      </div>
      <div id="numChange">
        <div id="currentNumt"><a id="provinceGoToA" :href="targetUrl" target="_blank">{{currentArea}}</a>剩余</div>
        {{currentNum}}
        <div id="currentNumb">个贫困县</div>
      </div>
    </div>

        <!--charts图表-->
    <transition name="allCharts">
        <div id="charts" v-show="isChartShow">
          <div id="chartTitle">
            实时图表更新
          </div>
          <div id="numChart">
          </div>
          <div id="GDPChart">

          </div>
          <div id="poorChart">

          </div>
        </div>
    </transition>

      <!--时间轴-->
     <timeAxis :changeArea='changeArea' :updateTime='updateTime' :changeNoSee='changeNoSee' :changeHeatmap="changeHeatmap" :updateNumChart="updateNumChart"  ref="timeChild" v-show="isTimeShow"></timeAxis>

    <!--返回主界面按钮-->
    <div id="backSystem" @click="back" v-show="isS">
        <span class="span1"></span>
        <span class="span2"></span>
        <span class="span3"></span>
        <span class="span4"></span>
        返回主界面
    </div>

    <!--各省现有贫困县列表-->
    <div id="proPoorTitle" v-show="isPoorShow">点击下表查看贫困县详细信息</div>
    <transition name="poorShowtrans">
      <div id="proPoor" v-show="isPoorShow">
        <div id="proPoorContent">
          <li v-for="(item,index) in currentPoor" :key="index" class="poorLi" :style="{color:currentColor[index]}" @click="poorCountryS(index)">{{item}}</li>
        </div>
      </div>
    </transition>


    <!--贫困县展示div-->
    <!--贫困县简介-->
    <transition name="poorCountryAni">
      <div id="poorCountryShow" v-show="isPoorCountryShow">
        <el-button type="danger" icon="el-icon-close" size="mini" @click="changePoorCountryShow()" class="closeButton"></el-button>
        <div id="poorShowBook">
          <!--贫困县名称-->
          <div id="poorShowBookName">
            {{currentPoorCountry.name}}
          </div>
          <!--贫困县脱贫日期-->
          <div id="poorShowBookDate">
            {{"脱贫日期:"+currentPoorCountry.date}}
          </div>
          <!--贫困县地理位置-->
          <div id="poorShowBookPosition">
            <div id="longitude">{{"经度:"+currentPoorCountry.position.longitude}}</div>
            <div id="latitude">{{"纬度:"+currentPoorCountry.position.latitude}}</div>
          </div>
          <!--贫困县官网-->
          <div id="poorShowBookOffice">
            <a :href="currentPoorCountry.office" target="_blank">{{currentPoorCountry.name+'人民政府官网'}}</a>
          </div>
          <!--贫困简介-->
          <div id="poorShowBookIntro">
           <span id="jianjieSpan">简介:</span> {{currentPoorCountry.intro}}
          </div>
        </div>

        <!--贫困县展示地图-->
        <div id="poorShowMap">
          <div id="poorShowMapTitle">
            <span class="todayAndBefore">今昔对比</span>
            <el-button id="layerBtn" :class="btnsColorClassArr[0]" @click="layerShow">图层</el-button>
            <el-button id="stateBtn" :class="btnsColorClassArr[1]" @click="mapBodyShow">卫星图</el-button>
            <el-button id="PhotoBtn" :class="btnsColorClassArr[2]" @click="photoShow">照片</el-button>
          </div>
          <div id="poorShowMapBody" v-show="isMapShow">
          </div>
          <div id="poorShowPhotoBody" v-show="isPhotoShow" @mouseup="sliderFixed">

            <div id="sliderContainer" >
              <div id="sliderBtn" @mousedown="sliderMove" @mouseup="sliderFixed"></div>
            </div>

            <div id="bIContatiner"><img id="beforeImg"></div>
            <div id="nIContatiner"><img id="nowImg"></div>
          </div>
        </div>

        <!--贫困县展示图表-->
        <div id="poorShowCharts">
          <div id="poorCountryPChart"></div>
          <div id="wordCloud"></div>
          <div id="poorCountryMChart"></div>
        </div>
        <div></div>
      </div>
      </transition>

<!--    v-model="state2"-->
<!--    :fetch-suggestions="querySearch"-->
<!--    @select="handleSelect"-->
  <!--过滤器-->
    <transition name="filterAni">
    <div id="filter" v-show="filterShow">
      <div id="cascader">
      <el-cascader
        :options="filterOptions"
        :props="props"
        collapse-tags
        placeholder="选择过滤关键词"
        clearable
        @change="changePoint">
      </el-cascader>
      </div>
      <div id="filterMid"></div>
      <div id="autocomplete">
      <el-autocomplete
        v-model="filterModel"
        class="inline-input"
        placeholder="搜县名、搜特点"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        @select="goToPoor"
      >
      </el-autocomplete>
      </div>
    </div>
      </transition>

  <!--实时新闻-->
    <div id="currrentNews" v-show="isCurrrentNewsShow">
      <span class="curS1"></span>
      <span class="curS2"></span>
      <transition name="newsShow">
        <div id="CurNewsCon" v-show="isNewsShow">🔈{{dataNews[currentNewsIndex].date}},{{dataNews[currentNewsIndex].content}}</div>
      </transition>
      <div id="newsBtn">
        <button class="arrowsLeft"  @click="newsIndexSub"><</button>
        <button class="bn-arrows-right" @click="newsIndexAdd">></button>
      </div>
    </div>

    <!-- 分析模块-2-1全国尺度空间分析 -->
        <transition name="contrastWindowOne">
        <div id="spatialAnalyst" v-show="isChartShowTwoOne">
          <div id="spatialAnalystLabel">
          <el-tabs type="border-card" v-model="spatialAnalystMode" @tab-click="handlespatialAnalystClick">
            <el-tab-pane label="标准差椭圆" name="1">
              <div>
                <el-checkbox-group v-model="spatialYearList_1" @change="handleCheckedYearsChange_1" >
                    <el-checkbox label="2015"></el-checkbox>
                    <el-checkbox label="2016"></el-checkbox>
                    <el-checkbox label="2017"></el-checkbox>
                    <el-checkbox label="2018"></el-checkbox>
                    <el-checkbox label="2019"></el-checkbox>
                  </el-checkbox-group>
              </div>
            </el-tab-pane>
            <el-tab-pane label="冷热点分析" name="2">
              <div>
                <el-radio-group v-model="spatialYear_2" @change="handleCheckedYearsChange_2">
                  <el-radio :label="2">2015</el-radio>
                  <el-radio :label="4">2016</el-radio>
                  <el-radio :label="6">2017</el-radio>
                  <el-radio :label="8">2018</el-radio>
                  <el-radio :label="10">2019</el-radio>
                </el-radio-group>

                <div class="SpotClusterTarget">
                  <el-select v-model="spotClusterTarget" placeholder="请选择分析指标" @change="handleSpotClusterTarget">
                    <el-option
                      v-for="item in spotClusterTargetOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="聚类与离群分析" name="3">
              <div>
                <el-radio-group v-model="spatialYear_3" @change="handleCheckedYearsChange_3">
                  <el-radio :label="3">2015</el-radio>
                  <el-radio :label="6">2016</el-radio>
                  <el-radio :label="9">2017</el-radio>
                  <el-radio :label="12">2018</el-radio>
                  <el-radio :label="15">2019</el-radio>
                </el-radio-group>
                <div class="SpotClusterTarget">
                  <el-select v-model="spotClusterTarget" placeholder="请选择分析指标" @change="handleSpotClusterTarget">
                    <el-option
                      v-for="item in spotClusterTargetOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </el-tab-pane>
            </el-tabs>
          </div>
        </div>
    </transition>

    <!-- 分析模块-2-2贫困县对比分析 -->
    <!-- 左侧贫困县选择div -->
    <transition name="contrastWindowTwo">
      <div id="contrastABC" v-show="iscontrastABCShow">
        <div id="uiABCLabel">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput" v-show="IsAddButtonShow">+ 输入或地图选择贫困县</el-button>
        </div>

          <div id="confirmContrast" @click="contrastResultShow">对 比 分 析</div>
      </div>
    </transition>
    <!-- 右侧对比图表 -->
    <transition name="allCharts">
        <div id="concharts" v-show="isChartShow2_2">
          <!-- <div id="chartTitle">
            贫困县对比分析
          </div> -->
          <div id="autoTimeChart"></div>
          <div id="barLineChart"></div>
          <div id="radarChart"></div>
        </div>
    </transition>

    <!-- 分析模块-2-3划区分析 -->
    <!-- 左侧区域选择div -->
    <transition name="contrastWindowThree">
        <div id="Area3D"  v-show="isArea3DShow">
          <div id="areaModeDiv">
            <el-select v-model="areaMode" placeholder="请选择划区分析方式" @change="handleAreaModeDiv">
              <el-option
                v-for="item in areaModeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div id="provinceAreaDiv" v-show="IsProvinceDivShow">
            <el-row class="demo-autocomplete">
              <el-col :span="12">
                <!-- <div class="sub-title">激活即列出输入建议</div> -->
                <el-autocomplete
                  class="inline-input"
                  v-model="provinceAreaName"
                  :fetch-suggestions="querySearch_provinceArea"
                  placeholder="请输入省份名称"
                  @select="handleSelect_provinceArea"
                ></el-autocomplete>
              </el-col>
            </el-row>
          </div>
          <div id="connectAreaDiv" v-show="IsConnectDivShow">
            <el-row class="demo-autocomplete">
              <el-col :span="12">
                <!-- <div class="sub-title">激活即列出输入建议</div> -->
                <el-autocomplete
                  class="inline-input"
                  v-model="connectAreaName"
                  :fetch-suggestions="querySearch_connectArea"
                  placeholder="请输入贫困县连片区名称"
                  @select="handleSelect_connectArea"
                ></el-autocomplete>
              </el-col>
            </el-row>
          </div>
        </div>
    </transition>
    </transition> -->
    <!-- 左侧三维柱状图 -->
    <transition name="Area3DWindow">
      <div id="time3DContainer" v-show="isChartShow2_3_down">
            <!-- 3D时间分析 -->
      <div id="time3DChart" style="width: 500px;height:400px;"></div>
      </div>
    </transition>
    <!-- 右侧二维鹰眼地图 -->
    <div id="sliderTitle" v-show="isGDPTitleShow">人均GDP(元)</div>
    <transition name="allCharts">
        <div id="GDP3Dcharts" v-show="isChartShow2_3_up">
          <div></div>
          <!-- <div id="chartTitle">
            贫困县区域分析
          </div> -->
          <!-- 3DGDP拉伸 -->

            <!-- 鹰眼地图 -->
           <div id="eagleEyeDiv">
            </div>
            <!-- <div id="containerDiv" style="width:50px;height:100px;margin-top:180px;left:-50px;background-color:rgba(220,38,38,0);opacity: 60%;"> -->
          <div id="containerDiv" >

            <div id="slider">

            </div>
            <!-- style="margin-top:420px;" -->
          </div>
        </div>
    </transition>
    <div id="23Dtemp"></div>
    <transition name="yearSelectionWindow">
      <div id="yearSelectionDiv" v-show="isYearSliderShow">
        <div id="yearSelection" style="width: 700px;height: 100px;margin-top:25px;margin-bottom:50px;margin-left:100px;">
          <!-- <span class="demonstration">选择年份</span> -->
          <el-slider
            v-model="yearSlidervalue"
            :step="5"
            :min="0"
            :max="20"
            :marks="yearmarks"
            :show-tooltip="false"
            @change="changeYear3D"
            show-stops>
          </el-slider>
        </div>
      </div>
     </transition>
  </div>
</template>

<script>
  import {loadModules} from 'esri-loader';
  import timeAxis from './timeAxis.vue';
  import "echarts-wordcloud/dist/echarts-wordcloud";
  import "echarts-wordcloud/dist/echarts-wordcloud.min";

  export default{
        name: 'viewDiv',
        components:{
          timeAxis,
        },
        methods: {

          //创建地图
          _createMapView: function () {
            const _self = this;   //定义一个_self防止后续操作中this丢失
            const option = {      //定义一个包含有JS API中js开发包和css样式文件的对象
              url: 'https://js.arcgis.com/4.18/',
              css: "https://js.arcgis.com/4.18/esri/themes/light/main.css"
            };

            //通过loadModules来做衔接
            loadModules(["esri/config", "esri/WebMap", "esri/Map",
              "esri/Basemap",
              "esri/layers/MapImageLayer",
              "esri/views/MapView",
              "esri/views/SceneView",
              "esri/layers/FeatureLayer",
              "esri/widgets/Compass",
              "esri/widgets/ScaleBar",
              "esri/widgets/Bookmarks",
              "dojo/dom",
              "esri/widgets/Search",
              "esri/widgets/Expand",
              "esri/widgets/BasemapGallery",
              "esri/layers/GraphicsLayer",
              "esri/widgets/Sketch",
              "esri/widgets/BasemapToggle",
              "esri/widgets/DistanceMeasurement2D",
              "esri/widgets/AreaMeasurement2D",
              "esri/widgets/Locate",
              "esri/widgets/LayerList",
              "esri/widgets/CoordinateConversion",
              "esri/layers/support/LabelClass",
              "dojo/_base/Color",
              "esri/symbols/Font",
              "esri/symbols/TextSymbol",
              "dojo/on",
              "esri/renderers/Renderer",
              "esri/renderers/ClassBreaksRenderer",
              "esri/widgets/Legend",
              "esri/geometry/Point",
              "esri/widgets/Swipe",
              "esri/layers/TileLayer",
              "esri/geometry/geometryEngine",
              //画图查询
              "esri/tasks/QueryTask",
              "esri/tasks/support/Query",//属性查询
              "esri/symbols/SimpleLineSymbol",
              "esri/symbols/SimpleFillSymbol",
              "esri/Graphic",

              // "src/echartsLayer",迁徙图
              "dojo/_base/declare",
              "dojo/_base/lang",
              "esri/geometry/Point",
              "esri/geometry/SpatialReference",

              //3D可视化
              "esri/smartMapping/renderers/univariateColorSize",
              "esri/smartMapping/statistics/histogram",
              "esri/widgets/smartMapping/ColorSizeSlider",

              //打印地图
              "esri/tasks/support/PrintTemplate",
              "esri/tasks/PrintTask",
              "esri/tasks/support/PrintParameters",
              "dojo/domReady!"], option)
              .then(([esriConfig, WebMap, Map,Basemap,MapImageLayer, MapView,SceneView, FeatureLayer, Compass, ScaleBar, Bookmarks, dom, Search, Expand, BasemapGallery, GraphicsLayer, Sketch, BasemapToggle, DistanceMeasurement2D, AreaMeasurement2D, Locate, LayerList, CoordinateConversion, LabelClass, Color, Font, TextSymbol, on, Renderer, ClassBreaksRenderer,Legend, Point,Swipe,TileLayer,geometryEngine,QueryTask, Query, SimpleLineSymbol, SimpleFillSymbol,Graphic,
              declare, lang, n, SpatialReference,colorAndSizeRendererCreator,histogram,ColorSizeSlider,
              PrintTemplate,PrintTask,PrintParameters]) => {
                esriConfig.apiKey = "AAPKf36563646971486495a735ebc79605460PP-JogfopxIQxEW9cdNBRAYKlZVdvdzQhCtLCo4qsJ3TqjCa-dF-Pc25egARMZ4";
                this.legend = Legend;
                this.Point = Point;
                this.Map = Map;
                this.MapView = MapView;
                this.SceneView=SceneView;
                this.Swipe = Swipe;
                this.FeatureLayer = FeatureLayer;
                this.TileLayer = TileLayer;
                this.GraphicsLayer = GraphicsLayer;
                this.Graphic=Graphic;
                this.colorAndSizeRendererCreator=colorAndSizeRendererCreator;
                this.histogram=histogram;
                this.ColorSizeSlider=ColorSizeSlider;
                var activeWidget = null;
               // var graphicsLayer = new GraphicsLayer();
                this.ClassBreaksRenderer = ClassBreaksRenderer;

                // 迁徙图图层类定义
                this.echartsLayer=declare("EchartsLayer", null, {
                            name: "EchartsLayer",
                            view: null,
                            box: null,
                            chart: null,
                            chartOption: null,
                            visible: true,
                            constructor: function(view, option) {
                                //注册一个坐标系arcgis
                                _self.$echarts.registerCoordinateSystem('arcgis', this.getE3CoordinateSystem(view));
                                this.init(view, option);
                            },
                            init: function(view, option) {
                                this.setBaseMap(view);
                                this.createLayer();
                                //this.setChartOption(option);
                            },
                            setBaseMap: function(view) {
                                this.view = view;
                            },
                            setChartOption: function(option) {
                                this.chartOption = option;
                                this.setCharts();
                            },
                            setVisible: function(bool) {
                                if (!this.box || this.visible === bool) return;
                                this.box.hidden = !bool;
                                this.visible = bool;
                                bool === true && setCharts();
                            },
                            refreshBegin: function() {
                                this.box.hidden = true;
                            },
                            refreshing: function() {
                                setCharts();
                            },
                            refreshEnd: function() {
                                this.box.hidden = false;
                            },
                            on: function(eventName, handler, context) {
                                this.chart.on(eventName, handler, context);
                            },
                            off: function(eventName, handler, context) {
                                this.chart.off(eventName, handler, context);
                            },
                            map_DragStart_Listener: null,
                            map_DragEnd_Listener: null,
                            map_ZoomStart_Listener: null,
                            map_ZoomEnd_Listener: null,
                            map_ExtentChange_Listener: null,
                            map_click_Listener: null,
                            setCharts: function() {
                                if (!this.visible) return;
                                if (this.chartOption == null || this.chartOption == 'undefined') return;
                                let baseExtent = _self.view.extent;
                                //判断是否使用了mark类型标签，每次重绘要重新转换地理坐标到屏幕坐标
                                //根据地图extent,重绘echarts
                                this.chartOption.xAxis = { show: false, min: baseExtent.xmin, max: baseExtent.xmax };
                                this.chartOption.yAxis = { show: false, min: baseExtent.ymin, max: baseExtent.ymax };
                                this.chart.setOption(this.chartOption);
                                this.chartOption.animation = false;
                            },
                            /*创建layer的容器，添加到map的layers下面*/
                            createLayer: function() {
                                let box = this.box = document.createElement("div");
                                box.setAttribute("id", "testData")
                                box.setAttribute("name", "testData")
                                box.style.width = this.view.width + 'px';
                                box.style.height = this.view.height + 'px';
                                box.style.position = "absolute";
                                box.style.top = 0;
                                box.style.left = 0;
                                let parent = document.getElementsByClassName("esri-view-surface")[0];
                                parent.appendChild(box);
                                this.chart = _self.$echarts.init(box);
                                //this.setCharts();
                                this.startMapEventListeners();
                            },
                            /*销毁实例*/
                            removeLayer: function() {
                                this.box.outerHTML = "";
                                this.visible=false;
                                this.view = null;
                                this.box = null;
                                this.originLyr = null;
                                this.features = null;
                                this.screenData = [];
                                this.chart = null;
                                this.chartOption = null;
                                // this.map_DragStart_Listener.remove();
                                // this.map_DragEnd_Listener.remove();
                                // this.map_ZoomStart_Listener.remove();
                                // this.map_ZoomEnd_Listener.remove();
                                // this.map_ExtentChange_Listener.remove();
                            },
                            /*监听地图事件，根据图层是否显示，判断是否重绘echarts*/
                            startMapEventListeners: function() {
                                let view = this.view;
                                view.watch("extent", lang.hitch(this, function() {
                                    if (!this.visible) return;
                                    this.setCharts();
                                    this.chart.resize();
                                    this.box.hidden = false;
                                }));
                                view.watch("rotation", lang.hitch(this, function() {
                                    if (!this.visible) return;
                                    this.setCharts();
                                    this.chart.resize();
                                    this.box.hidden = false;
                                }));

                            },
                            getE3CoordinateSystem: function(map) {
                                var CoordSystem = function CoordSystem(map) {
                                    this.map = map;
                                    this._mapOffset = [0, 0];
                                };
                                CoordSystem.create = function(ecModel) {
                                    ecModel.eachSeries(function(seriesModel) {
                                        if (seriesModel.get('coordinateSystem') === 'arcgis') {
                                            seriesModel.coordinateSystem = new CoordSystem(map);
                                        }
                                    });
                                };
                                CoordSystem.getDimensionsInfo = function() {
                                    return ['x', 'y'];
                                };
                                CoordSystem.dimensions = ['x', 'y'];
                                CoordSystem.prototype.dimensions = ['x', 'y'];
                                CoordSystem.prototype.setMapOffset = function setMapOffset(mapOffset) {
                                    this._mapOffset = mapOffset;
                                }
                                CoordSystem.prototype.dataToPoint = function dataToPoint(data) {
                                    var point = {
                                        type: "point",
                                        x: data[0],
                                        y: data[1],
                                        spatialReference: new SpatialReference(4326)
                                    };
                                    var px = map.toScreen(point);
                                    var mapOffset = this._mapOffset;
                                    return [px.x - mapOffset[0], px.y - mapOffset[1]];
                                }
                                CoordSystem.prototype.pointToData = function pointToData(pt) {
                                    var mapOffset = this._mapOffset;
                                    var screentPoint = {
                                        x: pt[0] + mapOffset[0],
                                        y: pt[1] + mapOffset[1]
                                    };
                                    var data = map.toMap(screentPoint);
                                    return [data.x, data.y];
                                };
                                CoordSystem.prototype.getViewRect = function getViewRect() {
                                    return new graphic.BoundingRect(0, 0, this.map.width, this.map.height);
                                };
                                CoordSystem.prototype.getRoamTransform = function getRoamTransform() {
                                    return matrix.create();
                                };
                                return CoordSystem
                            }
                        });

                let webmap = new WebMap({
                  portalItem: {
                    id: "f6d8940c761b4396bf5774275b2a409c"
                  }
                });
                this.webmap = webmap;
                this.graphicsLayer_ = 1;

                var view = new MapView({
                  container: "viewDiv",
                  map: webmap,
                  center: [116.3, 32],
                  zoom: 4
                });
                this.testView = view;
                this.testExent = view.extent;

                let basemap = new Basemap({
                  baseLayers: [
                    new MapImageLayer({
                      url: "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer?f=jsapi",
                      title: "Basemap"
                    })
                  ],
                  title: "basemap",
                  id: "basemap"
                });
                // 定义三维地图
                let map3D=new Map({
                  basemap: basemap
                });
                this.map3D=map3D;
                let view3D = new SceneView({ //2D
                      container: "view3DDiv",
                      map: map3D,
                      camera: {
                      tilt: 52,
                      heading: 355.8,
                      position: {
                          x: 120.36,
                          y: 35.9,
                          z: 822291,
                      }
                  }
                  });
                this.view3D=view3D;
                var eagleview = new MapView({
                  container: "eagleEyeDiv",
                  map: webmap,
                  center: [116.3, 32],
                  zoom: 4
                });
                this.eagleview=eagleview;

                //实例化迁徙图类对象
                let autoLinecChart = new this.echartsLayer(this.testView,this.$echarts);
                this.autoLinecChart=autoLinecChart;

                setInterval(() => {
                  if (this.testView.zoom <= 2.0) {
                    this.testView.zoom = 3;
                  }
                }, 1);

                //空间分析标准差椭圆图层
                let meanCenter=new FeatureLayer({
                  url:"https://services3.arcgis.com/XDzy9VWpT2sZyZqz/arcgis/rest/services/MeanCenter/FeatureServer/0"
                });
                let standardEllipse=new FeatureLayer({
                  url:"https://services3.arcgis.com/XDzy9VWpT2sZyZqz/arcgis/rest/services/StandardDeviationalEllipse/FeatureServer/0"
                });

                let HotSpotGZ=new FeatureLayer({
                  url:"https://services3.arcgis.com/XDzy9VWpT2sZyZqz/arcgis/rest/services/HotSpotGZ/FeatureServer/0"
                });

                let ClusterGZ=new FeatureLayer({
                  url:"https://services3.arcgis.com/XDzy9VWpT2sZyZqz/arcgis/rest/services/ClusterGZ/FeatureServer/0"
                });

                //空间分析图层渲染
                 function createFillSymbolE(value, color,type) {
                    return {
                      "value": value,
                      "symbol": {
                        "color": color,
                        "type": "simple-fill",
                        "style": type,
                        "outline": {
                          "width": 1,
                          "color":color,
                        }
                      },
                      "label": value
                    };
                  }
                  function createFillSymbolC(value, color,type) {
                    return {
                      "value": value,
                      "symbol": {
                        "color": color,
                        "type": "simple-marker",
                        // "style": type,
                        "size":"12px",
                      },
                      "label": value
                    };
                  }
                var openSpacesRendererE = {
                  type: "unique-value",
                  field: "年份",
                  uniqueValueInfos: [
                    createFillSymbolE("2015", "#fff","none"),
                    createFillSymbolE("2016", "#9E559C","none"),
                    createFillSymbolE("2017", "#A7C636","none"),
                    createFillSymbolE("2018", "#149ECE","none"),
                    createFillSymbolE("2019", "#ED5151","none")
                  ]
                };
                var openSpacesRendererC = {
                  type: "unique-value",
                  field: "Id",
                  uniqueValueInfos: [
                    createFillSymbolC("2015", "#fff","solid"),
                    createFillSymbolC("2016", "#9E559C","solid"),
                    createFillSymbolC("2017", "#A7C636","solid"),
                    createFillSymbolC("2018", "#149ECE","solid"),
                    createFillSymbolC("2019", "#ED5151","solid")
                  ]
                };
                var hotSpotSymbol = [];
                hotSpotSymbol.push({
                  type: "simple-marker",
                  size:11,
                  color:"rgb(69,117,181)",
                });
                hotSpotSymbol.push({
                  type: "simple-marker",
                  size:9,
                  color:"rgb(132,158,186)",
                });
                hotSpotSymbol.push({
                  type: "simple-marker",
                  size:7,
                  color:"rgb(192,204,190)",
                })
                hotSpotSymbol.push({
                  type: "simple-marker",
                  size:6,
                  color:"rgb(255,255,191)",
                });
                hotSpotSymbol.push({
                  type: "simple-marker",
                  size:7,
                  color:"rgb(250,185,132)",
                });
                hotSpotSymbol.push({
                  type: "simple-marker",
                  size:9,
                  color:"rgb(237,117,81)",
                });
                hotSpotSymbol.push({
                  type: "simple-marker",
                  size:11,
                  color:"rgb(214,47,39)",
                });
                this.hotSpotSymbol=hotSpotSymbol;

                var clusterSymbol = [];
                clusterSymbol.push({
                  type: "simple-marker",
                  size:11,
                  color:"rgb(27,80,224)",
                });
                clusterSymbol.push({
                  type: "simple-marker",
                  size:11,
                  color:"rgb(153,208,232)",
                });
                clusterSymbol.push({
                  type: "simple-marker",
                  size:8,
                  color:"rgb(247,247,242)",
                })
                clusterSymbol.push({
                  type: "simple-marker",
                  size:11,
                  color:"rgb(224,27,27)",
                });
                clusterSymbol.push({
                  type: "simple-marker",
                  size:11,
                  color:"rgb(240,171,144)",
                });
                this.clusterSymbol=clusterSymbol;

                this.standardEllipse=standardEllipse;
                this.meanCenter=meanCenter;
                this.standardEllipse.renderer = openSpacesRendererE;
                this.meanCenter.renderer = openSpacesRendererC;
                this.ClusterGZ=ClusterGZ;
                this.HotSpotGZ=HotSpotGZ;

                //设置图例
                let legendE = new this.legend({
                  view: this.testView,
                  layerInfos: [{
                    title: " ",
                    layer: this.standardEllipse,
                  }]
                });
                this.legendE = legendE;
                let legendHotSpot = new this.legend({
                  view: this.testView,
                  layerInfos: [{
                    title: " ",
                    layer: this.HotSpotGZ,
                  }]
                });
                this.legendHotSpot = legendHotSpot;
                let legendCluster = new this.legend({
                  view: this.testView,
                  layerInfos: [{
                    title: " ",
                    layer: this.ClusterGZ,
                  }]
                });
                this.legendCluster = legendCluster;

                var fields = [{
                      name: "ObjectID",
                      alias: "ObjectID",
                      type: "oid" //   每个要素必须的字段，字段值必须唯一，当做是整数类型
                  }, {
                      name: "name",
                      alias: "name",
                      type: "string" //字符串类型
                  }, {
                      name: "time",
                      alias: "time",
                      type: "double" //字符串类型
                  }];

                //对比分析贫困县ABC点图层
                let abcSelectionPointLayer = new FeatureLayer({
                    fields: fields
                });
                this.abcSelectionPointLayer=abcSelectionPointLayer;
                //对比分析贫困县ABC连线图层
                let abcSelectionLineLayer = new FeatureLayer({
                    fields: fields
                });
                this.abcSelectionLineLayer=abcSelectionLineLayer;
                //画多边形选中点shp
                let areaSelectionLayer = new FeatureLayer({
                    // url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/IncidentsReport/FeatureServer/0",
                    // url: "https://services3.arcgis.com/XDzy9VWpT2sZyZqz/arcgis/rest/services/kernelDensityLayer/FeatureServer/0",
                    // spatialReference: map.spatialReference,
                    fields: fields
                });
                this.areaSelectionLayer=areaSelectionLayer;
                //画多边形选中点shp
                let areaSelection3DLayer = new FeatureLayer({
                    fields: fields
                });
                this.areaSelection3DLayer=areaSelection3DLayer;

                //实例化一个图形图层
                let figureLayer = new GraphicsLayer({
                    // spatialReference: map.spatialReference,
                });
                // webmap.add(figureLayer);
                this.figureLayer=figureLayer;

                //sketch控件
                const sketch = new Sketch({
                    layer: figureLayer,
                    view: eagleview,
                    creationMode: "update"
                });
                sketch.visibleElements = {
                  createTools: {
                    point: false,
                    polyline: false,
                  },
                  selectionTools:{
                    "lasso-selection": false
                  },
                  settingsMenu: false
                }
                this.sketch=sketch;

                var china =
                    "https://services3.arcgis.com/XDzy9VWpT2sZyZqz/arcgis/rest/services/countyPoint/FeatureServer/0";
                var figureqTask = new QueryTask({
                    url: china //全国矢量
                });
                this.figureqTask=figureqTask;
                var figureQuery = new Query({
                    returnGeometry: true,
                    outFields: ["*"], //结果要素包含的属性字段
                });
                //空间参考信息
                figureQuery.outSpatialReference = webmap.outSpatialReference;
                //查询的标准，此处代表和geometry相交的图形都要返回
                figureQuery.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
                this.figureQuery=figureQuery;
                //地图打印输出
                var printTask = new PrintTask({
                    url: "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
                });
                this.printTask=printTask;
                var template = new PrintTemplate({
                    format: "png32",
                    exportOptions: {
                        dpi: 300
                    },
                    layout: "a4-landscape", //A4

                });
                var params = new PrintParameters({
                    view: view,
                    template: template
                });
                this.params=params;

                //异步获取网络地图图层
                webmap.when(() => {
                 webmap.loadAll().then(()=>{
                     this.earseLoad();
                 })
                  //给鼠标绑定点击拖动Div大小
                  //需要调整尺寸的div
                  this.c = document.getElementById('GDP3Dcharts')
                      // body监听移动事件
                  document.getElementById('mapShow-body').addEventListener('mousemove', this.mouseMove)
                      // 鼠标按下事件
                  this.c.addEventListener('mousedown', this.mouseDown)
                      // 鼠标松开事件
                  document.getElementById('mapShow-body').addEventListener('mouseup', this.mouseUp)
                  //webmap.allLayers.items[0].visible = false;
                  _self.basemap =  webmap.allLayers.items[0];//获取点featureLayer;
                  _self.testfl = webmap.allLayers.items[2];//获取点featureLayer
                  _self.testfpl = webmap.allLayers.items[1];//获取面featureLayer
                  this.pDefaultRenderer = _self.testfpl.renderer;//保存面图层的默认渲染

                  var feature = _self.testfl;


                  //设置数据渲染方式：按属性渲染
                  // feature.renderer = this.defaultRender;

                  //贫困县对比分析-属性查询
                  let nameabcQuery = _self.testfl.createQuery();
                  this.nameabcQuery=nameabcQuery;
                  //划区分析-连片区属性查询
                  let connectareaQuery = _self.testfl.createQuery();
                  this.connectareaQuery=connectareaQuery;

                  let provinceQuery=_self.testfpl.createQuery();
                  this.provinceQuery=provinceQuery;

                  //设置数据渲染方式：萤火虫渲染
                  this.changeArea(this.$refs["timeChild"].alreadyRun);//渲染萤火地图
                  this.$refs["timeChild"].rendType = "fireFly";
                  this.changeCluster();//渲染图
                  //设置图例
                  let legend = new this.legend({
                    view: this.testView,
                    layerInfos: [{
                      title: " ",
                      layer: this.testfl,
                    }]
                  });
                  this.legendd = legend;

                  this.testView.ui.add(legend,"bottom-left");

                  let that=this;
                  //给sketch部件添加监听事件，监听它完成的时候
                  this.sketch.on("create", function(event) {
                      if (event.state === "complete") {
                          that.eagleview.graphics.removeAll();
                          //使用geometry（QueryTask）
                          that.queryTask(event.graphic.geometry);
                      }
                  });

                  this.changeClassBreak();//分级渲染

                  let query = {
                    geometry: {},
                    returnGeometry: true,
                    outFields: ["*"]
                  };

                  //设置两个个图层供点击查看
                  var graphicsLayer = new GraphicsLayer();
                  var graphicsLayer2 = new GraphicsLayer();
                  var clickGraphicsLayer = new GraphicsLayer();

                  this.graphicsLayer = graphicsLayer;
                  this.graphicsLayer2 = graphicsLayer2;
                  this.clickGraphicsLayer = clickGraphicsLayer;

                  webmap.layers.unshift(clickGraphicsLayer);
                  webmap.layers.unshift(graphicsLayer);
                  //webmap.add(graphicsLayer2);

                  let displayResult = (Result,day)=>{
                    this.graphicsLayer2.graphics.removeAll();
                    //this.graphicsLayer2.graphics.removeAll();
                    //this.graphicsLayer2.source = [];

                    //设置样式
                    const symbol = {
                        type: "picture-marker",
                        url: 'static/img/屋子.png',
                        width: "30px",
                        height: "30px"
                    };

                    //设置点击弹窗
                    const template = {
                      title: "{name}",
                      content: [
                        {
                          type: "fields",
                          fieldInfos: [
                            {
                              fieldName: "date",
                              label: "脱贫时间："
                            },
                          ]
                        }
                      ]
                    };

                    //只加入满足时间条件的要素
                    var satifyfeatures = [];
                    Result.features.forEach((feature,index) => {
                      if(feature.attributes.time > day) {
                        satifyfeatures.push({
                          geometry:feature.geometry,
                          attributes:{
                            ObjectID: index,
                            name:feature.attributes["name"],
                            date:new Date(parseInt(feature.attributes["date"])).toLocaleString().split(' ')[0],
                          }
                        });
                        this.currentColor[index] = "#66afe9";
                      }
                      else{
                        this.currentColor[index] = "#CD5C5C";
                      }
                    });
                    //更新剩余贫困县数量
                    this.currentNum = satifyfeatures.length;
                    this.isPoorShow = true;

                    var fields = [{
                      name: "ObjectID",
                      alias: "ObjectID",
                      type: "oid"
                    }, {
                      name: "name",
                      alias: "name",
                      type: "string" //字符串类型
                    }, {
                      name: "date",
                      alias: "date",
                      type: "string" //字符串类型
                    }];

                    let graphicsLayer2 = new this.FeatureLayer({
                      fields:fields,
                      source:satifyfeatures
                    });
                    const labelClass = {
                      symbol: {
                        type: "text",
                        color: "#7FFFD4",
                        font: {
                          // autocast as new Font()
                          family: "Playfair Display",
                          size: 8,
                          weight: "bold"
                        }
                      },
                      labelPlacement: "below-center",
                      labelExpressionInfo: {
                        expression: "$feature.name"
                      }
                    };

                    graphicsLayer2.labelingInfo = [labelClass];
                    graphicsLayer2.renderer = {
                      type: "simple",
                      symbol: symbol
                    };

                    graphicsLayer2.popupTemplate = template;
                    if(this.graphicsLayer_===1) {
                      this.graphicsLayer_ = graphicsLayer2;
                      this.webmap.add(this.graphicsLayer_);
                    }

                  }
                  this.displayResult = displayResult;
                  this.view = view;
                  view.on("click", (event) => {
                    //点击点对象
                    // if(this.areaSelectmode==0){ //不在划区分析模块下
                      //生成15km缓冲区
                      var buffer = geometryEngine.geodesicBuffer(event.mapPoint, 15, "kilometers");
                      // query.geometry = view.toMap(buffer);
                      query.geometry = buffer;
                      this.testfl.queryFeatures(query).then(result=>{
                          //获取点到的点（默认第一个）
                          var point = result.features[0];

                          //空间分析模块，点击省份跳转到对应等级
                          if(this.MODE==21){
                            this.meanCenter.popupEnabled=true;
                            this.standardEllipse.popupEnabled=true;
                            let provinceName="中国";

                            this.testfl.popupEnabled=false;
                            if(this.spatialAnalystMode=="1"){
                            //标准差椭圆模块下进行省份的跳转
                            this.meanCenter.queryFeatures(query).then(resultcCenter=>{
                                //获取点到的点（默认第一个）
                                var center = resultcCenter.features[0];
                                if(!center){
                                   this.meanCenter.popupEnabled=false;
                                    this.standardEllipse.popupEnabled=false;
                                  // let keys=this.$refs.tree.getCheckedKeys();
                                  // if(this.spatialYearList_1.length!=0){ //全选或单多选
                                    query.geometry = view.toMap(event);
                                    this.testfpl.queryFeatures(query).then(selectPro=>{
                                      //获取点击要素
                                      var pro = selectPro.features[0];
                                      if(pro.attributes["name"]== "江西省"){
                                        //若已在江西省范围
                                        if(this.ellipseMode=="Jiangxi"){
                                          this.ellipseMode="China";
                                          provinceName="中国";
                                          //先除去上一次点击的要素
                                          this.view.graphics.removeAll();
                                          this.graphicsLayer.graphics.removeAll();
                                          this.graphicsLayer2.graphics.removeAll();
                                          // this.testfpl.visible = true;
                                          // this.testfl.visible = true;
                                          this.basemap.visible = true;
                                          //视角转换
                                          let pt = new this.Point({
                                            latitude: 32,
                                            longitude: 116.3
                                          });
                                          this.view.goTo(
                                          {
                                            target: pt,
                                              zoom: 4
                                          },{
                                            duration:1000
                                            }
                                          );
                                        }
                                        else if(this.ellipseMode=="China"){
                                          this.ellipseMode="Jiangxi";
                                          provinceName="江西省";
                                          //设置其他面要素隐去
                                          this.testfl.visible = false;
                                          this.testfpl.visible = false;
                                          //去除底图
                                          // this.basemap.visible = false;
                                          var color;
                                          if(parseInt(pro.attributes["Join_Count"]) <= 10){
                                            color = "#ffffcc";
                                          }
                                          else if(parseInt(pro.attributes["Join_Count"]) <= 30 && parseInt(pro.attributes["Join_Count"])>=1)  color = "#a1dab4";
                                          else if(parseInt(pro.attributes["Join_Count"]) >= 31 && parseInt(pro.attributes["Join_Count"]) <= 50) color = "#2c7fb8";
                                          else if(parseInt(pro.attributes["Join_Count"]) >= 51 && parseInt(pro.attributes["Join_Count"])<=100) color="#325361"
                                          //设置填充样式
                                          const symbol = {
                                            type: "simple-line",
                                            color: color,
                                            outline: null
                                          };
                                          //视角变换
                                          this.view.goTo(
                                            {
                                              target: [115.914271, 28.668507],
                                              // extent: pro.geometry.extent.clone().expand(1.8),
                                              zoom:6
                                            },
                                            {duration: 1000}
                                          );
                                          pro.symbol = symbol;
                                          graphicsLayer.graphics.add(pro);
                                        }
                                        this.handleCheckedYearsChange_1(this.spatialYearList_1);
                                        // let keys=this.$refs.tree.getCheckedKeys();
                                        // this.updateSpatialAnalyst(keys);
                                      }
                                      else if(pro.attributes["name"]== "河南省"){
                                        //若已在江西省范围
                                        if(this.ellipseMode=="Henan"){
                                          this.ellipseMode="China";
                                          provinceName="中国";
                                          //先除去上一次点击的要素
                                          this.view.graphics.removeAll();
                                          this.graphicsLayer.graphics.removeAll();
                                          this.graphicsLayer2.graphics.removeAll();
                                          // this.testfpl.visible = true;
                                          // this.testfl.visible = true;
                                          this.basemap.visible = true;
                                          //视角转换
                                          let pt = new this.Point({
                                            latitude: 32,
                                            longitude: 116.3
                                          });
                                          this.view.goTo(
                                          {
                                            target: pt,
                                              zoom: 4
                                          },{
                                            duration:1000
                                            }
                                          );
                                        }
                                        else if(this.ellipseMode=="China"){
                                          this.ellipseMode="Henan";
                                          provinceName="河南省";
                                          //设置其他面要素隐去
                                          this.testfl.visible = false;
                                          this.testfpl.visible = false;
                                          //去除底图
                                          // this.basemap.visible = false;
                                          var color;
                                          if(parseInt(pro.attributes["Join_Count"]) <= 10){
                                            color = "#ffffcc";
                                          }
                                          else if(parseInt(pro.attributes["Join_Count"]) <= 30 && parseInt(pro.attributes["Join_Count"])>=1)  color = "#a1dab4";
                                          else if(parseInt(pro.attributes["Join_Count"]) >= 31 && parseInt(pro.attributes["Join_Count"]) <= 50) color = "#2c7fb8";
                                          else if(parseInt(pro.attributes["Join_Count"]) >= 51 && parseInt(pro.attributes["Join_Count"])<=100) color="#325361"
                                          //设置填充样式
                                          const symbol = {
                                            type: "simple-line",
                                            color: color,
                                            outline: null
                                          };
                                          //视角变换
                                          this.view.goTo(
                                            {
                                              target: [113.765129, 34.760326],
                                              // extent: pro.geometry.extent.clone().expand(1.8),
                                              zoom:6
                                            },
                                            {duration: 1000}
                                          );
                                          pro.symbol = symbol;
                                          graphicsLayer.graphics.add(pro);
                                        }
                                        this.handleCheckedYearsChange_1(this.spatialYearList_1);
                                        // let keys=this.$refs.tree.getCheckedKeys();
                                        // this.updateSpatialAnalyst(keys);
                                      }
                                      else if(pro.attributes["name"]== "青海省"){
                                        //若已在江西省范围
                                        if(this.ellipseMode=="Qinhai"){
                                          this.ellipseMode="China";
                                          provinceName="中国";
                                          //先除去上一次点击的要素
                                          this.view.graphics.removeAll();
                                          this.graphicsLayer.graphics.removeAll();
                                          this.graphicsLayer2.graphics.removeAll();
                                          // this.testfpl.visible = true;
                                          // this.testfl.visible = true;
                                          this.basemap.visible = true;
                                          //视角转换
                                          let pt = new this.Point({
                                            latitude: 32,
                                            longitude: 116.3
                                          });
                                          this.view.goTo(
                                          {
                                            target: pt,
                                              zoom: 4
                                          },{
                                            duration:1000
                                            }
                                          );
                                        }
                                        else if(this.ellipseMode=="China"){
                                          this.ellipseMode="Qinhai";
                                          provinceName="青海省";
                                          //设置其他面要素隐去
                                          this.testfl.visible = false;
                                          this.testfpl.visible = false;
                                          //去除底图
                                          // this.basemap.visible = false;
                                          var color;
                                          if(parseInt(pro.attributes["Join_Count"]) <= 10){
                                            color = "#ffffcc";
                                          }
                                          else if(parseInt(pro.attributes["Join_Count"]) <= 30 && parseInt(pro.attributes["Join_Count"])>=1)  color = "#a1dab4";
                                          else if(parseInt(pro.attributes["Join_Count"]) >= 31 && parseInt(pro.attributes["Join_Count"]) <= 50) color = "#2c7fb8";
                                          else if(parseInt(pro.attributes["Join_Count"]) >= 51 && parseInt(pro.attributes["Join_Count"])<=100) color="#325361"
                                          //设置填充样式
                                          const symbol = {
                                            type: "simple-line",
                                            color: color,
                                            outline: null
                                          };
                                          //视角变换
                                          this.view.goTo(
                                            {
                                              target: [101.791632, 36.633645],
                                              // extent: pro.geometry.extent.clone().expand(1.8),
                                              zoom:6
                                            },
                                            {duration: 1000}
                                          );
                                          pro.symbol = symbol;
                                          graphicsLayer.graphics.add(pro);
                                        }
                                        this.handleCheckedYearsChange_1(this.spatialYearList_1);
                                        // let keys=this.$refs.tree.getCheckedKeys();
                                        // this.updateSpatialAnalyst(keys);
                                      }
                                      //弹窗设置
                                          var centerTemplate = {
                                              //标题
                                              title: provinceName+"贫困县平均中心",
                                              //内容  featureLayer的各个字段名，当弹窗的时候，对应的字段值就会替换这个大括号
                                              content:
                                                  "<table><tr><th>年份</th><td>{Id}</td></tr>" +
                                                  "<tr><th>位置</th><td>{XCoord} E,{YCoord} N</td></tr></table>",
                                              fieldInfos: [{
                                                  fieldName: "name",
                                                  format: {
                                                      digitSeparator: true,
                                                      places: 0
                                                  }
                                              }]
                                          };
                                          this.meanCenter.popupTemplate = centerTemplate;
                                          var ellipseTemplate = {
                                              //标题
                                              title: provinceName+"贫困县标准差椭圆",
                                              //内容  featureLayer的各个字段名，当弹窗的时候，对应的字段值就会替换这个大括号
                                              content:
                                                  "<table><tr><th>年份</th><td>{Id}</td></tr>" +
                                                  "<tr><th>中心坐标</th><td>{XCoord} E,{YCoord} N</td></tr>"+
                                                  "<tr><th>方向</th><td>{Rotation} °</td></tr>"+
                                                  "<tr><th>X轴长</th><td>{XStdDist}</td></tr>"+
                                                  "<tr><th>Y轴长</th><td>{YStdDist}</td></tr></table>",
                                              fieldInfos: [{
                                                  fieldName: "name",
                                                  format: {
                                                      digitSeparator: true,
                                                      places: 0
                                                  }
                                              }]
                                          };
                                          this.standardEllipse.popupTemplate = ellipseTemplate;
                                    });
                                  // }
                                }

                              });
                            }
                            else if(this.spatialAnalystMode=="2"){
                              let year=14+this.spatialYear_2/2;
                              let target="";
                              switch(this.spotClusterTarget){
                                case 1:
                                  target="G"+year.toString();
                                  break;
                                case 2:
                                  target="K"+year.toString();
                                  break;
                                case 3:
                                  target="N"+year.toString();
                              }
                                var hotSpotTemplate = {
                                    //标题
                                    title: "{name}",
                                    //内容  featureLayer的各个字段名，当弹窗的时候，对应的字段值就会替换这个大括号
                                    content:
                                        "<table><tr><th>省份</th><td>{province}</td></tr>" +
                                        "<tr><th>脱贫日期</th><td>{date}</td></tr>" +
                                        "<tr><th>GiZScore</th><td>{"+target+"GiZScor}</td></tr>" +
                                        "<tr><th>GiPValue</th><td>{"+target+"GiPValu}</td></tr></table>",
                                    fieldInfos: [{
                                        fieldName: "name",
                                        format: {
                                            digitSeparator: true,
                                            places: 0
                                        }
                                    }]
                                };
                                this.HotSpotGZ.popupTemplate = hotSpotTemplate;
                            }
                            else if(this.spatialAnalystMode=="3"){
                                let year=14+this.spatialYear_2/2;
                                let target="";
                                switch(this.spotClusterTarget){
                                  case 1:
                                    target="G"+year.toString();
                                    break;
                                  case 2:
                                    target="K"+year.toString();
                                    break;
                                  case 3:
                                    target="N"+year.toString();
                                }
                                var clusterTemplate = {
                                   //标题
                                    title: "{name}",
                                    //内容  featureLayer的各个字段名，当弹窗的时候，对应的字段值就会替换这个大括号
                                    content:
                                        "<table><tr><th>省份</th><td>{province}</td></tr>" +
                                        "<tr><th>脱贫日期</th><td>{date}</td></tr>" +
                                        "<tr><th>LMiIndex</th><td>{"+target+"LMiInde}</td></tr>" +
                                        "<tr><th>LMiZScore</th><td>{"+target+"LMiZSco}</td></tr>" +
                                        "<tr><th>LMiPValue</th><td>{"+target+"LMiPVal}</td></tr>" +
                                        "<tr><th>COType</th><td>{"+target+"COType}</td></tr></table>",
                                    fieldInfos: [{
                                        fieldName: "name",
                                        format: {
                                            digitSeparator: true,
                                            places: 0
                                        }
                                    }]
                                };
                                this.ClusterGZ.popupTemplate = clusterTemplate;

                            }
                          }
                          //对比分析模块，点击贫困县将名称填写到输入框内
                          else if(this.MODE==22){
                            if(point&&this.inputFlag==true){
                              this.inputFlag=false;
                              this.inputValue=point.attributes['name'];
                              this.handleInputConfirm();
                            }

                          }
                          //第一个功能，没点到点，默认点到省，放大显示省
                          else if(!point &&Math.round(this.MODE/10)==1){
                            query.geometry = view.toMap(event);
                            this.testfpl.queryFeatures(query).then(selectPro=>{

                              //获取点击要素
                              var pro = selectPro.features[0];

                              //修改url地址
                              this.provincesHref.forEach(item=>{
                                if(item.name+'省'==pro.attributes.name){
                                  this.targetUrl=item.url;
                                }
                              })

                              //如果查询到
                              if(pro) {
                                if(this.isS != false){
                                  return
                                }
                                this.isS = true;
                                //设置其他面要素隐去
                                this.testfpl.visible = false;

                                //去除底图
                                this.basemap.visible = false;
                                var color;
                                if(parseInt(pro.attributes["Join_Count"]) <= 10){
                                  color = "#ffffcc";
                                }
                                else if(parseInt(pro.attributes["Join_Count"]) <= 30 && parseInt(pro.attributes["Join_Count"])>=1)  color = "#a1dab4";
                                else if(parseInt(pro.attributes["Join_Count"]) >= 31 && parseInt(pro.attributes["Join_Count"]) <= 50) color = "#2c7fb8";
                                else if(parseInt(pro.attributes["Join_Count"]) >= 51 && parseInt(pro.attributes["Join_Count"])<=100) color="#325361"

                                //设置填充样式
                                const symbol = {
                                  type: "simple-fill",
                                  color: color,
                                  outline: null
                                };

                            //视角变换
                            view.goTo(
                              {
                                target: view.toMap(event),
                                extent: pro.geometry.extent.clone().expand(1.8),
                                zoom:8
                              },
                              {duration: 1000}
                            );
                            pro.symbol = symbol;

                            graphicsLayer.graphics.add(pro);

                            //筛选点
                            let parcelQuery = {
                              geometry: pro.geometry,
                              returnGeometry: true,
                              outFields: ["*"]
                            };

                            this.testfl.queryFeatures(parcelQuery).then(result=>{
                              //var selPoi = result.features;
                              //隐藏其他的点
                              this.result = result;
                              this.testfl.visible = false;
                              //更新右上角贫困县数量
                              var day = this.$refs["timeChild"].alreadyRun;

                              //更贫困县数量图表数据
                              /*1先更新数据PoorAN，后更新Y轴线*/
                              for(var i = 244;i <= 732;i++){
                                var tempNum=0;
                                result.features.forEach((feature) => {
                                  if(feature.attributes.time > i) {
                                    tempNum++
                                  }
                                });
                                this.poorAN[i-244] = tempNum;
                              }
                              let max = this.poorAN[0];

                              this.numChartOption.yAxis[0].data = (function () {
                                var yArr = [];
                                for(var i = 0;i <= max+5;i++){
                                  yArr.push(i);
                                }
                                return yArr;
                              })();

                            this.numChartOption.series[0].data=[];
                              /*2、更新centerM与PoorM*/
                              this.axios.get('http://localhost:3000/getcentermoney?province='+pro.attributes.name).then(res=>{
                                if(res.data.length<=0){//未获取到数据
                                  this.$message({
                                    message: pro.attributes.name+'暂无中央财政专项专项资金数据',
                                    type: 'warning'
                                  });
                                  this.centerM=[0,0,0,0,0,0,0,0];
                                }else{
                                  this.centerM=[];
                                  for(var i = 0;i < 3;i++){
                                    this.centerM.push(0);
                                  }
                                  for(var i = 2016;i <= 2020;i++){
                                    this.centerM.push(res.data[0]['a'+i]/100000);
                                  }
                                }
                                this.GDPChartOption.series[0].data=[];
                                this.axios.get('http://localhost:3000/getaveragemoney?poorarea='+pro.attributes.name).then(res=>{
                                  if(res.data.length<=0){//未获取到数据
                                    this.$message({
                                      message: pro.attributes.name+'暂无人均可支配收入数据',
                                      type: 'warning'
                                    });
                                    this.poorM=[0,0,0,0,0,0,0,0];
                                  }else{
                                    this.poorM=[];
                                    for(var i = 2013;i <= 2019;i++){
                                      this.poorM.push(res.data[0]['a'+i]/10000);
                                    }
                                    this.poorM.push(0);
                                  }
                                });
                                this.GDPChartOption.series[1].data=[];
                                this.updateNumChart(this.$refs["timeChild"].alreadyRun);
                                this.GDPChart.setOption(this.GDPChartOption);
                                this.numChart.setOption(this.numChartOption);
                              });

                              /*3、更新poorN与PoorL*/
                              this.axios.get('http://localhost:3000/getpoorpeoplebyname?area='+pro.attributes.name).then(res=>{
                                if(res.data.length==0){
                                  this.$message({
                                    message: pro.attributes.name+'暂无贫困人口数据',
                                    type: 'warning'
                                  });
                                  this.poorN=[0,0,0,0,0,0,0,0];
                                }else{
                                  this.poorN=[];
                                  for(var i = 2012;i <= 2018;i++){
                                    this.poorN.push(parseFloat(res.data[0][i.toString()])/10);
                                  }
                                  this.poorN.push(0);
                                  this.poorN.push(0);
                                }
                                this.poorChartOption.series[0].data=[];
                                this.axios.get('http://localhost:3000/getpoorlvbyname?area='+pro.attributes.name).then(res=>{
                                  if(res.data.length==0){
                                    this.$message({
                                      message: pro.attributes.name+'暂无贫困发生率数据',
                                      type: 'warning'
                                    });
                                    this.poorL=[0,0,0,0,0,0,0,0];
                                  }else{
                                    this.poorL=[];
                                    for(var i = 2012;i <= 2018;i++){
                                      this.poorL.push(parseFloat(res.data[0][i.toString()])*100);
                                    }
                                    this.poorL.push(0);
                                    this.poorL.push(0);
                                  }
                                  this.poorChartOption.series[1].data=[];
                                  this.updateNumChart(this.$refs["timeChild"].alreadyRun);
                                  this.poorChart.setOption(this.poorChartOption);
                                });
                              })
                              displayResult(result,day);

                              //去除标签
                              this.btnShow=false;
                              this.testView.ui.remove(this.legendd);


                              //更新贫困县列表
                              result.features.forEach((feature)=>{
                                this.currentPoor.push(feature.attributes.name);
                              });
                            });
                            //更新右上角地名
                            this.currentArea = pro.attributes.name;
                            //更新图表数据
                          }
                        });
                      }
                        //迁徙图，点击省份，显示省份帮扶信息
                          else if(this.MODE==16){
                            query.geometry = view.toMap(event);
                            this.testfpl.queryFeatures(query).then(selectPro=>{
                              //获取点击要素
                              var pro = selectPro.features[0];
                              //如果查询到
                              if(pro) {
                                let that=this;
                                // that.testfpl.popupEnabled=true;
                                //判断当前是否已点击省份
                                [
                                  ['甘肃省', this.GanSuData],
                                  ['广西壮族自治区', this.GuangXiData],
                                  ['新疆维吾尔自治区', this.XinJiangData],
                                  ['西藏自治区', this.XiZangData],
                                  ['青海省', this.QingHaiData],
                                  ['宁夏回族自治区', this.NingXiaData],
                                  ['内蒙古自治区', this.NeiMengGuData],
                                  ['贵州省', this.GuiZhouData],
                                  ['四川省', this.SiChuanData],
                                  ['云南省', this.YunNanData],
                                  ['湖南省', this.HuNanData],
                                  ['湖北省', this.HuBeiData],
                                  ['河北省', this.HeBeiData],
                                  ['重庆市', this.ChongQingData] ,
                                  ['吉林省', this.JiLinData],
                                  ['陕西省', this.ShanXiData]
                              ].forEach(function(item, i) {
                                if(item[0]==pro.attributes["name"]){
                                  //已在省级查看
                                  if(that.autoLinecChart.chart&&that.autoLinecChart.chartOption.series.length<31){

                                    //删除已有迁徙图
                                    that.autoLinecChart.removeLayer();
                                    let autoLinecChart = new that.echartsLayer(that.testView,that.$echarts);
                                    that.autoLinecChart=autoLinecChart;
                                    let series=that.allSeries;
                                    var option = {
                                      series: series
                                    };
                                    that.autoLinecChart.setChartOption(option);
                                    that.testfpl.popupEnabled=true;
                                  }
                                  //全国范围，则跳转到省
                                  else{
                                    that.autoLinecChart.removeLayer();
                                    that.testfpl.popupEnabled=false;
                                    let autoLinecChart = new that.echartsLayer(that.testView,that.$echarts);
                                    that.autoLinecChart=autoLinecChart;
                                    var color = ['#de1c31', '#12a182', '#813c85', '#11659a', '#fed71a', '#8e804b', '#f9723d', '#f9e8d0', '#e16c96','#28FF28','#FCFCFC','#CECEFF','#708090','	#4DFFFF','#FF359A','#AD5A5A','#B3D9D9'];
                                    let series=[];
                                    series.push({
                                        name: item[0] + ' Top10',
                                        type: 'lines',
                                        coordinateSystem: 'arcgis',
                                        // zlevel: 1,
                                        effect: {
                                            show: true,
                                            period: 6,
                                            trailLength:0.7,
                                            color: '#fff',
                                            symbolSize: 3
                                        },
                                        lineStyle: {
                                            // normal: {
                                                color: color[i],
                                                width: 1,
                                                curveness: 0.2,
                                                opacity: 0.2,
                                            // }
                                        },
                                        data: that.convertData(item[1])
                                    }, {
                                        name: item[0] + ' Top10',
                                        type: 'lines',
                                        coordinateSystem: 'arcgis',
                                        // zlevel: 1,
                                        symbol: ['none', 'arrow'],
                                        symbolSize: 10,
                                        effect: {
                                            show: true,
                                            period: 6,
                                            trailLength: 0.1,
                                            symbol: "pin", //'image://./f.png', //planePath,,
                                            symbolSize: 8,
                                            "color": "#FFE53B"
                                        },
                                        lineStyle: {
                                            // normal: {
                                                color: color[i],
                                                width: 1.5,
                                                opacity: 0.6,
                                                curveness: 0.2
                                            // }
                                        },
                                        data: that.convertData(item[1])
                                    });
                                    var option = {
                                      series: series
                                    };
                                    that.autoLinecChart.setChartOption(option);
                                  }
                                }
                              });
                            //更新右上角地名
                            this.currentArea = pro.attributes.name;
                            //更新图表数据
                          }
                        });
                          }
                     });
                    });
                  view.ui.remove('zoom')//清除放大缩小按钮
                  view.ui.remove('attribution')//清楚底部powered by ESRI

                  eagleview.on("click", (event) => {
                    if(this.areaMode==1){ //省份选择
                        query.geometry = eagleview.toMap(event);
                        this.testfpl.queryFeatures(query).then(selectPro=>{
                              //获取点击要素
                              var pro = selectPro.features[0];
                              //如果查询到
                              if(pro) {
                                //去除底图
                                this.basemap.visible = false;
                                var color="#ffffcc";
                                //设置填充样式
                                const symbol = {
                                  type: "simple-fill",
                                  color: color,
                                  outline: null
                                };
                              this.queryTask(pro.geometry);
                                //视角变换
                                eagleview.goTo(
                                  {
                                    target: eagleview.toMap(event),
                                    extent: pro.geometry.extent.clone().expand(1.8),
                                    zoom:5
                                  },
                                  {duration: 1000}
                                );
                                pro.symbol = symbol;

                            graphicsLayer.graphics.add(pro);
                            this.testfl.visible = false;
                          }
                        });
                    }
                  });
                })
              }).catch((err) => {
              _self.$message('地图创建失败，' + err);
            });
          },

          //不同功能打开不同窗体
          windowShow(mode){
            this.MODE=mode;
            this.areaSelectmode=0;
            //迁徙轨迹图
            if(mode==16){
                this.isChartShow = false;
                this.isNewsShow = false;
                this.isCurrrentNewsShow = false;
                this.timeAndPoorShow = false;
                this.isTimeShow = false;

                this.iscontrastABCShow=false;
                this.isArea3DShow=false;
                this.isChartShowTwoOne=false;
                this.isChartShow2_2=false;
                this.isChartShow2_3_down=false;
                this.isChartShow2_3_up=false;
                this.isYearSliderShow=false;
            }
            //展示
            else if(Math.round(mode/10)==1){
                this.testfpl.popupEnabled=true;
                this.testfl.popupEnabled=true;
                this.isChartShow = true;
                this.isNewsShow = true;
                this.isCurrrentNewsShow = true;
                this.timeAndPoorShow = true;
                this.isTimeShow = true;

                this.iscontrastABCShow=false;
                this.isArea3DShow=false;
                this.isChartShowTwoOne=false;
                this.isChartShow2_2=false;

                this.isChartShow2_3_up=false;
                this.isChartShow2_3_down=false;
                this.isYearSliderShow=false;
            }
            //空间分析
            else if(mode==21){
              console.log(1111);
                this.isChartShowTwoOne=true;
                this.testfpl.popupEnabled=false;
                this.isChartShow = false;
                this.isNewsShow = false;
                this.isCurrrentNewsShow = false;
                this.timeAndPoorShow = false;
                this.isTimeShow = false;

                this.iscontrastABCShow=false;
                this.isArea3DShow=false;
                this.isChartShow2_2=false;
                this.isChartShow2_3_up=false;
                this.isChartShow2_3_down=false;
                this.isYearSliderShow=false;
                //视角变换
                this.view.goTo(
                {
                  target: [109.3, 36.5],
                    zoom: 5
                },{
                  duration:1000
                  }
                );

            }
            //对比分析
            else if(mode==22){
                this.testfpl.popupEnabled=false;
                this.isChartShow = false;
                this.isNewsShow = false;
                this.isCurrrentNewsShow = false;
                this.timeAndPoorShow = false;
                this.isTimeShow = false;

                this.iscontrastABCShow=true;
                this.isChartShowTwoOne=false;
                this.isArea3DShow=false;
                this.isChartShow2_3_up=false;
                this.isChartShow2_3_down=false;
                this.isYearSliderShow=false;
                //视角变换-贵州
                this.view.goTo(
                  {
                    target: [106.707410,26.598194],
                    zoom:7
                  },
                  {duration: 1000}
                );
            }
            //划区分析
            else if(mode==23){
                this.isChartShow = false;
                this.isNewsShow = false;
                this.isCurrrentNewsShow = false;
                this.timeAndPoorShow = false;
                this.isTimeShow = false;

                this.iscontrastABCShow=false;
                this.isChartShowTwoOne=false;
                this.isChartShow2_2=false;
                this.isArea3DShow=true;
            }

            else if(Math.round(mode/10)==5){
                this.isChartShow = false;
                this.isNewsShow = false;
                this.isCurrrentNewsShow = false;
                this.timeAndPoorShow = false;
                this.isTimeShow = false;
                this.iscontrastABCShow=false;
                this.isArea3DShow=false;
                this.isChartShowTwoOne=false;
                this.isChartShow2_2=false;
                this.isChartShow2_3_up=false;
                this.isChartShow2_3_down=false;
                this.isYearSliderShow=false;
            }
          },
          //分级地图显示函数
          changeClassBreak() {
            const renderer = new this.ClassBreaksRenderer({
              field: "Join_Count",
              legendOptions: {
                title: " "
              },
              classBreakInfos: [
                {
                  minValue: 0,
                  maxValue: 10,
                  symbol: {
                    type: "simple-fill",
                    color: "#ffffcc",
                    style: "solid",
                    outline: {
                      width: 0.2,
                      color: [255, 255, 255, 0.2]
                    }
                  },
                  label:"0-10个贫困县"
                },
                {
                  minValue: 11,
                  maxValue: 30,
                  symbol: {
                    type: "simple-fill",
                    color: "#a1dab4",
                    style: "solid",
                    outline: {
                      width: 0.2,
                      color: [255, 255, 255, 0.2]
                    }
                  },
                  label:"11-30个贫困县"
                },
                {
                  minValue: 31,
                  maxValue: 50,
                  symbol: {
                    type: "simple-fill",
                    color: "#2c7fb8",
                    style: "solid",
                    outline: {
                      width: 0.2,
                      color: [255, 255, 255, 0.2]
                    }
                  },
                  label:"31-50个贫困县"
                },
                {
                  minValue: 51,
                  maxValue: 100,
                  symbol: {
                    type: "simple-fill",
                    color: "#325361",
                    style: "solid",
                    outline: {
                      width: 0.2,
                      color: [255, 255, 255, 0.2]
                    }
                  },
                  label:"51-100个贫困县"
                }
              ]
            });
            this.testfpl.renderer = renderer;
          },
          //聚合地图显示函数
          changeCluster() {
            this.testfl.featureReduction = this.clusterConfig;
          },
          //热力地图显示函数
          changeHeatmap(day) {
            if(this.expression != '' && this.expression !== '()'){
              this.testfl.definitionExpression ="(time > " + day + ") and " + this.expression;
            }else {
              this.testfl.definitionExpression = "time > " + day;
            }
            this.testfl.renderer = {
              type: "heatmap",
              field: "time",
              colorStops: [
                {ratio: 0, color: "rgba(255, 255, 255, 0)"},
                {ratio: 0.2, color: "rgba(255, 255, 255, 1)"},
                {ratio: 0.5, color: "rgba(255, 140, 0, 1)"},
                {ratio: 0.8, color: "rgba(255, 140, 0, 1)"},
                {ratio: 1, color: "rgba(255, 0, 0, 1)"}
              ],
              minPixelIntensity: 0,
              maxPixelIntensity: 10000
            };
          },
          changeNoSee(day) {
            // #d7191c|#fdae61|#ffffbf|#abdda4|#2b83ba
            var symbol = [];
            symbol.push({
              type: "simple-marker",
              size:6,
              color:"#abdda4",
            });
            symbol.push({
              type: "simple-marker",
              size:6,
              color:"#2b83ba",
            });

            symbol.push({
              type: "simple-marker",
              size:6,
              color:"#fdae61",
            })
            symbol.push({
              type: "simple-marker",
              size:6,
              color:"#d7191c",
            });
            const renderer = new this.ClassBreaksRenderer({
              field: "time",
              legendOptions: {
                title: " "
              },
              classBreakInfos: [
                {
                  minValue: 122,
                  maxValue: 365,
                  symbol: symbol[0],
                  label: "2017-2018年摘帽县"
                },
                {
                  minValue: 366,
                  maxValue: 487,
                  symbol: symbol[1],
                  label: "2018-2019年摘帽县"
                },
                {
                  minValue: 488,
                  maxValue: 609,
                  symbol: symbol[2],
                  label: "2019-2020年摘帽县"
                },
                {
                  minValue: 610,
                  maxValue: 732,
                  symbol: symbol[3],
                  label: "2020-2021年摘帽县"
                }
              ]
            });

            this.testfl.renderer = renderer;
            if(this.expression != '' && this.expression !== '()'){
              this.testfl.definitionExpression ="(time > " + day + ") and " + this.expression;
            }else {
              this.testfl.definitionExpression = "time > " + day;
            }
          },
          //萤火地图显示函数
          changeArea(day) {
            var symbol = [];
            symbol.push({
              type: "picture-marker",
              url: 'static/img/blue.png',
              width: "20px",
              height: "20px"
            });
            symbol.push({
              type: "picture-marker",
              url: 'static/img/yellow.png',
              width: "20px",
              height: "20px"
            });

            symbol.push({
              type: "picture-marker",
              url: 'static/img/orange.png',
              width: "20px",
              height: "20px"
            })
            symbol.push({
              type: "picture-marker",
              url: 'static/img/red.png',
              width: "20px",
              height: "20px"
            });
            const renderer = new this.ClassBreaksRenderer({
              field: "time",
              legendOptions: {
                title: " "
              },
              classBreakInfos: [
                {
                  minValue: 0,
                  maxValue: day,
                  symbol: symbol[3],
                  label: "已经完成脱贫的贫困县"
                },
                {
                  minValue: day + 1,
                  maxValue: day + 60,
                  symbol: symbol[2],
                  label: "半年内完成脱贫的贫困县"
                },
                {
                  minValue: day + 61,
                  maxValue: day + 120,
                  symbol: symbol[1],
                  label: "一年内完成脱贫的贫困县"
                },
                {
                  minValue: day + 121,
                  maxValue: 720,
                  symbol: symbol[0],
                  label: "一年后完成脱贫的贫困县"
                }
              ]
            });
            this.testfl.renderer = renderer;
          },
          //更新Chart与新闻
          updateNumChart(day) {
                //更新贫困县数量
                if(day >= 244) {
                  var maxNum = this.poorAN[0];
                  if(this.poorAN.slice(0,day-244+1).length!=this.numChartOption.series[0].data.length) {
                    var temp1 =  this.poorAN.slice(0, day - 244+1);
                    this.numChartOption.series[0].data = temp1;
                    var temp2 =  this.poorAN.slice(0, day - 244+1);
                    temp2.forEach((item,index)=>{
                      temp2[index] = maxNum-item;
                    })
                    this.numChartOption.series[1].data = temp2;
                    this.numChartOption.dataZoom.end = 0.1366 * day;
                    this.numChart.setOption(this.numChartOption);
                  }
                }
                else{
                  this.numChartOption.series[0].data= [];
                  this.numChartOption.series[1].data = [];
                  this.numChart.setOption(this.numChartOption);
                }
                //更新经济图表
               if(day <= 244){
                 var end = parseInt(day/48);
                 if(this.centerM.slice(0,end).length!=this.GDPChartOption.series[0].data.length) {
                   this.GDPChartOption.series[0].data = this.centerM.slice(0, end);
                   this.GDPChartOption.series[1].data = this.poorM.slice(0, end);
                   this.GDPChart.setOption(this.GDPChartOption);
                 }
               }
               else{
                 var end = parseInt((day+1-244)/122)+5;
                 if(this.centerM.slice(0,end).length!=this.GDPChartOption.series[0].data.length) {
                   this.GDPChartOption.series[0].data = this.centerM.slice(0, end);
                   this.GDPChartOption.series[1].data = this.poorM.slice(0, end);
                   this.GDPChart.setOption(this.GDPChartOption);
                 }
               }

                //更新贫困人口图表
            if(day <= 244){
              var end = parseInt(day/48)+1;
              if(this.poorN.slice(0,end).length!=this.poorChartOption.series[0].data.length) {
                this.poorChartOption.series[0].data = this.poorN.slice(0, end);
                this.poorChartOption.series[1].data = this.poorL.slice(0, end);
                this.poorChart.setOption(this.poorChartOption);
              }
            }
            else{
              var end = parseInt((day+1-244)/122)+6;
              if(this.poorN.slice(0,end).length!=this.poorChartOption.series[0].data.length) {
                this.poorChartOption.series[0].data = this.poorN.slice(0, end);
                this.poorChartOption.series[1].data = this.poorL.slice(0, end);
                this.poorChart.setOption(this.poorChartOption);
              }
            }

            //如果是在主界面
            if(this.isS == false) {
              //更新贫困县人口数
              if (day >= 244) {
                this.currentNum = this.poorAN[day - 245];
              } else {
                this.currentNum = 832;
              }
            }
            //如果不是在主界面
            else{
              if(day > 244) {
                if (this.graphicsLayer_ !== 1) {
                  this.webmap.remove(this.graphicsLayer_);
                }
                this.graphicsLayer_ = 1;
                this.displayResult(this.result, day);
              }
            }

            var tempNum = 0;
            //更新新闻列表
            for(var i = 0;i < this.allNews.length;i++){
              if(day < this.allNews[i].time){
                break;
              }
              else{
                tempNum++;
              }
            }

            if(tempNum > this.dataNews.length){
              for(var i =  this.dataNews.length;i < tempNum;i++){
                this.dataNews.push(this.allNews[i]);
              }
              this.currentNews = this.dataNews[this.dataNews.length-1];
            }
            else if(tempNum < this.dataNews.length){
              for(var i =  this.dataNews.length;i > tempNum;i--){
                this.dataNews.pop();
              }
              this.currentNews = this.dataNews[this.dataNews.length-1];
            }

          },
          //更新时间
          updateTime(day){
            if(day<=244){
              var index = parseInt(day/4.0);
            }
            else{
              var index = parseInt((day-244))+58;
            }
            this.startTime = this.date[index];
          },

          //选择对比的贫困县AB
          handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            this.IsAddButtonShow=true;
          },
          showInput() {
            this.inputVisible = true;
            this.inputFlag=true;
            this.$nextTick(_ => {
              this.$refs.saveTagInput.$refs.input.focus();
            });
          },
          handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
              this.dynamicTags.push(inputValue);
              if(this.dynamicTags.length==3){
                this.IsAddButtonShow=false;
              }
            }
            this.inputVisible = false;
            this.inputValue = '';
          },

          //导出时间格式处理
          TimeChange (timeStamp) {
            var date = new Date();
            date.setTime(timeStamp);  // 精确到毫秒、如果没有到毫秒就 date.setTime(timeStamp*1000);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;
            second = second < 10 ? ('0' + second) : second;
            return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
          },

          //查看对比分析结果
          clearCharts(){
            for(let i=0;i<3;i++){
              //修改图例为两贫困县名称
              //时间动态图
              this.AutoTimeChartOption.baseOption.series=[];

              this.AutoTimeChartOption.options[0].series[i].data=[];
              this.AutoTimeChartOption.options[1].series[i].data=[];
              this.AutoTimeChartOption.options[2].series[i].data=[];
              this.AutoTimeChartOption.options[3].series[i].data=[];
              this.AutoTimeChartOption.options[4].series[i].data=[];
              // that.AutoTimeChartOption.series[0].data[i].name = countyLegend[i];
              //折柱混合图
              // this.BarLineChartOption.series=[];
              this.BarLineChartOption.color=[];
              this.BarLineChartOption.series[i].name = [];
              this.BarLineChartOption.series[i+3].name = [];
              this.BarLineChartOption.series[i].data = [];
              this.BarLineChartOption.series[i+3].data = [];
              //雷达图
              this.RaChartOption.series[0].data[i].name = [];
              //装填数据（数据库）
              this.RaChartOption.series[0].data[i].value = [0, 0, 0, 0, 0, 0];
            }
          },
          rad(d) {
             return d * Math.PI / 180.0;
          },
          geoDistance(lat1, lng1, lat2, lng2) {
              let radLat1 = this.rad(lat1);
              let radLat2 = this.rad(lat2);
              let a = radLat1 - radLat2;
              let b = this.rad(lng1) - this.rad(lng2);
              let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
              s = s * 6378.137;// EARTH_RADIUS;
              s = Math.round(s * 10000) / 10000; //输出为公里
              return s;
          },
          //对比分析按钮
          contrastResultShow(){
            this.view.graphics.removeAll();
            this.webmap.remove(this.abcSelectionLineLayer);
            let countyLegend=[];//echarts图例数组
            let contrastPointGraphics=[];//贫困县点数组
            let contrastLineGraphics=[];//贫困县线数组
            var selectionPointSymbol = {//贫困县点样式
              type: "simple-marker",
              color: [0, 255, 255, 1],
              // style: "square",
              size: "20px",
            };
            let labelPointClass = { //贫困县点标注
              symbol: {
                type: "text",
                color: [0, 255, 255, 1],
                font: {
                  family: "Playfair Display",
                  size: 14,
                  weight: "bold"
                }
              },
              labelPlacement: "above-center",
              labelExpressionInfo: {
                expression: "$feature.name"
              }
            };
            let labelLineClass = { //贫困县点标注
              symbol: {
                type: "text",
                color: [0, 255, 255, 1],
                font: {
                  // autocast as new Font()
                  family: "Playfair Display",
                  size: 14,
                  weight: "bold"
                }
              },
              labelPlacement: "above-left",
              labelExpressionInfo: {
                expression: "$feature.distance"
              }
            };

            //清空echarts图表
            this.clearCharts();

            // this.nameabcQuery.where = "name = '"+document.getElementById("countyA").value+"'";
            this.nameabcQuery.where = "name = '"+this.dynamicTags[0]+"'";
            this.nameabcQuery.outFields = [ "name", "longitude", "latitude"];
            this.testfl.queryFeatures(this.nameabcQuery).then(response=>{
              let pointA=response.features[0];
              if(pointA){
                var graphic = response.features[0];
                //给图形赋予符号
                graphic.symbol = selectionPointSymbol; //api 4.x
                //添加到地图从而实现高亮效果
                this.view.graphics.add(graphic); //api 4.x
                contrastPointGraphics.push({
                  geometry: graphic.geometry,
                  attributes: {
                    ObjectID: contrastPointGraphics.length,
                    name: graphic.attributes["name"],
                    longitude: graphic.attributes["longitude"],
                    latitude: graphic.attributes["latitude"],
                  },
                });
                countyLegend.push(this.dynamicTags[0]);
              }
              this.nameabcQuery.where = "name = '"+this.dynamicTags[1]+"'";
              this.testfl.queryFeatures(this.nameabcQuery).then(response=>{
                let pointB=response.features[0];
                if(pointB){
                  var graphic = response.features[0];
                  //给图形赋予符号
                  graphic.symbol = selectionPointSymbol; //api 4.x
                  //添加到地图从而实现高亮效果
                  this.view.graphics.add(graphic); //api 4.x
                  contrastPointGraphics.push({
                    geometry: graphic.geometry,
                    attributes: {
                      ObjectID: contrastPointGraphics.length,
                      name: graphic.attributes["name"],
                      longitude: graphic.attributes["longitude"],
                      latitude: graphic.attributes["latitude"],
                    },
                  });
                  countyLegend.push(this.dynamicTags[1]);
                }
                this.nameabcQuery.where = "name = '"+this.dynamicTags[2]+"'";
                this.testfl.queryFeatures(this.nameabcQuery).then(response=>{
                  let pointC=response.features[0];
                  if(pointC){
                    var graphic = response.features[0];
                    //给图形赋予符号
                    graphic.symbol = selectionPointSymbol; //api 4.x
                    //添加到地图从而实现高亮效果
                    this.view.graphics.add(graphic); //api 4.x
                    contrastPointGraphics.push({
                      geometry: graphic.geometry,
                      attributes: {
                        ObjectID: contrastPointGraphics.length,
                        name: graphic.attributes["name"],
                        longitude: graphic.attributes["longitude"],
                        latitude: graphic.attributes["latitude"],
                      },
                    });
                    countyLegend.push(this.dynamicTags[2]);
                  }

                  if(countyLegend.length!=0){
                    var fields = [{
                      name: "ObjectID",
                      alias: "ObjectID",
                      type: "oid" //   每个要素必须的字段，字段值必须唯一，当做是整数类型。。。
                    }, {
                      name: "name",
                      alias: "name",
                      type: "string" //字符串类型
                    }, {
                      name: "distance",
                      alias: "distance",
                      type: "string" //字符串类型
                    }];
                    this.webmap.remove(this.abcSelectionPointLayer);

                    let abcSelectionPointLayer = new this.FeatureLayer({
                      source: contrastPointGraphics,
                      fields: fields
                    });
                    this.abcSelectionPointLayer=abcSelectionPointLayer;
                    this.abcSelectionPointLayer.labelingInfo = [labelPointClass];
                    this.webmap.add(this.abcSelectionPointLayer);

                    let polylineSymbol = {
                      type: "simple-line",  // autocasts as SimpleLineSymbol()
                      style:"short-dash",
                      color: [226, 119, 40],
                      width: 4
                    };
                    //对比两个贫困县，显示连线距离
                    if(contrastPointGraphics.length==2){
                      let abcPolyline = {
                        type: "polyline",  // autocasts as new Polyline()
                        paths: [
                          [contrastPointGraphics[0].attributes.longitude,contrastPointGraphics[0].attributes.latitude],
                          [contrastPointGraphics[1].attributes.longitude,contrastPointGraphics[1].attributes.latitude]
                        ]
                      };
                      let polylineGraphic = new this.Graphic({
                        geometry: abcPolyline,
                        symbol: polylineSymbol,
                        // attributes: polylineAtt
                      });
                      this.view.graphics.add(polylineGraphic); //api 4.x
                      contrastLineGraphics.push({
                        geometry: polylineGraphic.geometry,
                        attributes: {
                          ObjectID: contrastLineGraphics.length,
                          distance: this.geoDistance(contrastPointGraphics[0].attributes.latitude,contrastPointGraphics[0].attributes.longitude,contrastPointGraphics[1].attributes.latitude,contrastPointGraphics[1].attributes.longitude).toString()+' KM',
                        },
                      });
                      this.webmap.remove(this.abcSelectionLineLayer);

                      let abcSelectionLineLayer = new this.FeatureLayer({
                        source: contrastLineGraphics,
                        fields: fields
                      });
                      this.abcSelectionLineLayer=abcSelectionLineLayer;
                      this.abcSelectionLineLayer.labelingInfo = [labelLineClass];
                      this.webmap.add(this.abcSelectionLineLayer);
                    }
                    else if(contrastPointGraphics.length==3){
                      for(let i=0;i<contrastPointGraphics.length;i++){
                        let abcPolyline = {
                          type: "polyline",  // autocasts as new Polyline()
                          paths: [
                            [contrastPointGraphics[i].attributes.longitude,contrastPointGraphics[i].attributes.latitude],
                            [contrastPointGraphics[(i+1)%3].attributes.longitude,contrastPointGraphics[(i+1)%3].attributes.latitude]
                          ]
                        };
                        let polylineGraphic = new this.Graphic({
                          geometry: abcPolyline,
                          symbol: polylineSymbol,
                          // attributes: polylineAtt
                        });
                        this.view.graphics.add(polylineGraphic); //api 4.x
                        contrastLineGraphics.push({
                          geometry: polylineGraphic.geometry,
                          attributes: {
                            ObjectID: contrastLineGraphics.length,
                            distance: this.geoDistance(contrastPointGraphics[i].attributes.latitude,contrastPointGraphics[i].attributes.longitude,contrastPointGraphics[(i+1)%3].attributes.latitude,contrastPointGraphics[(i+1)%3].attributes.longitude).toString()+' KM',
                          },
                        });
                      }
                      this.webmap.remove(this.abcSelectionLineLayer);

                      let abcSelectionLineLayer = new this.FeatureLayer({
                        source: contrastLineGraphics,
                        fields: fields
                      });
                      this.abcSelectionLineLayer=abcSelectionLineLayer;
                      this.abcSelectionLineLayer.labelingInfo = [labelLineClass];
                      this.webmap.add(this.abcSelectionLineLayer);
                    }

                    this.isChartShow2_2=true;


                    let that=this;
                    setTimeout(function(){
                      //雷达图
                      let radar_countyabc =[
                        [0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]
                      ];
                      that.RaChartOption.legend.data=countyLegend;
                      //连接数据库，调取数据
                      for(let i=0;i<countyLegend.length;i++){
                        that.axios.get('http://localhost:3000/getguizhouproducts?name='+countyLegend[i]).then(res=>{

                          radar_countyabc[i][0]=parseInt(res.data[0]["Nong"]);
                          radar_countyabc[i][1]=parseInt(res.data[0]["Lin"]);
                          radar_countyabc[i][2]=parseInt(res.data[0]["Mu"]);
                          radar_countyabc[i][3]=parseInt(res.data[0]["Yu"]);
                          radar_countyabc[i][4]=parseInt(res.data[0]["FuWu"]);
                          //雷达图
                          that.RaChartOption.series[0].data[i].name = countyLegend[i];
                          //装填数据（数据库）
                          that.RaChartOption.series[0].data[i].value = radar_countyabc[i];
                          that.RaChart.setOption(that.RaChartOption);
                        });
                      }

                      let dataMap=[];
                      dataMap[0] = {
                        2019: [0, 0, 0, 0],
                        2018: [0, 0, 0, 0],
                        2017: [0, 0, 0, 0],
                        2016: [0, 0, 0, 0],
                        2015: [0, 0, 0, 0],
                      };
                      dataMap[1] = {
                        2019: [0, 0, 0, 0],
                        2018: [0, 0, 0, 0],
                        2017: [0, 0, 0, 0],
                        2016: [0, 0, 0, 0],
                        2015: [0, 0, 0, 0],
                      };
                      dataMap[2] = {
                        2019: [0, 0, 0, 0],
                        2018: [0, 0, 0, 0],
                        2017: [0, 0, 0, 0],
                        2016: [0, 0, 0, 0],
                        2015: [0, 0, 0, 0],
                      };
                      let barline_countyabc=[ [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0]];
                      let barlineLegend=[];
                      let barlineColor=['#3CB371','#DC143C','#FFD700'];
                      //获取历年数据
                      // var dataArr = [];
                      that.AutoTimeChartOption.baseOption.legend.data=countyLegend;
                      for(var index = 0;index <countyLegend.length;index++){
                        (()=>{
                          var i=index;
                          that.AutoTimeChartOption.baseOption.series.push({
                            name: countyLegend[i],
                            type: 'bar'
                          });

                          //折柱图
                          barlineLegend.push(countyLegend[i]);
                          that.BarLineChartOption.color.push(barlineColor[i]);
                          that.BarLineChartOption.series[i].name = countyLegend[i];
                          that.BarLineChartOption.series[i+3].name = countyLegend[i];
                          that.BarLineChartOption.series[i].data = barline_countyabc[i];
                          that.BarLineChartOption.series[i+3].data = barline_countyabc[i+3];
                          for(var y = 2015;y <= 2019;y++){
                            (()=>{
                              var year=y;
                              that.axios.get('http://localhost:3000/getguizhoudata?tablename=gz'+year+"&name="+countyLegend[i]).then(res=>{

                                if(year==2015){
                                  barline_countyabc[i][0]=parseFloat(res.data[0]["people"]);
                                  barline_countyabc[i+3][0]=parseFloat(res.data[0]["money"]);
                                  dataMap[i]['2015'][0] = parseInt(res.data[0]["total"]);
                                  dataMap[i]['2015'][1] = parseInt(res.data[0]["first"]);
                                  dataMap[i]['2015'][2] = parseInt(res.data[0]["second"]);
                                  dataMap[i]['2015'][3] = parseInt(res.data[0]["third"]);
                                  that.AutoTimeChartOption.options[0].series[i].data=dataMap[i]['2015'];
                                }
                                else if(year==2016){
                                  barline_countyabc[i][1]=parseFloat(res.data[0]["people"]);
                                  barline_countyabc[i+3][1]=parseFloat(res.data[0]["money"]);
                                  dataMap[i]['2016'][0] = parseInt(res.data[0]["total"]);
                                  dataMap[i]['2016'][1] = parseInt(res.data[0]["first"]);
                                  dataMap[i]['2016'][2] = parseInt(res.data[0]["second"]);
                                  dataMap[i]['2016'][3] = parseInt(res.data[0]["third"]);
                                  that.AutoTimeChartOption.options[1].series[i].data=dataMap[i]['2016'];
                                }
                                else if(year==2017){
                                  barline_countyabc[i][2]=parseFloat(res.data[0]["people"]);
                                  barline_countyabc[i+3][2]=parseFloat(res.data[0]["money"]);
                                  dataMap[i]['2017'][0] = parseInt(res.data[0]["total"]);
                                  dataMap[i]['2017'][1] = parseInt(res.data[0]["first"]);
                                  dataMap[i]['2017'][2] = parseInt(res.data[0]["second"]);
                                  dataMap[i]['2017'][3] = parseInt(res.data[0]["third"]);
                                  that.AutoTimeChartOption.options[2].series[i].data=dataMap[i]['2017'];
                                }
                                else if(year==2018){
                                  barline_countyabc[i][3]=parseFloat(res.data[0]["people"]);
                                  barline_countyabc[i+3][3]=parseFloat(res.data[0]["money"]);
                                  dataMap[i]['2018'][0] = parseInt(res.data[0]["total"]);
                                  dataMap[i]['2018'][1] = parseInt(res.data[0]["first"]);
                                  dataMap[i]['2018'][2] = parseInt(res.data[0]["second"]);
                                  dataMap[i]['2018'][3] = parseInt(res.data[0]["third"]);
                                  that.AutoTimeChartOption.options[3].series[i].data=dataMap[i]['2018'];
                                }
                                else if(year==2019){
                                  barline_countyabc[i][4]=parseFloat(res.data[0]["people"]);
                                  barline_countyabc[i+3][4]=parseFloat(res.data[0]["money"]);
                                  dataMap[i]['2019'][0] = parseInt(res.data[0]["total"]);
                                  dataMap[i]['2019'][1] = parseInt(res.data[0]["first"]);
                                  dataMap[i]['2019'][2] = parseInt(res.data[0]["second"]);
                                  dataMap[i]['2019'][3] = parseInt(res.data[0]["third"]);
                                  that.AutoTimeChartOption.options[4].series[i].data=dataMap[i]['2019'];
                                }
                                that.BarLineChartOption.legend.data=barlineLegend;
                                that.BLChart.setOption(that.BarLineChartOption);
                                that.ATChart.setOption(that.AutoTimeChartOption);
                              })
                            })(y);
                          }
                        })(index);
                      }
                    }, 900);
                  }
                });
              });
            });
          },
          //空间查询（QueryTask）
          queryTask(geometry) {
              this.figureQuery.geometry = geometry;
              // console.log(query.geometry);
              //执行空间查询
              this.figureqTask.execute(this.figureQuery).then(this.showQueryResult);
          },
          //执行查询
         showQueryResult(queryResult) {
            //创建面符号

            var selectionSymbol = {
                type: "simple-marker",
                color: [0, 255, 255, 1],
                // style: "square",
                size: "10px",
            };
            if (queryResult.features.length == 0) {
                return;
            };
            // console.log(queryResult.features.length);
            if (queryResult.features.length >= 1) {
                //点图形存储数组
                // var graphicsArr = [];
                //3DEcharts数据存储数组
                this.isYearSliderShow=true;
                this.isChartShow2_3_up=true;
                this.isChartShow2_3_down=true;
                for (var i = 0; i < queryResult.features.length; i++) {
                    //得到graphic
                    var graphic = queryResult.features[i];
                    //给图形赋予符号
                    graphic.symbol = selectionSymbol; //api 4.x
                    //添加到地图从而实现高亮效果
                    this.eagleview.graphics.add(graphic); //api 4.x
                    //日期转化
                    graphic.attributes["date"] =this.TimeChange(graphic.attributes["date"]);
                    //构造高亮点图形
                    this.areaSelectgraphicsArr.push({
                        geometry: graphic.geometry,
                        attributes: {
                            ObjectID: this.areaSelectgraphicsArr.length,
                            name: graphic.attributes["name"],
                            longitude: graphic.attributes["longitude"],
                            latitude: graphic.attributes["latitude"],
                            date: graphic.attributes["date"],
                            introduction: graphic.attributes["introdu"],
                            office: graphic.attributes["office"],
                            time:graphic.attributes["time"],
                            F2015:graphic.attributes["F2015"],
                            F2016:graphic.attributes["F2016"],
                            F2017:graphic.attributes["F2017"],
                            F2018:graphic.attributes["F2018"],
                            F2019:graphic.attributes["F2019"]
                        },
                    });

                    //计算Echarts数据
                    var strArr=graphic.attributes["date"].split("-");
                    this.time3DArr[12*(parseInt(strArr[0])-2017)+parseInt(strArr[1])][2]=1+this.time3DArr[12*(parseInt(strArr[0])-2017)+parseInt(strArr[1])][2];
                }

                let labelClass = {
                  symbol: {
                    type: "text",
                    color: "red",
                    font: {
                      // autocast as new Font()
                      family: "Playfair Display",
                      size: 10,
                      weight: "bold"
                    }
                  },
                  labelPlacement: "above-center",
                  labelExpressionInfo: {
                    expression: "$feature.name"
                  }
                };

                var fields = [{
                    name: "ObjectID",
                    alias: "ObjectID",
                    type: "oid" //每个要素必须的字段，字段值必须唯一，当做是整数类型。。。
                }, {
                    name: "name",
                    alias: "name",
                    type: "string" //字符串类型
                }, {
                    name: "time",
                    alias: "time",
                    type: "double" //字符串类型
                 }, {
                    name: "F2015",
                    alias: "F2015",
                    type: "double" //字符串类型
                }, {
                    name: "F2016",
                    alias: "F2016",
                    type: "double" //字符串类型
                }, {
                    name: "F2017",
                    alias: "F2017",
                    type: "double" //字符串类型
                }, {
                    name: "F2018",
                    alias: "F2018",
                    type: "double" //字符串类型
                }, {
                    name: "F2019",
                    alias: "F2019",
                    type: "double" //字符串类型
                }];
                this.webmap.remove(this.areaSelectionLayer);
                this.map3D.remove(this.areaSelection3DLayer);
                //画多边形选中点shp
                let areaSelectionLayer = new this.FeatureLayer({
                    // url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/IncidentsReport/FeatureServer/0",
                    // url: "https://services3.arcgis.com/XDzy9VWpT2sZyZqz/arcgis/rest/services/kernelDensityLayer/FeatureServer/0",
                    // spatialReference: map.spatialReference,
                    source: this.areaSelectgraphicsArr,
                    fields: fields
                });
                this.areaSelectionLayer=areaSelectionLayer;
                this.areaSelectionLayer.labelingInfo = [labelClass];
                this.webmap.add(this.areaSelectionLayer);

                this.Time3DChartOption.series[0].data=this.time3DArr.map(function(item) {
                    return {
                        value: [item[1], item[0], item[2]],
                    }
                });

                this.t3DChart.setOption(this.Time3DChartOption);


                //3D可视化
                this.view3D.ui.empty();
                //画多边形选中点shp
                let areaSelection3DLayer = new this.FeatureLayer({
                    source: this.areaSelectgraphicsArr,
                    fields: fields
                });
                this.areaSelection3DLayer=areaSelection3DLayer;
                this.areaSelection3DLayer.labelingInfo = [labelClass];
                this.map3D.add(this.areaSelection3DLayer);
                this.eagleview.goTo(
                {
                  target: [parseFloat(this.areaSelectgraphicsArr[0].attributes["longitude"]), parseFloat(this.areaSelectgraphicsArr[0].attributes["latitude"])],
                    zoom: 4
                },{
                  duration:1000
                  }
                );
                this.view3D.goTo(
                  {
                    center: [parseFloat(this.areaSelectgraphicsArr[0].attributes["longitude"]), parseFloat(this.areaSelectgraphicsArr[0].attributes["latitude"])],
                    tilt: 52,
                    heading: 355.8,
                  },{
                    duration:1000
                    }
                  );
                var params = {
                    layer: areaSelection3DLayer,
                    field: "F2015",
                    view: this.view3D,
                    // colorScheme: schemes,
                    symbolType: "3d-volumetric",
                    // minValue: parseInt(this.areaSelectgraphicsArr[0][field]/2),
                    // maxValue: parseInt(this.areaSelectgraphicsArr[0][field]*2),
                };

                this.isGDPTitleShow=false;
                let rendererResult = null;
                let that=this;
                // this.view3D.ui.remove("containerDiv");//"bottom-left"
                this.colorAndSizeRendererCreator.createContinuousRenderer(params).then((response) => {
                    // set generated renderer on the layer and add it to the map
                    rendererResult = response;
                    areaSelection3DLayer.renderer = response.renderer;
                    if (!areaSelection3DLayer.visible) {
                        areaSelection3DLayer.visible = true;
                    }

                    return that.histogram({
                        layer: areaSelection3DLayer,
                        field: params.field,
                        numBins: 40,
                        minValue: params.minValue,
                        maxValue: params.maxValue
                    });
                })
                .then((histogramResult) => {
                    // let container=document.getElementById("containerDiv");
                    let containerSlider=document.getElementById("slider");

                    // this.view3D.ui.remove(containerSlider);//"bottom-left"
                    const slider = that.ColorSizeSlider.fromRendererResult(rendererResult, histogramResult);
                    // slider.container = "slider";
                    slider.container=containerSlider;
                    slider.viewModel.precision = 0;
                    slider.labelFormatFunction = (value) => {
                        return parseInt(value.toFixed(0)).toLocaleString();
                    };
                    // slider.stops = [
                    //   { value: 25, color: "white", size: 1000 },
                    //   { value: 75, color: "dodgerblue", size: 100000 }
                    // ];
                    slider.histogramConfig.standardDeviation = null;
                    // slider.container.style.marginTop="420px";
                    // document.getElementById("containerDiv").style.marginTop="420px";
                    this.view3D.ui.add(slider);//"bottom-left"
                    this.barSlider=slider;


                    if(this.view3D.ui._components[4]){
                      this.view3D.ui._components[4].node.style.marginTop="600px";
                      this.view3D.ui._components[4].node.style.marginLeft="30px";
                    }
                    else{
                      this.view3D.ui._components[3].node.style.marginTop="600px";
                      this.view3D.ui._components[3].node.style.marginLeft="30px";
                    }

                    function changeEventHandler() {
                        const renderer = areaSelection3DLayer.renderer.clone();
                        renderer.visualVariables = slider.updateVisualVariables(renderer.visualVariables);
                        areaSelection3DLayer.renderer = renderer;
                    }
                    slider.on(["thumb-change", "thumb-drag", "min-change", "max-change"], changeEventHandler);
                    this.isGDPTitleShow=true;
                })
                .catch(console.error);
            }
          },
        //3D划区分析时间轴GDP
        changeYear3D(value){ //0为2015.。。
            this.isGDPTitleShow=false;
            let labelClass = {
                  symbol: {
                    type: "text",
                    color: "red",
                    font: {
                      // autocast as new Font()
                      family: "Playfair Display",
                      size: 10,
                      weight: "bold"
                    }
                  },
                  labelPlacement: "above-center",
                  labelExpressionInfo: {
                    expression: "$feature.name"
                  }
                };

                var fields = [{
                    name: "ObjectID",
                    alias: "ObjectID",
                    type: "oid" //每个要素必须的字段，字段值必须唯一，当做是整数类型。。。
                }, {
                    name: "name",
                    alias: "name",
                    type: "string" //字符串类型
                }, {
                    name: "time",
                    alias: "time",
                    type: "double" //字符串类型
                 }, {
                    name: "F2015",
                    alias: "F2015",
                    type: "double" //字符串类型
                }, {
                    name: "F2016",
                    alias: "F2016",
                    type: "double" //字符串类型
                }, {
                    name: "F2017",
                    alias: "F2017",
                    type: "double" //字符串类型
                }, {
                    name: "F2018",
                    alias: "F2018",
                    type: "double" //字符串类型
                }, {
                    name: "F2019",
                    alias: "F2019",
                    type: "double" //字符串类型
                }];
                this.webmap.remove(this.areaSelectionLayer);
                this.map3D.remove(this.areaSelection3DLayer);
                //画多边形选中点shp
                let areaSelectionLayer = new this.FeatureLayer({
                    source: this.areaSelectgraphicsArr,
                    fields: fields
                });
                this.areaSelectionLayer=areaSelectionLayer;
                this.areaSelectionLayer.labelingInfo = [labelClass];
                this.webmap.add(this.areaSelectionLayer);
                //3D可视化
                this.view3D.ui.empty();
                //画多边形选中点shp
                let areaSelection3DLayer = new this.FeatureLayer({
                    source: this.areaSelectgraphicsArr,
                    fields: fields
                });
                this.areaSelection3DLayer=areaSelection3DLayer;
                this.areaSelection3DLayer.labelingInfo = [labelClass];
                this.map3D.add(this.areaSelection3DLayer);

                var params = {
                    layer: areaSelection3DLayer,
                    // field: field,
                    view: this.view3D,
                    // colorScheme: schemes,
                    symbolType: "3d-volumetric",
                    // minValue: parseInt(this.areaSelectgraphicsArr[0][field]/2),
                    // maxValue: parseInt(this.areaSelectgraphicsArr[0][field]*2),
                };
                this.yearmarks["0"].style.color='#fff';
                this.yearmarks["5"].style.color='#fff';
                this.yearmarks["10"].style.color='#fff';
                this.yearmarks["15"].style.color='#fff';
                this.yearmarks["20"].style.color='#fff';
                switch (value) {
                    case 0: //2015

                        params.field="F2015";
                        this.yearmarks["0"].style.color='#FFD700';
                        break;
                    case 5: //2016

                        params.field="F2016";
                        this.yearmarks["5"].style.color='#FFD700';
                        break;
                    case 10: //2017

                        params.field="F2017";
                        this.yearmarks["10"].style.color='#FFD700';
                        break;
                    case 15: //2018

                        params.field="F2018";
                        this.yearmarks["15"].style.color='#FFD700';
                        break;
                    case 20: //2019

                        params.field="F2019";
                        this.yearmarks["20"].style.color='#FFD700';
                }
                // let field="F"+(2015+this.yearSlidervalue/5).toString();

                let rendererResult = null;
                let that=this;
                // this.view3D.ui.remove("containerDiv");//"bottom-left"
                this.colorAndSizeRendererCreator.createContinuousRenderer(params).then((response) => {
                    // set generated renderer on the layer and add it to the map
                    rendererResult = response;
                    areaSelection3DLayer.renderer = response.renderer;
                    if (!areaSelection3DLayer.visible) {
                        areaSelection3DLayer.visible = true;
                    }

                    return that.histogram({
                        layer: areaSelection3DLayer,
                        field: params.field,
                        numBins: 40,
                        minValue: params.minValue,
                        maxValue: params.maxValue
                    });
                })
                .then((histogramResult) => {
                    // let container=document.getElementById("containerDiv");
                    let containerSlider=document.getElementById("slider");

                    // this.view3D.ui.remove(containerSlider);//"bottom-left"
                    const slider = that.ColorSizeSlider.fromRendererResult(rendererResult, histogramResult);
                    // slider.container = "slider";
                    slider.container=containerSlider;
                    slider.viewModel.precision = 0;
                    slider.labelFormatFunction = (value) => {
                        return parseInt(value.toFixed(0)).toLocaleString();
                    };
                    // slider.stops = [
                    //   { value: 25, color: "white", size: 1000 },
                    //   { value: 75, color: "dodgerblue", size: 100000 }
                    // ];
                    slider.histogramConfig.standardDeviation = null;
                    // slider.container.style.marginTop="420px";
                    // document.getElementById("containerDiv").style.marginTop="420px";
                    this.view3D.ui.add(slider);//"bottom-left"

                    this.isGDPTitleShow=true;
                    if(this.view3D.ui._components[4]){
                      this.view3D.ui._components[4].node.style.marginTop="600px";
                      this.view3D.ui._components[4].node.style.marginLeft="30px";
                    }
                    else{
                      this.view3D.ui._components[3].node.style.marginTop="600px";
                      this.view3D.ui._components[3].node.style.marginLeft="30px";
                    }

                    function changeEventHandler() {
                        const renderer = areaSelection3DLayer.renderer.clone();
                        renderer.visualVariables = slider.updateVisualVariables(renderer.visualVariables);
                        areaSelection3DLayer.renderer = renderer;
                    }
                    slider.on(["thumb-change", "thumb-drag", "min-change", "max-change"], changeEventHandler);

                    // let containerSlider=document.getElementById("slider");
                    // var titleSlider = document.createElement('div');
                    // titleSlider.innerHTML = '人均GDP(元)';

                    // document.getElementById("slider").appendChild(titleSlider);
                    // containerSlider.innerHTML="<div id='sliderTitle'>人均GDP(元)</div>";
                    // let titleSlider=document.getElementById("sliderTitle");
                    // titleSlider.style.fontSize="20px";
                    // titleSlider.style.textAlign="center";
                    // titleSlider.style.fontWeight="bold";
                    // titleSlider.style.paddingTop="10px";
                })
                .catch(console.error);

        },
        handleAreaModeDiv(value){
          //先除去上一次点击的要素
            this.eagleview.graphics.removeAll();
            this.graphicsLayer.graphics.removeAll();
            this.graphicsLayer2.graphics.removeAll();
            this.webmap.remove(this.areaSelectionLayer);
            this.map3D.remove(this.areaSelection3DLayer);
            this.areaSelectmode=0;
            this.eagleview.ui.remove(this.sketch);
            this.testfpl.visible = true;
            this.testfl.visible = true;
            this.basemap.visible = true;
            for(var i=0;i<48;i++){
              this.time3DArr[i][2]=0;
            }
            this.Time3DChartOption.series[0].data=this.time3DArr.map(function(item) {
                return {
                    value: [item[1], item[0], item[2]],
                }
            });
            this.t3DChart.setOption(this.Time3DChartOption);
            this.areaSelectgraphicsArr=[];
            //视角转换
            let pt = new this.Point({
              latitude: 32,
              longitude: 116.3
            });
            this.view.goTo(
            {
              target: pt,
                zoom: 4
            },{
              duration:1000
              }
            );

          if(value==1){
            document.getElementById('Area3D').style.width="590px";
            this.IsProvinceDivShow=true;
            this.IsConnectDivShow=false;
          }
          else if(value==2){
            this.isChartShow2_3_up=true;
            this.isChartShow2_3_down=true;
            document.getElementById('Area3D').style.width="290px";
            this.IsProvinceDivShow=false;
            this.IsConnectDivShow=false;
            this.eagleview.ui.add(this.sketch);// "bottom-left"
          }
          else{
            document.getElementById('Area3D').style.width="590px";
            this.IsProvinceDivShow=false;
            this.IsConnectDivShow=true;
          }
        },
        querySearch_provinceArea(queryString, cb) {
          var provinceArea = this.provinceArea;
          var results = queryString ? provinceArea.filter(this.createFilter_provinceArea(queryString)) : provinceArea;
          // 调用 callback 返回建议列表的数据
          cb(results);
        },
        createFilter_provinceArea(queryString) {
          return (provinceArea) => {
            return (provinceArea.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
          };
        },
        loadAll_provinceArea() {
          return [
            { "value": "甘肃省", "address": "长宁区新渔路144号" },
            { "value": "广西壮族自治区", "address": "上海市长宁区淞虹路661号" },
            { "value": "新疆维吾尔自治区", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
            { "value": "西藏自治区", "address": "嘉定区曹安公路2383弄55号" },
            { "value": "青海省", "address": "天山西路438号" },
            { "value": "宁夏回族自治区", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
            { "value": "内蒙古自治区", "address": "上海市长宁区金钟路633号" },
            { "value": "贵州省", "address": "上海市嘉定区曹安公路曹安路1685号" },
            { "value": "四川省", "address": "上海市普陀区同普路1435号" },
            { "value": "云南省", "address": "上海市北翟路1444弄81号B幢-107" },
            { "value": "湖南省", "address": "上海市嘉定区新郁路817号" },
            { "value": "湖北省", "address": "嘉定区曹安路1611号" },
            { "value": "河北省", "address": "嘉定区曹安路1611号" },
            { "value": "重庆市", "address": "嘉定区曹安公路2383弄55号" },
            { "value": "吉林省", "address": "嘉定区曹安公路2383弄55号" },
            { "value": "陕西省", "address": "嘉定区曹安公路2383弄55号" },
          ];
        },
        handleSelect_provinceArea(item) {
            this.eagleview.graphics.removeAll();
            this.graphicsLayer.graphics.removeAll();
            this.graphicsLayer2.graphics.removeAll();
            this.webmap.remove(this.areaSelectionLayer);
            this.map3D.remove(this.areaSelection3DLayer);
            for(var i=0;i<48;i++){
              this.time3DArr[i][2]=0;
            }
            this.Time3DChartOption.series[0].data=this.time3DArr.map(function(item) {
                return {
                    value: [item[1], item[0], item[2]],
                }
            });
            this.t3DChart.setOption(this.Time3DChartOption);
            this.areaSelectgraphicsArr=[];
            this.provinceQuery.where = "name = '"+item.value+"'";
            // this.connectareaQuery.outFields = [ "name", "longitude", "latitude"];
            this.testfpl.queryFeatures(this.provinceQuery).then(response=>{

              var pro = response.features[0]
              var color="#ffffcc";
              //设置填充样式
              const symbol = {
                type: "simple-fill",
                color: color,
                outline: null
              };
              this.queryTask(pro.geometry);
              //视角变换
              // this.eagleview.goTo(
              //   {
              //     target: eagleview.toMap(event),
              //     extent: pro.geometry.extent.clone().expand(1.8),
              //     zoom:5
              //   },
              //   {duration: 1000}
              // );
              pro.symbol = symbol;
              this.graphicsLayer.graphics.add(pro);
              this.testfl.visible = false;
            });
        },
        querySearch_connectArea(queryString, cb) {
          var connectArea = this.connectArea;
          var results = queryString ? connectArea.filter(this.createFilter_connectArea(queryString)) : connectArea;
          // 调用 callback 返回建议列表的数据
          cb(results);
        },
        createFilter_connectArea(queryString) {
          return (connectArea) => {
            return (connectArea.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
          };
        },
        loadAll_connectArea() {
          return [
            { "value": "六盘山片区", "address": "长宁区新渔路144号" },
            { "value": "武陵山片区", "address": "上海市长宁区淞虹路661号" },
            { "value": "乌蒙山片区", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
            { "value": "秦巴山片区", "address": "嘉定区曹安公路2383弄55号" },
            { "value": "滇桂黔石漠化片区", "address": "天山西路438号" },
            { "value": "大兴安岭南麓片区", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
            { "value": "燕山-太行山片区", "address": "上海市长宁区金钟路633号" },
            { "value": "吕梁山片区", "address": "上海市嘉定区曹安公路曹安路1685号" },
            { "value": "罗霄山片区", "address": "上海市普陀区同普路1435号" },
            { "value": "大别山片区", "address": "上海市北翟路1444弄81号B幢-107" },
            { "value": "滇西边境片区", "address": "上海市嘉定区新郁路817号" },
            { "value": "西藏片区", "address": "嘉定区曹安路1611号" },
            { "value": "四省藏区片区", "address": "嘉定区曹安路1611号" },
            { "value": "新疆南疆三地州片区", "address": "嘉定区曹安公路2383弄55号" },
          ];
        },

        handleSelect_connectArea(item) {
            this.eagleview.graphics.removeAll();
            this.graphicsLayer.graphics.removeAll();
            this.graphicsLayer2.graphics.removeAll();
            this.webmap.remove(this.areaSelectionLayer);
            this.map3D.remove(this.areaSelection3DLayer);
            for(var i=0;i<48;i++){
              this.time3DArr[i][2]=0;
            }
            this.Time3DChartOption.series[0].data=this.time3DArr.map(function(item) {
                return {
                    value: [item[1], item[0], item[2]],
                }
            });
            this.t3DChart.setOption(this.Time3DChartOption);
            this.areaSelectgraphicsArr=[];
            this.connectareaQuery.where = "belonging = '"+item.value+"'";
            // this.connectareaQuery.outFields = [ "name", "longitude", "latitude"];
            this.testfl.queryFeatures(this.connectareaQuery).then(response=>{

              this.showQueryResult(response);
            });
        },
         provinceSelect(){
            if(this.areaSelectmode==1){
              //先除去上一次点击的要素
              this.eagleview.graphics.removeAll();
              this.graphicsLayer.graphics.removeAll();
              this.graphicsLayer2.graphics.removeAll();
              this.webmap.remove(this.areaSelectionLayer);
              // this.map3D.remove(this.areaSelection3DLayer);
              this.areaSelectmode=0;
              // this.isChartShow2_3_right=false;
              // this.isChartShow2_3_left=false;
              this.testfpl.visible = true;
              this.testfl.visible = true;
              this.basemap.visible = true;
              for(var i=0;i<48;i++){
                this.time3DArr[i][2]=0;
              }
              this.Time3DChartOption.series[0].data=this.time3DArr.map(function(item) {
                  return {
                      value: [item[1], item[0], item[2]],
                  }
              });
              this.t3DChart.setOption(this.Time3DChartOption);
              this.areaSelectgraphicsArr=[];
              //视角转换
              let pt = new this.Point({
                latitude: 32,
                longitude: 116.3
              });
              this.view.goTo(
              {
                target: pt,
                  zoom: 4
              },{
                duration:1000
                }
              );
            }
            else if(this.areaSelectmode==0){
              this.areaSelectmode=1;
            }
          },
         sketchAreaSelect(){
            if(this.areaSelectmode==0){
              this.areaSelectmode=2;
              this.eagleview.ui.add(this.sketch);// "bottom-left"
            }
            else if(this.areaSelectmode==2){
              this.areaSelectmode=0;
              //先除去上一次点击的要素
              this.eagleview.graphics.removeAll();
              this.graphicsLayer.graphics.removeAll();
              this.graphicsLayer2.graphics.removeAll();
              this.webmap.remove(this.areaSelectionLayer);
              // this.map3D.remove(this.areaSelection3DLayer);
              this.eagleview.ui.remove(this.sketch);
              // this.isChartShow2_3_right=false;
              // this.isChartShow2_3_left=false;
              for(var i=0;i<48;i++){
                this.time3DArr[i][2]=0;
              }
              this.Time3DChartOption.series[0].data=this.time3DArr.map(function(item) {
                  return {
                      value: [item[1], item[0], item[2]],
                  }
              });
              this.t3DChart.setOption(this.Time3DChartOption);
              this.areaSelectgraphicsArr=[];
            }
          },
         connectedAreaSelect(){
            if(this.areaSelectmode==0){
              this.areaSelectmode=3;
              let connetObj=document.getElementById("connectedAreaOption");
              let connetName=connetObj.options[connetObj.selectedIndex].text
              // console.log(connetObj.options[connetObj.selectedIndex].text);
              this.connectareaQuery.where = "belonging = '"+connetName+"'";
              // this.connectareaQuery.outFields = [ "name", "longitude", "latitude"];
              this.testfl.queryFeatures(this.connectareaQuery).then(response=>{

                this.showQueryResult(response);
              });
            }
            else if(this.areaSelectmode==3){
              this.areaSelectmode=0;
              //先除去上一次点击的要素
              this.eagleview.graphics.removeAll();
              this.graphicsLayer.graphics.removeAll();
              this.graphicsLayer2.graphics.removeAll();
              this.webmap.remove(this.areaSelectionLayer);
              // this.map3D.remove(this.areaSelection3DLayer);
              for(var i=0;i<48;i++){
                this.time3DArr[i][2]=0;
              }
              this.Time3DChartOption.series[0].data=this.time3DArr.map(function(item) {
                  return {
                      value: [item[1], item[0], item[2]],
                  }
              });
              this.t3DChart.setOption(this.Time3DChartOption);
              this.areaSelectgraphicsArr=[];
            }
          },
          //鼠标点击缩放Div
          mouseGetDirection(ev) {
            let xP, yP, offset, dir;
            dir = '';

            xP = ev.offsetX;
            yP = ev.offsetY;
            offset = 10;

            if (yP < offset) dir += 'n';
            else if (yP > this.c.offsetHeight - offset) dir += 's';
            if (xP < offset) dir += 'w';
            else if (xP > this.c.offsetWidth - offset) dir += 'e';

            return dir;
        },
        mouseUp() {
            this.resizeable = false;
        },
        mouseDown(e) {
            let d = this.mouseGetDirection(e)
                // 当位置为四个边和四个角时才开启尺寸修改
            if (d !== '') {
                this.resizeable = true
                this.direc = d
                this.clientX = e.clientX
                this.clientY = e.clientY
            }
        },
        mouseMove(e) {
            let d = this.mouseGetDirection(e);
            let cursor;
            if (d === '') cursor = 'default';
            else cursor = d + '-resize';
            // 修改鼠标显示效果
            this.c.style.cursor = cursor;
            // 当开启尺寸修改时，鼠标移动会修改div尺寸
            if (this.resizeable) {
                // 鼠标按下的位置在右边，修改宽度
                if (this.direc.indexOf('e') !== -1) {
                    this.c.style.width = Math.max(this.minW, this.c.offsetWidth + (e.clientX - this.clientX)) + 'px'
                    this.clientX = e.clientX
                }

                // 鼠标按下的位置在上部，修改高度
                if (this.direc.indexOf('s') !== -1) {
                    this.c.style.height = Math.max(this.minH, this.c.offsetHeight + (this.clientY - e.clientY)) + 'px'
                    this.clientY = e.clientY
                }
                // 鼠标按下的位置在底部，修改高度
                if (this.direc.indexOf('n') !== -1) {
                    this.c.style.height = Math.max(this.minH, this.c.offsetHeight + (e.clientY - this.clientY)) + 'px'
                    this.clientY = e.clientY
                }
                // 鼠标按下的位置在左边，修改宽度
                if (this.direc.indexOf('w') !== -1) {
                    this.c.style.width = Math.max(this.minW, this.c.offsetWidth + (this.clientX - e.clientX)) + 'px'
                    this.clientX = e.clientX
                }
            }
        },
          //地图打印函数
          printMap(){
            let _this=this;
            this.printTask.execute(this.params,_this).then(function(data) { //printResult printError
                window.open(data.url, "_blank");
                _this.isLoading=false;

                // this.isLoading=false;
                //console.log(data["url"]);
            }, function(_this) {
              alert(Error);

              _this.isLoading=false;
            });
          },
          tableToExcel(jsonData){
            //列标题，逗号隔开，每一个逗号就是隔开一个单元格
            let str = `Id,名称,经度,纬度,脱贫日期,官网\n`;
            //增加\t为了不让表格显示科学计数法或者其他格式
            for(let i = 0 ; i < jsonData.length ; i++ ){
              for(let item in jsonData[i].attributes){
                  if(jsonData[i].attributes!="time"){
                    str+=`${jsonData[i].attributes[item] + '\t'},`;
                  }
              }
              str+='\n';
            }
            //encodeURIComponent解决中文乱码
            let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
            //通过创建a标签实现
            let link = document.createElement("a");
            link.href = uri;
            //对下载的文件命名
            link.download =  "json数据表.csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          },
          //帮扶轨迹函数
          changeAutoCurve(){
            var color = ['#de1c31', '#12a182', '#813c85', '#11659a', '#fed71a', '#8e804b', '#f9723d', '#f9e8d0', '#e16c96','#28FF28','#FCFCFC','#CECEFF','#708090','	#4DFFFF','#FF359A','#AD5A5A','#B3D9D9'];
            var series = [];
            let that=this;
            [
                ['甘肃省', this.GanSuData],
                ['广西壮族自治区', this.GuangXiData],
                ['新疆维吾尔自治区', this.XinJiangData],
                ['西藏自治区', this.XiZangData],
                ['青海省', this.QingHaiData],
                ['宁夏回族自治区', this.NingXiaData],
                ['内蒙古自治区', this.NeiMengGuData],
                ['贵州省', this.GuiZhouData],
                ['四川省', this.SiChuanData],
                ['云南省', this.YunNanData],
                ['湖南省', this.HuNanData],
                ['湖北省', this.HuBeiData],
                ['河北省', this.HeBeiData],
                ['重庆市', this.ChongQingData] ,
                ['吉林省', this.JiLinData],
                ['陕西省', this.ShanXiData]
            ].forEach(function(item, i) {
                series.push({
                    name: item[0] + ' Top10',
                    type: 'lines',
                    coordinateSystem: 'arcgis',
                    // zlevel: 1,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength:0.7,
                        color: '#fff',
                        symbolSize: 3
                    },
                    lineStyle: {
                        // normal: {
                            color: color[i],
                            width: 1,
                            curveness: 0.2,
                            opacity: 0.2,
                        // }
                    },
                    data: that.convertData(item[1])
                }, {
                    name: item[0] + ' Top10',
                    type: 'lines',
                    coordinateSystem: 'arcgis',
                    // zlevel: 1,
                    symbol: ['none', 'arrow'],
                    symbolSize: 10,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0.1,
                        symbol: "pin", //'image://./f.png', //planePath,,
                        symbolSize: 8,
                        "color": "#FFE53B"
                    },
                    lineStyle: {
                        // normal: {
                            color: color[i],
                            width: 1.5,
                            opacity: 0.6,
                            curveness: 0.2
                        // }
                    },
                    data: that.convertData(item[1])
                });
            });

            var option = {

                series: series
            };
            this.allSeries=series;
            this.autoLinecChart.setChartOption(option);
          },
          //空间分析切换分析图层
          handlespatialAnalystClick(tab, event){
            this.testView.ui.remove(this.legendE);
            this.testView.ui.remove(this.legendHotSpot);
            this.testView.ui.remove(this.legendCluster);
            // this.spatialAnalystMode=tab.index;
            if(this.spatialAnalystMode=="1"){//标准差椭圆
              //缩放至全国
              this.view.goTo(
              {
                target: [109.3, 36.5],
                  zoom: 5
              },{
                duration:1000
                }
              );
              document.getElementById('spatialAnalyst').style.height="106px";
              this.webmap.remove(this.HotSpotGZ);
              this.webmap.remove(this.ClusterGZ);
              this.handleCheckedYearsChange_1(this.spatialYearList_1);
              // console.log(this.spatialYearList_1);
            }
            else if(this.spatialAnalystMode=="2"){//冷热点分析
              //缩放至贵州
              this.view.goTo(
                {
                  target: [106.707410,26.598194],
                  zoom:7
                },
                {duration: 1000}
              );
              document.getElementById('spatialAnalyst').style.height="154px";
              this.webmap.remove(this.standardEllipse);
              this.webmap.remove(this.meanCenter);
              this.webmap.remove(this.ClusterGZ);
              this.handleCheckedYearsChange_2(this.spatialYear_2);
            }
            else if(this.spatialAnalystMode=="3"){//聚类分析
              //缩放至贵州
              this.view.goTo(
                {
                  target: [106.707410,26.598194],
                  zoom:7
                },
                {duration: 1000}
              );
              document.getElementById('spatialAnalyst').style.height="154px";
              this.webmap.remove(this.standardEllipse);
              this.webmap.remove(this.meanCenter);
              this.webmap.remove(this.HotSpotGZ);
              this.handleCheckedYearsChange_3(this.spatialYearList_3);
            }
            // console.log(this.spatialAnalystMode);
            // console.log(event);
          },
          //空间分析标准差椭圆
          handleCheckedYearsChange_1(value){
            // this.testView.ui.add(this.legendC,"bottom-left");
            // this.spatialYearList=value;
            //移除图层
            this.webmap.remove(this.standardEllipse);
            this.webmap.remove(this.meanCenter);
            //添加图层
            if(value.length!=0){
              this.webmap.add(this.standardEllipse);
              this.webmap.add(this.meanCenter);
              let queryStrE="Range = '"+this.ellipseMode+value[0]+"'";
              let queryStrC="year_pro = '"+this.ellipseMode+value[0]+"'";

              for(let i=1;i<value.length;i++){
                queryStrE+="OR Range = '"+this.ellipseMode+value[i]+"'";
                queryStrC+="OR year_pro = '"+this.ellipseMode+value[i]+"'";
              }
              this.meanCenter.definitionExpression = queryStrC;
              this.standardEllipse.definitionExpression = queryStrE;

              this.testView.ui.add(this.legendE,"bottom-left");
            }
          },
          //冷热点分析
          handleCheckedYearsChange_2(value){
            this.webmap.remove(this.HotSpotGZ);
            let fieldString="F2015NLMY";
            switch (value) {
                case 2: //2015
                    switch(this.spotClusterTarget){
                      case 1:
                        fieldString="F2015GDP";
                        break;
                      case 2:

                        fieldString="F2015NC";
                        break;
                      case 3:
                        fieldString="F2015NLMY";
                    }
                    break;
                case 4: //2016
                    switch(this.spotClusterTarget){
                      case 1:
                        fieldString="F2016GDP";
                        break;
                      case 2:

                        fieldString="F2016NC";
                        break;
                      case 3:
                        this.hotSpotrRenderer.field="F2016NMLY";
                    }
                    break;
                case 6: //2017
                    switch(this.spotClusterTarget){
                      case 1:
                        fieldString="F2017GDP";
                        break;
                      case 2:
                        fieldString="F2017NC";
                        break;
                      case 3:
                        fieldString="F2017NMLY";
                    }
                    break;
                case 8: //2018
                    switch(this.spotClusterTarget){
                      case 1:
                        fieldString="F2018GDP";
                        break;
                      case 2:
                        fieldString="F2018NC";
                        break;
                      case 3:
                        fieldString="F2018NMLY";
                    }
                    break;
                case 10: //2019
                    switch(this.spotClusterTarget){
                      case 1:
                        fieldString="F2019GDP";
                        break;
                      case 2:
                        fieldString="F2019NC";
                        break;
                      case 3:
                        fieldString="F2019NMLY";
                    }
            }
            let hotSpotRenderer = new this.ClassBreaksRenderer({
              field: fieldString,
              legendOptions: {
                title: " "
              },
              classBreakInfos: [
                {
                  minValue: -3,
                  maxValue: -3,
                  symbol: this.hotSpotSymbol[0],
                  label: "Cold Spot - 99% Confidence"
                },
                {
                  minValue: -2,
                  maxValue: -2,
                  symbol: this.hotSpotSymbol[1],
                  label: "Cold Spot - 95% Confidence"
                },
                {
                  minValue: -1,
                  maxValue: -1,
                  symbol: this.hotSpotSymbol[2],
                  label: "Cold Spot - 90% Confidence"
                },
                {
                  minValue: 0,
                  maxValue: 0,
                  symbol: this.hotSpotSymbol[3],
                  label: "Not Significant"
                },
                {
                  minValue: 1,
                  maxValue: 1,
                  symbol: this.hotSpotSymbol[4],
                  label: "Hot Spot - 90% Confidence"
                },
                {
                  minValue: 2,
                  maxValue: 2,
                  symbol: this.hotSpotSymbol[5],
                  label: "Hot Spot - 95% Confidence"
                },
                {
                  minValue: 3,
                  maxValue: 3,
                  symbol: this.hotSpotSymbol[6],
                  label: "Hot Spot - 99% Confidence"
                }
              ]
            });
            this.hotSpotRenderer=hotSpotRenderer;
            this.HotSpotGZ.renderer = this.hotSpotRenderer;
            this.webmap.add(this.HotSpotGZ);
            this.testView.ui.add(this.legendHotSpot,"bottom-left");
          },
          handleCheckedYearsChange_3(value){
            this.webmap.remove(this.HotSpotGZ);
            let fieldString="F2015NLMY";
            switch (value) {
                case 2: //2015
                    switch(this.spotClusterTarget){
                      case 1:
             ;
                        fieldString="F2015GDP";
                        break;
                      case 2:

                        fieldString="F2015NC";
                        break;
                      case 3:
                        fieldString="F2015NLMY";
                    }
                    break;
                case 4: //2016
                    switch(this.spotClusterTarget){
                      case 1:
                        fieldString="F2016GDP";
                        break;
                      case 2:
                        fieldString="F2016NC";
                        break;
                      case 3:
                        this.hotSpotrRenderer.field="F2016NMLY";
                    }
                    break;
                case 6: //2017
                    switch(this.spotClusterTarget){
                      case 1:
                        fieldString="F2017GDP";
                        break;
                      case 2:
                        fieldString="F2017NC";
                        break;
                      case 3:
                        fieldString="F2017NMLY";
                    }
                    break;
                case 8: //2018
                    switch(this.spotClusterTarget){
                      case 1:
                        fieldString="F2018GDP";
                        break;
                      case 2:
                        fieldString="F2018NC";
                        break;
                      case 3:
                        fieldString="F2018NMLY";
                    }
                    break;
                case 10: //2019
                    switch(this.spotClusterTarget){
                      case 1:
                        fieldString="F2019GDP";
                        break;
                      case 2:
                        fieldString="F2019NC";
                        break;
                      case 3:
                        fieldString="F2019NMLY";
                    }
            }
            let clusterRenderer = new this.ClassBreaksRenderer({
              field: fieldString,
              legendOptions: {
                title: " "
              },
              classBreakInfos: [
                {
                  minValue: -2,
                  maxValue: -2,
                  symbol: this.hotSpotSymbol[0],
                  label: "低-低 聚类"
                },
                {
                  minValue: -1,
                  maxValue: -1,
                  symbol: this.hotSpotSymbol[1],
                  label: "低-高 离群"
                },
                {
                  minValue: 0,
                  maxValue: 0,
                  symbol: this.hotSpotSymbol[2],
                  label: "无显著性"
                },
                {
                  minValue: 1,
                  maxValue: 1,
                  symbol: this.hotSpotSymbol[3],
                  label: "高-低 离群"
                },
                {
                  minValue: 2,
                  maxValue: 2,
                  symbol: this.hotSpotSymbol[4],
                  label: "低-低 聚类"
                }
              ]
            });
            this.clusterRenderer=clusterRenderer;
            this.ClusterGZ.renderer = this.clusterRenderer;
            this.webmap.add(this.ClusterGZ);
            this.testView.ui.add(this.legendCluster,"bottom-left");
          },
          //切换分析指标
          handleSpotClusterTarget(value){
            switch (this.spatialAnalystMode) {
                case "1":

                  this.handleCheckedYearsChange_1(this.spatialYearList_1);
                  break;
                case "2":

                  this.handleCheckedYearsChange_2(this.spatialYear_2);
                  break;
                case "3":

                  this.handleCheckedYearsChange_3(this.spatialYear_3);
            }

          },
          selectEvent(index) {
            this.anaShow=false;
              this.isGDPTitleShow=false;
              this.Is2DShow=true;
              this.testView.ui.add(this.legendd,"bottom-left");
              this.testView.ui.remove(this.legendE);
              this.testfl.visible=true;
              this.view.graphics.removeAll();
              this.graphicsLayer.graphics.removeAll();
              this.graphicsLayer2.graphics.removeAll();
              this.isChartShow2_3_up=false;
              this.isChartShow2_3_down=false;
              this.testView.ui.remove(this.legendE);
              this.testView.ui.remove(this.legendHotSpot);
              this.testView.ui.remove(this.legendCluster);
              this.webmap.remove(this.abcSelectionLineLayer);
              this.webmap.remove(this.abcSelectionPointLayer);
              this.webmap.remove(this.areaSelectionLayer);
              this.webmap.remove(this.meanCenter);
              this.webmap.remove(this.HotSpotGZ);
              this.webmap.remove(this.ClusterGZ);
              this.webmap.remove(this.standardEllipse);
              this.webmap.remove(this.meanCenter);
              if(this.autoLinecChart.chart&&this.autoLinecChart.chart._chartsViews.length!=0){
                this.autoLinecChart.removeLayer();
              }
              //点击聚类图菜单的聚合图按钮
              if (index == "1-2") {
                this.$refs.closeLegendChild.style.top = '39.4%';
                this.$refs.closeLegendChild.style.left = '1.5%';
                this.$refs.closeLegendChild.style.width = '200px';
                if(this.legendShow == false) this.testView.ui.remove(this.legendd);

                this.windowShow(12);
                this.testfl.definitionExpression = "time >= 0";
                this.$refs["timeChild"].alreadyRun = 0;//重置时间轴长度
                this.changeArea(this.$refs["timeChild"].alreadyRun);//渲染萤火地图
                this.$refs["timeChild"].rendType = "fireFly";
                this.changeCluster();//渲染图
              }
              //点击导航菜单的热力图按钮
              else if (index == "1-3") {
                // 39.4% 		1.5% 200px
                this.$refs.closeLegendChild.style.top = '80%';
                this.$refs.closeLegendChild.style.left = '1%';
                this.$refs.closeLegendChild.style.width = '160px';
                if(this.legendShow == false) this.testView.ui.remove(this.legendd);

                this.windowShow(13);
                this.testfl.featureReduction = null;
                this.$refs["timeChild"].rendType = "heat";
                this.testfl.definitionExpression = "time >= 0";
                this.$refs["timeChild"].alreadyRun = 0;//重置时间轴长度
                this.changeHeatmap(this.$refs["timeChild"].alreadyRun);//渲染图
              }

              //点击导航菜单的渐隐藏按钮
              else if (index == "1-4") {
                this.$refs.closeLegendChild.style.top = '76.5%';
                this.$refs.closeLegendChild.style.left = '1%';
                this.$refs.closeLegendChild.style.width = '175px';
                if(this.legendShow == false) this.testView.ui.remove(this.legendd);

                this.windowShow(14);
                this.testfl.featureReduction = null;
                this.$refs["timeChild"].rendType = "jY";
                this.$refs["timeChild"].alreadyRun = 0;//重置时间轴长度
                this.changeNoSee(this.$refs["timeChild"].alreadyRun);//渲染图
              }

              //点击导航菜单的分散萤火按钮
              else if (index == "1-5") {
                this.$refs.closeLegendChild.style.top = '74%';
                this.$refs.closeLegendChild.style.left = '1%';
                this.$refs.closeLegendChild.style.width = '205px';
                if(this.legendShow == false) this.testView.ui.remove(this.legendd);

                this.windowShow(15);
                this.testfl.featureReduction = null;
                this.testfl.definitionExpression = "time >= 0";
                this.$refs["timeChild"].rendType = "fireFly";
                this.$refs["timeChild"].alreadyRun = 0;//重置时间轴长度
                this.changeArea(this.$refs["timeChild"].alreadyRun);//渲染萤火地图
                //设置图例
              }

              //点击帮扶轨迹图
              else if(index=="1-6"){
              this.view.goTo(
                {
                  target: [109.3, 36.5],
                    zoom: 5
                },{
                  duration:1000
                  }
                );
                // this.autoLinecChart.setVisible(true);
                let autoLinecChart = new this.echartsLayer(this.testView,this.$echarts);
                this.autoLinecChart=autoLinecChart;
                this.changeAutoCurve();
                this.testfl.featureReduction = null;
                this.testfl.definitionExpression = "time <= 0";
                // this.changeNoSee(0);//渲染图
                this.windowShow(16);

              }

              //空间分析
              else if (index == "2-1"){
                this.anaShow = true;
                this.filterShow=false;
                this.testView.ui.remove(this.legendd);
                this.testfl.visible=false;
                // this.testfl.featureReduction = null;
                // this.testfl.definitionExpression = "time >= 0";
                // this.changeNoSee(0);//渲染图
                this.windowShow(21);
              }
              //贫困县对比分析
              else if (index == "2-2"){
                this.anaShow = true;
                this.filterShow=false;
                this.testfl.featureReduction = null;
                this.testfl.definitionExpression = "time >= 0";
                this.changeNoSee(0);//渲染图
                this.windowShow(22);
              }
              //划区分析
              else if(index=="2-3"){
                this.anaShow = true;
                document.getElementById('Area3D').style.width="290px";
                this.IsProvinceDivShow=false;
                this.IsConnectDivShow=false;
                this.view3D.ui.remove(this.barSlider);
                this.map3D.remove(this.areaSelection3DLayer);
                this.areaMode='';
                this.filterShow=false;
                this.Is2DShow=false;
                this.windowShow(23);
                this.testfl.featureReduction = null;
                this.testfl.definitionExpression = "time >= 0";
                this.changeNoSee(0);//渲染图

                // this.$refs["timeChild"].rendType = "fireFly";
                // this.$refs["timeChild"].alreadyRun = 0;//重置时间轴长度
                // this.changeArea(this.$refs["timeChild"].alreadyRun);//渲染萤火地图
              }
              else if(index == "6"){
                this.$router.replace("/register");
              }
              else if(index=="4"){
                  this.filterShow = !this.filterShow;

              }
              //全图打印pdf
              else if(index=="5"){
                // this.windowShow(51);
                this.isLoading=true;
                this.printMap();
              }
          },

          convertData(data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var fromCoord = this.geoCoordMap[dataItem[1].name];
                    var toCoord = this.geoCoordMap[dataItem[0].name];
                    if (fromCoord && toCoord) {
                        res.push({
                            fromName: dataItem[1].name,
                            toName: dataItem[0].name,
                            coords: [fromCoord, toCoord],
                            value: dataItem[1].value
                        });
                    }
                }
                return res;
          },

          //返回主界面
          back(){
            //修改url
            this.targetUrl = 'http://www.cpad.gov.cn/';

            //修改标签
            this.btnShow=true;

            this.isS=false;
            //将地图复原
            //先除去上一次点击的要素
            this.graphicsLayer.graphics.removeAll();
            this.webmap.remove(this.graphicsLayer_);
            this.graphicsLayer_=1;
            this.clickGraphicsLayer.graphics.removeAll();

            //再显示主界面要素
            this.testfpl.visible = true;
            this.testfl.visible = true;
            this.basemap.visible = true;

            this.isMapShow = true;
            this.isPhotoShow = false;

            //视角转换
            let pt = new this.Point({
              latitude: 32,
              longitude: 116.3
            });
            this.view.goTo(
            {
              target: pt,
                zoom: 4
            },{
              duration:1000
              }
            );

            //更新地区
            this.currentArea="中国";

            //更新贫困县数目
            if (this.$refs["timeChild"].alreadyRun >= 244) {
              this.currentNum = this.poorAN[this.$refs["timeChild"].alreadyRun - 245];
            } else {
              this.currentNum = 832;
            }

            //情空贫困县列表并隐去
            this.isPoorShow=false;
            setTimeout(()=> {
              this.currentPoor = [];
            },1000)

            if(this.legendShow == true)
            this.testView.ui.add(this.legendd,"bottom-left");

            //更新图表
            //更新图表
            //1、贫困县数量
            for(var i = 0;i < this.poorAN.length;i++){
              this.poorAN[i]=this.tempPA[i];
            }
            this.numChartOption.yAxis[0].data = (function(){
              var ydata = [];
              for(var i = 0;i < 832;i++){
                ydata.push(i);
              }
              ydata.push(832);
              return ydata;
            })();

            //2、经济图表
            for(var i = 0;i < this.centerM.length;i++){
              this.centerM[i]=this.tempCM[i];
            }
            for(var i = 0;i < this.poorM.length;i++){
              this.poorM[i]=this.tempPM[i];
            }

            //3、贫困
            for(var i = 0;i < this.poorN.length;i++){
              this.poorN[i]=this.tempPN[i];
            }
            for(var i = 0;i < this.poorL.length;i++){
              this.poorL[i]=this.tempPL[i];
            }

            this.numChartOption.series[0].data=[];
            this.GDPChartOption.series[0].data=[];
            this.GDPChartOption.series[1].data=[];
            this.poorChartOption.series[0].data=[];
            this.poorChartOption.series[1].data=[];

            this.updateNumChart(this.$refs["timeChild"].alreadyRun)
            // this.numChart.setOption(this.numChartOption);

            this.isPoorCountryShow=false;
            //显示图表
            this.isChartShow = true;
            // this.isNewsShow = true;
            this.isCurrrentNewsShow = true;
            this.timeAndPoorShow = true;
            this.isTimeShow = true;
            // document.getElementById("backSystem").style.left = "320px";
          },
          poorCountryS(index){
            this.isMapShow = true;
            this.isPhotoShow = false;
            this.isPoorCountryShow=false;
            this.clickGraphicsLayer.graphics.removeAll();

            this.currentIndex = index;

            //将当前贫困县修改为点击贫困县
            this.currentPoorCountry.name = this.result.features[index].attributes.name;

            /*按钮激活状态更新*/
            this.btnsColorClassArr=['activeBtnColor','blurBtnColor','blurBtnColor'];

            //点击后视角移动到贫困县位置
            let pt = new this.Point({
              latitude: this.result.features[index].attributes.latitude,
              longitude: this.result.features[index].attributes.longitude
            });
            this.view.goTo(
              {
                target: pt,
                zoom: 8
              },{
                duration:1000
              }
            );

            //关闭图表\新闻\时间轴
            this.isChartShow = false;
            // this.isNewsShow = false;
            this.isCurrrentNewsShow = false;
            this.timeAndPoorShow = false;
            this.isTimeShow = false;
            //修改按钮位置
            // document.getElementById("backSystem").style.left = "78px";

            //修改该贫困县图标
            if( this.result.features[index].attributes.time<= this.$refs["timeChild"].alreadyRun) {
              var symbol = {
                type: "picture-marker",
                url: 'static/img/导航.png',
                width: "30px",
                height: "30px"
              };
              this.result.features[index].symbol = symbol;
              this.clickGraphicsLayer.graphics.add(this.result.features[index]);
            }

            //停止时间轴
            if(this.$refs["timeChild"].isStart == true)
            {
              this.$refs["timeChild"].startRun();
            }

            //显示贫困县展示框
            setTimeout(()=>{
              if(this.isPoorCountryShow==false){
                //贫困县展示框设置内容
                this.currentPoorCountry.date=new Date(parseInt(this.result.features[index].attributes.date)).toLocaleString().split(' ')[0];
                this.currentPoorCountry.position.latitude=this.result.features[index].attributes.latitude;
                this.currentPoorCountry.position.longitude=this.result.features[index].attributes.longitude;

                //从数据库加载简介和官网数据
                this.axios.get('http://localhost:3000/?tableName=china&name='+this.result.features[index].attributes.name).then((res)=>{
                  this.currentPoorCountry.office = res.data[0].office;
                  this.currentPoorCountry.intro = res.data[0].intro;
                })

                //贫困县图表数据同步
                //1、完成词云数据更新
                let wordData = [];
                this.axios.get('http://localhost:3000/?tableName=word&name='+this.result.features[index].attributes.name).then((res)=>{
                  if(res.data[0]["1"]==undefined){
                    this.wordCloudOption.title.text = "暂无数据";
                  }
                  else{
                    this.wordCloudOption.title.text = "词云";
                  }
                  for(var i = 1;i <=20;i++){
                    wordData.push({
                      name:res.data[0][i.toString()]
                    })
                  }
                  this.axios.get('http://localhost:3000/?tableName=freq&name='+this.result.features[index].attributes.name).then((res)=>{
                    for(var i = 1;i <=20;i++){
                      wordData[i-1].value = parseInt(res.data[0][i.toString()]);
                    }
                    this.wordCloudOption.series[0].data = wordData;
                    this.wordcloud.setOption(this.wordCloudOption);
                  });
                });

                // 2、完成四个图片的url更新
                this.axios.get('http://localhost:3000/getimgbyname?name='+this.result.features[index].attributes.name).then(res=>{
                  if(res.data==false){
                    this.$notify.error({
                      title: '错误',
                      message: '抱歉'+this.result.features[index].attributes.name+'暂无对比照片',
                      position: 'top-left',
                      duration: 3000
                    });
                    this.mapImgSrcArr.length=0;
                    this.photoImgSrcArr.length=0;
                    for(var i = 1;i <=2;i++){
                      this.mapImgSrcArr.push("static/img/暂无图片.png");
                    }
                    for(var i =1;i <= 2;i++){
                      this.photoImgSrcArr.push("static/img/暂无图片.png");
                    }
                    return;
                  }
                  else{
                    this.mapImgSrcArr.length=0;
                    this.photoImgSrcArr.length=0;
                    //将图片压入数组
                    for(var i = 1;i <=2;i++){
                      this.mapImgSrcArr.push('data:image/png;base64,'+res.data['img'+i].data);
                    }
                    for(var i =3;i <= 4;i++){
                      this.photoImgSrcArr.push('data:image/png;base64,'+res.data['img'+i].data);
                    }
                  }
                });

                // 3、完成图表数据更新
                var dataArrSort = [{year:2015},{year:2016},{year:2017},{year:2018},{year:2019}];
                var dataArr = [];

                this.axios.get('http://localhost:3000/getpoorareapartdata?name='+this.result.features[index].attributes.name+'&year=2015').then(res=>{
                  if(res.data.length==0){
                    this.$notify.error({
                      title: '错误',
                      message: '抱歉'+this.result.features[index].attributes.name+'暂无图片数据',
                      position: 'top-left',
                      duration: 3000
                    });

                    this.PChartOption.series[0].data.length = 0;
                    this.MChartOption.series[0].data.length = 0;
                    this.pChart.setOption(this.PChartOption);
                    this.MChart.setOption(this.MChartOption);
                  }else{
                    for(var i = 2015;i <= 2019;i++){
                      ((year)=>{
                        this.axios.get('http://localhost:3000/getpoorareapartdata?name='+this.result.features[index].attributes.name+'&year='+year).then(res=>{
                          dataArr.push({
                            year,
                            people:parseFloat(res.data[0].people),
                            money:parseFloat(res.data[0].money)/10000,
                          });
                          if(dataArr.length==5){
                            //对dataArr数组按年份排序
                            for(var i = 0;i < 5;i++){
                              for(var j = 0;j < 5;j++){
                                if(dataArr[j].year==dataArrSort[i].year){
                                  dataArrSort.push({
                                    people:dataArr[j].people,
                                    money:dataArr[j].money
                                  });
                                }
                              }
                            }
                            //更新数组
                            var peopleArr = [];
                            var moneyArr = [];

                            for(var i = 5;i <= 9;i++){
                              peopleArr.push(dataArrSort[i].people);
                              moneyArr.push(dataArrSort[i].money);
                            }
                            this.PChartOption.series[0].data.length = 0;
                            this.MChartOption.series[0].data.length = 0;
                            this.PChartOption.series[0].data = peopleArr;
                            this.MChartOption.series[0].data = moneyArr;
                            this.pChart.setOption(this.PChartOption);
                            this.MChart.setOption(this.MChartOption);
                          }
                        });
                      })(i);
                    }
                  }
                });

                //贫困县展示框地图加载
                let map2 = new this.Map({
                  basemap: "satellite"
                });
                let view2 = new this.MapView({
                  container: "poorShowMapBody",
                  map: map2,
                  zoom: 14,
                  center: [parseFloat(this.result.features[index].attributes.longitude), parseFloat(this.result.features[index].attributes.latitude)] ,// longitude, latitude
                  constraints: {
                    maxZoom: 20,
                    minZoom: 4
                  }
                });

                view2.ui.remove('zoom')//清除放大缩小按钮
                view2.ui.remove('attribution')//清除底部水印

                const areaFls = new this.FeatureLayer({
                  url: "https://services3.arcgis.com/XDzy9VWpT2sZyZqz/arcgis/rest/services/%E9%9D%A2%E6%95%B0%E6%8D%AE/FeatureServer"
                });
                areaFls.definitionExpression = "name="+"'"+this.result.features[index].attributes.name+"'";

                const symbol = {
                  type: "simple-fill",
                  color: "#000000",
                  outline: null
                };

                //制作卷帘
                setTimeout( () =>{
                  var basemap = map2.allLayers.items[0];
                  //面图层
                  map2.add(areaFls);

                  const swipe = new this.Swipe({
                    leadingLayers: [basemap],
                    trailingLayers: [areaFls],
                    position: 100,
                    view: view2
                  });
                  view2.ui.add(swipe);
                },1000)

                //显示数据
                this.isPoorCountryShow=true;
              }
            },1000)
          },
          changePoorCountryShow() {
            this.isPoorCountryShow = false;
            //显示图表
            this.isChartShow = true;
            // this.isNewsShow = true;
            this.isCurrrentNewsShow = true;
            this.timeAndPoorShow = true;
            this.isTimeShow = true;
            this.clickGraphicsLayer.graphics.removeAll();

            //切换图层
            this.isMapShow = true;
            this.isPhotoShow = false;

            // document.getElementById("backSystem").style.left = "320px";

            if (this.result != 1) {
              if (parseInt(this.result.features[this.currentIndex].attributes.time) > this.$refs["timeChild"].alreadyRun) {
                var symbol = {
                  type: "picture-marker",
                  url: 'static/img/贫困县标识.png',
                  width: "30px",
                  height: "30px"
                };
                this.result.features[this.currentIndex].symbol = symbol;
              } else {
                // this.graphicsLayer2.remove(this.result.features[this.currentIndex]);
              }
            }
            // this.result=1;
          },
          newsIndexSub(){
            this.isNewsShow = false;
            setTimeout(()=>{
              this.isNewsShow = true;
              if(this.currentNewsIndex > 0){
                this.currentNewsIndex--;
                clearInterval(this.IntervalID);
                this.IntervalID = setInterval( ()=> {
                  this.isNewsShow = false;
                  setTimeout(()=>{
                    this.isNewsShow = true;
                    if(this.currentNewsIndex < this.dataNews.length-1){
                      this.currentNewsIndex++;
                    }
                    else{
                      this.currentNewsIndex=0;
                    }
                  },300);
                },3500)
              }
              else{
                this.currentNewsIndex=this.dataNews.length-1;
                clearInterval(this.IntervalID);
                this.IntervalID = setInterval( ()=> {
                  this.isNewsShow = false;
                  setTimeout(()=>{
                    this.isNewsShow = true;
                    if(this.currentNewsIndex < this.dataNews.length-1){
                      this.currentNewsIndex++;
                    }
                    else{
                      this.currentNewsIndex=0;
                    }
                  },300);
                },3500)
              }
            },300);
          },
          openLegend(){
            this.legendShow = true;
            this.testView.ui.add(this.legendd,"bottom-left");
          },
          newsIndexAdd(){
            this.isNewsShow = false;
            setTimeout(()=>{
              this.isNewsShow = true;
              if(this.currentNewsIndex < this.dataNews.length-1){
                this.currentNewsIndex++;
                clearInterval(this.IntervalID);
                this.IntervalID = setInterval( ()=> {
                  this.isNewsShow = false;
                  setTimeout(()=>{
                    this.isNewsShow = true;
                    if(this.currentNewsIndex < this.dataNews.length-1){
                      this.currentNewsIndex++;
                    }
                    else{
                      this.currentNewsIndex=0;
                    }
                    },300);
                },3500)
              }
              else{
                this.currentNewsIndex=0;
                clearInterval(this.IntervalID);
                this.IntervalID = setInterval( ()=> {
                  this.isNewsShow = false;
                  setTimeout(()=>{
                    this.isNewsShow = true;
                    if(this.currentNewsIndex < this.dataNews.length-1){
                      this.currentNewsIndex++;
                    }
                    else{
                      this.currentNewsIndex=0;
                    }
                  },300);
                },3500)
              }
            },300);
          },
          photoShow(){
            this.btnsColorClassArr=['blurBtnColor','blurBtnColor','activeBtnColor'];
            //换url
            document.getElementById("beforeImg").setAttribute('src',this.photoImgSrcArr[0]);
            document.getElementById("nowImg").setAttribute('src',this.photoImgSrcArr[1]);
            this.isMapShow = false;
            this.isPhotoShow = true;
          },
          sliderMove(event) {
            var slider = document.getElementById("sliderContainer");
            var photoCon = document.getElementById("poorShowPhotoBody");
            var width = document.getElementById("poorShowPhotoBody").clientWidth;
            photoCon.onmousemove =  function (event) {
              if(event.clientX - 615 > 0 && event.clientX<1600) {
                slider.style.left = (event.clientX - 615) + "px";
                //改变照片宽度
                var bIContatiner = document.getElementById("bIContatiner");
                bIContatiner.style.width = (event.clientX - 615) + 'px';
              }
            }
          },
          mapBodyShow(){
            this.btnsColorClassArr=['blurBtnColor','activeBtnColor','blurBtnColor'];
            //获取图片、换url

            document.getElementById("beforeImg").setAttribute('src',this.mapImgSrcArr[1]);
            document.getElementById("nowImg").setAttribute('src',this.mapImgSrcArr[0]);
            this.isMapShow = false;
            this.isPhotoShow = true;
            //

          },
          layerShow(){
            this.btnsColorClassArr=['activeBtnColor','blurBtnColor','blurBtnColor'];
            this.isMapShow = true;
            this.isPhotoShow = false;
          },
          sliderFixed(){
            var photoCon = document.getElementById("poorShowPhotoBody");
            photoCon.onmousemove = {};
          },
          showSidebar(event){
            var mouseX = event.pageX;
            if(mouseX <= 64 && !this.isPoorShow && event.pageY>=190 && event.pageY <=610){
              if(this.sidebarShow==false) this.sidebarShow = true;
              this.sidebarTipShow=false;
            }
            else{
              if(this.sidebarShow==true)  this.sidebarShow = false;
              this.sidebarTipShow = true;
            }
          },
          changePoint(values){
            this.filterArray=[];
            // 筛选数据点
            //1、先筛选省份
            let expression = "";
            values.forEach((value,index)=>{
              if(value[0]==1){
                this.filterOptions[0].children.forEach((valuee,indexx)=>{
                  if(valuee.value===value[1]){
                    expression=expression+"province="+"'"+valuee.label+"'"+" or ";
                    this.filterArray.push(valuee.label);
                  }
                })
              }
            });
            expression = expression.substring(0,expression.length-3);
            expression = "("+expression+")";
            this.expression = expression;
            if(expression=="()"){
              expression="(time > -1)";
              for(var i = 2;i <=29 ;i++){
                this.filterArray.push(this.filterOptions[0].children[i-2].label);
              }
            }
            if(this.$refs["timeChild"].rendType == "heat" || this.$refs["timeChild"].rendType=="jY"){
              expression = expression + " and "+"(time > " + this.$refs["timeChild"].alreadyRun+")";
            }
            this.testfl.definitionExpression = expression;
          },
          querySearch(queryString,cb){
            //axios调用数据库数据
            this.axios.get("http://localhost:3000/like?tableName=china&name="+queryString).then(res=>{
             var result = [];
              res.data.forEach((value,index)=>{
                if(this.filterArray.indexOf(value.province)!=-1){
                  result.push(
                    {
                      value:value.name,
                      data:value.date,
                      intro:value.intro,
                      latitude:value.latitude,
                      longitude:value.longitude,
                      name:value.name,
                      office:value.office
                    });
                }
              });
              if(result.length > 0) {
                cb(result);
              }
              else cb([{value:"无搜索结果"}])
            })
          },
          goToPoor(item){
            if(item.value == "无搜索结果"){
              this.$message({
                showClose: true,
                message: '无搜索结果,请重试!'
              });
              return;
            }
            //点击后视角移动到贫困县位置
            let pt = new this.Point({
              latitude: parseFloat(item.latitude),
              longitude: parseFloat(item.longitude)
            });
            this.view.goTo(
              {
                target: pt,
                zoom: 8
              },{
                duration:1000
              }
            );
            setTimeout(()=>{
              this.currentPoorCountry.name = item.name;
              this.currentPoorCountry.position.latitude =parseFloat(item.latitude);
              this.currentPoorCountry.position.longitude = parseFloat(item.longitude);
              this.currentPoorCountry.intro = item.intro;
              this.currentPoorCountry.office = item.office;
              //贫困县图表数据同步
              //1、完成词云数据更新
              let wordData = [];
              this.axios.get('http://localhost:3000/?tableName=word&name='+item.name).then((res)=>{
                if(res.data[0]["1"]==undefined){
                  this.wordCloudOption.title.text = "暂无数据";
                }
                else{
                  this.wordCloudOption.title.text = "词云";
                }
                for(var i = 1;i <=20;i++){
                  wordData.push({
                    name:res.data[0][i.toString()]
                  })
                }
                this.axios.get('http://localhost:3000/?tableName=freq&name='+item.name).then((res)=>{
                  for(var i = 1;i <=20;i++){
                    wordData[i-1].value = parseInt(res.data[0][i.toString()]);
                  }
                  this.wordCloudOption.series[0].data = wordData;
                  this.wordcloud.setOption(this.wordCloudOption);
                });
              });

              //贫困县展示框地图加载
              let map2 = new this.Map({
                basemap: "satellite"
              });
              let view2 = new this.MapView({
                container: "poorShowMapBody",
                map: map2,
                zoom: 14,
                center: [parseFloat(item.longitude), parseFloat(item.latitude)] ,// longitude, latitude
                constraints: {
                  maxZoom: 20,
                  minZoom: 4
                }
              });

              view2.ui.remove('zoom')//清除放大缩小按钮
              view2.ui.remove('attribution')//清除底部水印
              this.isPoorCountryShow = true;
            },1000)
          },
          closeLegend(){
            // this.legendShow=false;
            this.testView.ui.remove(this.legendd);
            this.legendShow = false;
          },
        },
          mounted: function() {
              this._createMapView();
              this.provinceArea=this.loadAll_provinceArea();
              this.connectArea = this.loadAll_connectArea();

            //绑定图表
            var numChartEL = document.getElementById("numChart");
            var numchart = this.$echarts.init(numChartEL);
            this.numChart = numchart;
            numchart.setOption(this.numChartOption);

            var GDPChartEL = document.getElementById("GDPChart");
            var gdpChart = this.$echarts.init(GDPChartEL);
            this.GDPChart = gdpChart;
            gdpChart.setOption(this.GDPChartOption);


            var poorChartEL = document.getElementById("poorChart");
            var poorchart = this.$echarts.init(poorChartEL);
            this.poorChart = poorchart;
            poorchart.setOption(this.poorChartOption);

            var poorCountryPChartEL = document.getElementById("poorCountryPChart");
            var pChart = this.$echarts.init(poorCountryPChartEL);
            this.pChart =pChart;
            pChart.setOption(this.PChartOption);

            var poorCountryMChartEL = document.getElementById("poorCountryMChart");
            var MChart = this.$echarts.init(poorCountryMChartEL);
            this.MChart = MChart;
            MChart.setOption(this.MChartOption);

            var wordcloud = this.$echarts.init(document.getElementById("wordCloud"));
            this.wordcloud = wordcloud;
            wordcloud.setOption(this.wordCloudOption);

            var contrastAutoTimeChartEL = document.getElementById("autoTimeChart");
            var ATChart = this.$echarts.init(contrastAutoTimeChartEL);
            this.ATChart = ATChart;
            ATChart.setOption(this.AutoTimeChartOption);

            var contrastBarLineChartEL = document.getElementById("barLineChart");
            var BLChart = this.$echarts.init(contrastBarLineChartEL);
            this.BLChart = BLChart;
            BLChart.setOption(this.BarLineChartOption);

            var contrastRadarChartEL = document.getElementById("radarChart");
            var RaChart = this.$echarts.init(contrastRadarChartEL);
            this.RaChart = RaChart;
            RaChart.setOption(this.RaChartOption);

            var sketch3dTimeChartEL = document.getElementById("time3DChart");
            var t3DChart = this.$echarts.init(sketch3dTimeChartEL);
            this.t3DChart = t3DChart;
            t3DChart.setOption(this.Time3DChartOption);

            // for(var i = 0;i < this.allNews.length;i++){
            //   if(this.allNews[i].time < 0){
            //     this.dataNews.push(this.allNews[i]);
            //   }
            // }

            this.IntervalID = setInterval( ()=> {
              this.isNewsShow = false;
              setTimeout(()=>{
                this.isNewsShow = true;
                if(this.currentNewsIndex < this.dataNews.length-1){
                  this.currentNewsIndex++;
                }
                else{
                  this.currentNewsIndex=0;
                }
              },300);
            },3500);
            //禁止浏览器拖动图片
            var im = document.getElementsByTagName('img');
            for(var i = 0; i < im.length; i++) {
              im[i].onmousedown = function(e) {
                e.preventDefault()
              }
            }
            for(var i = 2;i <=29 ;i++){
              this.filterArray.push(this.filterOptions[0].children[i-2].label);
            }
          },

          data(){
            return{
              testfl:{},
              testView:{
                zoom:0
              },
              geoCoordMap : {
                '山西省': [112.563627, 37.86388],
                '北京市': [116.411087, 39.899854],
                '天津市': [117.219014, 39.106335],
                '上海市': [121.465592, 31.224566],
                '重庆市': [106.568786, 29.559948],
                '河北省': [114.521071, 38.036379],
                '辽宁省': [123.455141, 41.80233],
                '吉林省': [125.34753, 43.875518],
                '黑龙江省': [126.644935, 45.735449],
                '江苏省': [118.804623, 32.053068],
                '浙江省': [120.169311, 30.255578],
                '安徽省': [117.235678, 31.768192],
                '福建省': [119.305321, 26.069997],
                '江西省': [115.914271, 28.668507],
                '山东省': [117.021693, 36.649844],
                '河南省': [113.765129, 34.760326],
                '湖北省': [114.339819, 30.548614],
                '湖南省': [112.971207, 28.102466],
                '广东省': [113.268977, 23.131036],
                '海南省': [110.333116, 20.019824],
                '四川省': [104.078062, 30.629764],
                '贵州省': [106.705849, 26.611781],
                '云南省': [102.712251, 25.040609],
                '陕西省': [108.95579, 34.28058],
                '甘肃省': [103.823851, 36.050994],
                '青海省': [101.791632, 36.633645],
                '台湾省': [120.907637, 23.725125],
                '内蒙古自治区': [111.770306, 40.814857],
                '广西壮族自治区': [108.310376, 22.806877],
                '宁夏回族自治区': [106.261583, 38.484109],
                '新疆维吾尔自治区': [87.620827, 43.819221],
                '香港特别行政区': [114.1844, 22.270577],
                '澳门特别行政区': [113.585509, 22.140142],
                '西藏自治区': [91.117212, 29.646922]
              },
              GanSuData : [
                  [{
                      name: '甘肃省'
                  }, {
                      name: '天津市',
                      value: 16
                  }],
                  [{
                      name: '甘肃省'
                  }, {
                      name: '福建省',
                      value: 14
                  }],
                  [{
                      name: '甘肃省'
                  }, {
                      name: '山东省',
                      value: 9
                  }]
              ],
              GuangXiData : [
                  [{
                      name: '广西壮族自治区'
                  }, {
                      name: '广东省',
                      value: 17
                  }]
              ],
              NeiMengGuData : [
                  [{
                      name: '内蒙古自治区'
                  }, {
                      name: '北京市',
                      value: 16
                  }]
              ],
              NingXiaData : [
                  [{
                      name: '宁夏回族自治区'
                  }, {
                      name: '福建省',
                      value: 8
                  }]
              ],
              HuBeiData : [
                  [{
                      name: '湖北省'
                  }, {
                      name: '浙江省',
                      value: 8
                  }]
              ],
              HuNanData : [
                  [{
                      name: '湖南省'
                  }, {
                      name: '山东省',
                      value: 7
                  }]
              ],
              JiLinData : [
                  [{
                      name: '吉林省'
                  }, {
                      name: '浙江省',
                      value: 4
                  }]
              ],
              ChongQingData : [
                  [{
                      name: '重庆市'
                  }, {
                      name: '山东省',
                      value: 14
                  }]
              ],
              ShanXiData : [
                  [{
                      name: '陕西省'
                  }, {
                      name: '江苏省',
                      value: 19
                  }]
              ],
              HeBeiData : [
                  [{
                      name: '河北省'
                  }, {
                      name: '北京市',
                      value: 15
                  }],
                  [{
                      name: '河北省'
                  }, {
                      name: '天津市',
                      value: 4
                  }]
              ],
              YunNanData : [
                  [{
                      name: '云南省'
                  }, {
                      name: '上海市',
                      value: 16
                  }],
                  [{
                      name: '云南省'
                  }, {
                      name: '广东省',
                      value: 14
                  }]
              ],
              SiChuanData : [
                  [{
                      name: '四川省'
                  }, {
                      name: '浙江省',
                      value: 16
                  }],
                  [{
                      name: '四川省'
                  }, {
                      name: '广东省',
                      value: 29
                  }]
              ],
              XinJiangData : [
                  [{
                      name: '新疆维吾尔自治区'
                  }, {
                      name: '北京市',
                      value: 4
                  }],
                  [{
                      name: '新疆维吾尔自治区'
                  }, {
                      name: '天津市',
                      value: 3
                  }],
                  [{
                      name: '新疆维吾尔自治区'
                  }, {
                      name: '上海市',
                      value: 4
                  }],
                  [{
                      name: '新疆维吾尔自治区'
                  }, {
                      name: '江苏省',
                      value: 5
                  }],
                  [{
                      name: '新疆维吾尔自治区'
                  }, {
                      name: '浙江省',
                      value: 2
                  }],
                  [{
                      name: '新疆维吾尔自治区'
                  }, {
                      name: '山东省',
                      value: 4
                  }],
                  [{
                      name: '新疆维吾尔自治区'
                  }, {
                      name: '广东省',
                      value: 4
                  }],
              ],
              XiZangData : [
                  [{
                      name: '西藏自治区'
                  }, {
                      name: '北京市',
                      value: 4
                  }],
                  [{
                      name: '西藏自治区'
                  }, {
                      name: '天津市',
                      value: 4
                  }],
                  [{
                      name: '西藏自治区'
                  }, {
                      name: '辽宁省',
                      value: 3
                  }],
                  [{
                      name: '西藏自治区'
                  }, {
                      name: '上海市',
                      value: 5
                  }],
                  [{
                      name: '西藏自治区'
                  }, {
                      name: '江苏省',
                      value: 4
                  }],
                  [{
                      name: '西藏自治区'
                  }, {
                      name: '浙江省',
                      value: 3
                  }],
                  [{
                      name: '西藏自治区'
                  }, {
                      name: '福建省',
                      value: 4
                  }],
                  [{
                      name: '西藏自治区'
                  }, {
                      name: '山东省',
                      value: 5
                  }],
                  [{
                      name: '西藏自治区'
                  }, {
                      name: '广东省',
                      value: 7
                  }]
              ],
              QingHaiData : [
                  [{
                      name: '青海省'
                  }, {
                      name: '北京市',
                      value: 6
                  }],
                  [{
                      name: '青海省'
                  }, {
                      name: '天津市',
                      value: 4
                  }],
                  [{
                      name: '青海省'
                  }, {
                      name: '上海市',
                      value: 6
                  }],
                  [{
                      name: '青海省'
                  }, {
                      name: '江苏省',
                      value: 14
                  }],
                  [{
                      name: '青海省'
                  }, {
                      name: '浙江省',
                      value: 8
                  }],
                  [{
                      name: '青海省'
                  }, {
                      name: '山东省',
                      value: 4
                  }]
              ],
              GuiZhouData : [
                  [{
                      name: '贵州省'
                  }, {
                      name: '辽宁省',
                      value: 3
                  }],
                  [{
                      name: '贵州省'
                  }, {
                      name: '上海市',
                      value: 8
                  }],
                  [{
                      name: '贵州省'
                  }, {
                      name: '江苏省',
                      value: 10
                  }],
                  [{
                      name: '贵州省'
                  }, {
                      name: '浙江省',
                      value: 22
                  }],
                  [{
                      name: '贵州省'
                  }, {
                      name: '山东省',
                      value: 6
                  }],
                  [{
                      name: '贵州省'
                  }, {
                      name: '广东省',
                      value: 17
                  }]
              ],
              defaultRender:{
                type: "simple",
                //label: "Observed hurricane location",
                symbol: {
                  type: "simple-marker",
                  size: 6,
                  outline: {
                    width: 0.5,
                    color: [255,255,255,0.5]
                  }
                },

                visualVariables: [{
                  type: "color",
                  field: "date",
                  stops: [
                    { value: new Date(2015, 1, 1).getTime(), color: "#00ffff"},
                    { value: new Date(2021, 12, 31).getTime(), color: "#2f3f56"}
                  ]
                }]
              },
              clusterConfig :{
                type: "cluster",
                clusterRadius: "100px",
                popupTemplate: {
                  title: "贫困县聚类",
                  content: "{cluster_count} 个贫困县",
                  fieldInfos: [{
                    fieldName: "cluster_count",
                    format: {
                      places: 0,
                      digitSeparator: true
                    }
                  }]
                },
                clusterMinSize: "24px",
                clusterMaxSize: "60px",
                labelingInfo: [{
                  deconflictionStrategy: "none",
                  labelExpressionInfo: {
                    expression: "Text($feature.cluster_count, '#,###')"
                  },
                  labelPlacement: "center-center",
                }]
              },
              pDefaultRenderer:{},

              numChartOption:{
                title: {
                  text:"数量",
                  textStyle:{
                    fontSize:"18px",
                    color:'white'
                  }
                },
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'cross',
                    label: {
                      backgroundColor: '#283b56'
                    }
                  }
                },
                legend: {
                  data:[{
                    name:'贫困县现有数量',
                    textStyle:{
                      color:['#184f86']
                    }
                  }, {name:'脱贫数量',textStyle:{
                      color:['#54FF9F']
                    }}
                  ],
                  top:"20px",
                },
                toolbox: {
                  show: true,
                  feature: {
                    dataView: {readOnly: false},
                    saveAsImage: {},
                  }
                },
                dataZoom: {
                  show: true,
                  start: 0,
                  end: 0
                },
                xAxis: [
                  {
                    type: 'category',
                    boundaryGap: false,
                    data: (function (){
                      var start = new Date("2017-1-1");
                      var end = new Date("2020-12-31");
                      var xdate = [];
                      xdate.push(start.toLocaleDateString());
                      while(start < end){
                        start.setDate(start.getDate()+3);
                        xdate.push(start.toLocaleDateString());
                      }
                      xdate.pop();
                      xdate.push("2020-12-31");
                      return xdate;
                    })()
                  },
                ],
                yAxis: [
                  {
                    type: 'category',
                    data:(function(){
                      var ydata = [];
                      for(var i = 0;i < 832;i++){
                        ydata.push(i);
                      }
                      ydata.push(832);
                      return ydata;
                    })(),
                    boundaryGap: false
                  },
                ],
                series:[
                  {
                    name:"贫困县现有数量",
                    type:"line",
                    data:[],
                  },
                  {
                    name:"脱贫数量",
                    type:"line",
                    data:[]
                  }
                ]
              },
              startTime:"2012-1-1",
              GDPChartOption:{
                title: {
                  text:"经济",
                  textStyle:{
                    fontSize:"18px",
                    color:'white'
                  }
                },
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'cross',
                    label: {
                      backgroundColor: '#283b56'
                    }
                  }
                },
                legend: {
                  data:[{name:'中央财政专项扶贫资金/十亿元',textStyle:{
                      color:['#FF7F24']
                    }}, {name:'人均可支配收入/万元',textStyle:{
                      color:['#FF3030']
                    }}],
                  top:"20px",
                  textStyle:{
                    color:"white"
                  }
                },
                toolbox: {
                  show: true,
                  feature: {
                    dataView: {readOnly: false},
                    saveAsImage: {}
                  }
                },
                xAxis: [
                  {
                    type: 'category',
                    boundaryGap: false,
                    data: [2013,2014,2015,2016,2017,2018,2019,2020]
                  },
                ],
                yAxis: [
                  {
                    type: 'value',
                    min:0,
                    max:150,

                  },
                  {
                    type: 'value',
                    min:0,
                    max:5,
                  },
                ],
                series:[
                  {
                    name:"中央财政专项扶贫资金/十亿元",
                    type:"bar",
                    data:[],
                    itemStyle: {
                      normal: {
                        color: '#FF7F24' //改变折线颜色
                      }
                    },
                  },
                  {
                    name:"人均可支配收入/万元",
                    yAxisIndex: 1,
                    type:"bar",
                    data:[],
                    itemStyle: {
                      normal: {
                        color: '#FF3030' //改变折线颜色
                      }
                    },
                  }
                ]
              },
              currentNum:832,
              poorChartOption:{
                title: {
                  text:"贫困",
                  textStyle:{
                    fontSize:"18px",
                    color:'white'
                  }
                },
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'cross',
                    label: {
                      backgroundColor: '#283b56'
                    }
                  }
                },
                legend: {
                  data:[{name:'贫困人口/十万人',textStyle:{
                      color:['#FFFF00']
                    }}, {name:'贫困发生率/%',textStyle:{
                      color:['#B8860B']
                    }}],
                  top:"20px",
                  textStyle:{
                    color:"white"
                  }
                },
                toolbox: {
                  show: true,
                  feature: {
                    dataView: {readOnly: false},
                    saveAsImage: {}
                  }
                },

                xAxis: [
                  {
                    type: 'category',
                    boundaryGap: false,
                    data: [2012,2013,2014,2015,2016,2017,2018,2019,2020],
                  },
                ],
                yAxis: [
                  {
                    type: 'value',
                    min:0,
                    max:1250,
                  },
                  {
                    type: 'value',
                    min:0,
                    max:50,
                  },
                ],
                series:[
                  {
                    name:"贫困人口/十万人",
                    type:"bar",
                    data:[1223.8],
                    itemStyle: {
                      normal: {
                        color: '#FFFF00' //改变折线颜色
                      }
                    },
                  },
                  {
                    name:"贫困发生率/%",
                    type:"bar",
                    yAxisIndex:1,
                    data:[12.7],
                    itemStyle: {
                      normal: {
                        color: '#B8860B' //改变折线颜色
                      }
                    },
                  }
                ]
              },
              dynamicTags: [],
              inputVisible: false,
              inputFlag:false,
              inputValue: '',
              AutoTimeChartOption:{
                baseOption: {
                  color: ['#3CB371','#DC143C','#FFD700'],
                  timeline: {
                    axisType: 'category',
                    // realtime: false,
                    // loop: false,
                    autoPlay: true,
                      // currentIndex: 2,
                      playInterval: 1000,
                      // controlStyle: {
                      //     position: 'left'
                      // },
                      data: [
                          '2015', '2016', '2017', '2018', '2019'
                      ],
                      // label: {
                      //     formatter: function(s) {
                      //         return parseInt(s);
                      //     }
                      // }
                  },
                  title: {
                    subtext: '数据来自全国各省年鉴',
                      textStyle: {
                      color: 'rgba(221,221,221,1)', //标题颜色
                      fontSize: 18,
                      lineHeight: 20,
                    },
                  },
                  tooltip: {
                    feature: {
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                  },
                  legend: {
                    left: 'right',
                    top:"25px",
                    // data: [' ', ' ',' '],
                    textStyle: { // 图例的公用文本样式。
                      fontSize: 13,
                      color: '#fff'
                    },
                    // selected: {
                    //     'GDP': false,
                    //     '金融': false,
                    //     '房地产': false
                    // }
                  },
                  calculable: true,
                  grid: {
                    y2:40,
                    top: 80,
                    bottom: 80,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                            label: {
                                show: true,
                                formatter: function(params) {
                                    return params.value.replace('\n', '');
                                }
                            }
                        },
                        axisLabel: {
                          textStyle: { // 图例的公用文本样式。
                            color: '#fff'
                          },
                      }
                    }
                 },
                  xAxis: [{
                    'type': 'category',
                    'axisLabel': {
                        'interval': 0
                    },
                    'data': [
                        '地区生产总值', '第一产业', '第二产业', '第三产业'
                        // , '\n山西'
                    ],
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: { // 图例的公用文本样式。
                          color: '#fff'
                        },
                      }
                  }],
                  yAxis: [{
                    type: 'value',
                    name: '产业年增长（亿元）',
                    axisLabel: {
                        formatter: '{value}',
                        textStyle: { // 图例的公用文本样式。
                            color: '#fff'
                        },
                    },
                    color:'#fff'
                  }],

                  series: [

                  ]
              },
              options: [{
              // color: ['#3CB371','#DC143C','#FFD700'],
                title: {
                    text: '2015贫困县经济指标对比'
                },
                series: [{
                    data: []
                }, {
                    data: []
                }, {
                    data: []
                }]
              }, {
                title: {
                    text: '2016贫困县经济指标对比'
                },
                series: [{
                    data: []
                }, {
                    data: []
                }, {
                    data: []
                }]
              }, {
                title: {
                    text: '2017贫困县经济指标对比'
                },
                series: [{
                    data: []
                }, {
                    data: []
                }, {
                    data: []
                }]
              }, {
                title: {
                    text: '2018贫困县经济指标对比'
                },
                series: [{
                    data: []
                }, {
                    data: []
                }, {
                    data: []
                }]
              }, {
                title: {
                    text: '2019贫困县经济指标对比'
                },
                series: [{
                    data: []
                }, {
                    data: []
                }, {
                    data: []
                }]
              }]
              },
              BarLineChartOption:{
                color: [],
                  title: {
                      text: '人口数据对比',
                        textStyle: {
                        color: 'rgba(221,221,221,1)', //标题颜色
                        fontSize: 18,
                        lineHeight: 20,
                      },
                  },
                  tooltip: {
                      trigger: 'axis',
                      axisPointer: {
                          type: 'cross',
                          crossStyle: {
                              color: '#999'
                          }
                      }
                  },
                  toolbox: {
                      feature: {
                          dataView: {
                              show: true,
                              readOnly: false
                          },
                          saveAsImage: {
                              show: true
                          }
                      }
                  },
                  legend: {
                      data: [' ', ' ', ' ',' ',' '],
                      textStyle: { // 图例的公用文本样式。
                        fontSize: 13,
                        color: '#fff'
                      },
                      top:"25px",
                      bottom:"25px",
                  },
                  xAxis: [{
                      type: 'category',
                      data: ['2015', '2016', '2017', '2018', '2019'],
                      axisPointer: {
                          type: 'shadow'
                      },
                      axisLabel: {
                          textStyle: { // 图例的公用文本样式。
                            color: '#fff'
                          },
                      }
                  }],
                  yAxis: [{
                      type: 'value',
                      name: '年末常住人口（万人）（折线）',
                      // min: 0,
                      // max: 200,
                      // interval: 50,
                      axisLabel: {
                          formatter: '{value}',
                          textStyle: { // 图例的公用文本样式。
                            color: '#fff'
                          },
                      }
                  }, {
                      type: 'value',
                      name: '居民人均可支配\n收入（元）（柱状）',
                      // min: 6,
                      // max: 20,
                      // interval: 5,
                      axisLabel: {
                          formatter: '{value}',
                          textStyle: { // 图例的公用文本样式。
                            color: '#fff'
                          },
                      }
                  }],
                  grid:{
                    top:'35%',
                    y2:40,
                  },
                  series: [{
                      name: ' ',
                      type: 'bar',
                      // data:
                  }, {
                      name: ' ',
                      type: 'bar',
                      // data:
                  }, {
                      name: ' ',
                      type: 'bar',
                      // yAxisIndex: 1,
                      // data:
                  }, {
                      name: ' ',
                      type: 'line',
                      yAxisIndex: 1,
                      // data:
                  }, {
                      name: ' ',
                      type: 'line',
                      yAxisIndex: 1,
                      // data:
                  }, {
                      name: ' ',
                      type: 'line',
                      yAxisIndex: 1,
                      // data:
                  }]
              },
              RaChartOption: {
              color: [ '#3CB371','#DC143C','#FFD700'],
              title: {
                  text: '产业结构对比',
                    textStyle: {
                    color: 'rgba(221,221,221,1)', //标题颜色
                    fontSize: 18,
                    lineHeight: 20,
                  },

                  // 标题的位置，此时放在图的底边
                  // left: 'center',
                  // top: 'top',
              },
                  tooltip: {
                    trigger: 'item',
                      feature: {
                          dataView: {
                              show: true,
                              readOnly: false
                          },
                          saveAsImage: {
                              show: true
                          }
                      }
                  },
              legend: {
                  // data: ['贫困县 A', '贫困县 B', '贫困县 C'],
                  textStyle: { // 图例的公用文本样式。
                    fontSize: 13,
                    color: '#fff'
                  },
                  top:"25px",
                  left: '0',
                  orient: 'vertical',
              },
              radar: [{
                  indicator: [{
                      text: '农业',
                      max: 80
                  }, {
                      text: '林业',
                      max: 80
                  }, {
                      text: '畜牧业',
                      max: 80
                  }, {
                      text: '渔业',
                      max: 80
                  }, {
                      text: '服务业',
                      max: 100
                  // }, {
                  //     text: '服务业',
                  //     max: 100
                  }],
                  center: ['50%', '50%'],
                  radius: 100,
                  name: {
                      textStyle: {
                          fontSize: 14,
                          color: 'white',
                          backgroundColor: '#666',
                          borderRadius: 4,
                          padding: [3, 5]
                      }
                  }
              }],
              series: [{
                  name: '产业结构占比',
                  type: 'radar',
                  radarIndex: 0,
                  data: [{
                      value: [0, 0, 0, 0, 0],
                      name: ' ',
                      areaStyle: {
                          color: new this.$echarts.graphic.RadialGradient(0.1, 0.6, 1, [{
                              color: 'rgba(60,179,113, 0.1)',
                              offset: 0
                          }, {
                              color: 'rgba(60,179,113, 1)',
                              offset: 1
                          }])
                      },
                      label: {
                          show: true,
                          formatter: function(params) {
                              return params.value;//+'%'
                          },
                          textStyle: {
                              fontSize: 12,
                              color: 'rgb(60,179,113)',
                              textBorderColor:'white',
                              textBorderWidth:2
                          }
                      }
                  }, {
                      value: [0, 0, 0, 0, 0],
                      name: ' ',
                      areaStyle: {
                          color: new this.$echarts.graphic.RadialGradient(0.1, 0.6, 1, [{
                              color: 'rgba(220,20,60, 0.1)',
                              offset: 0
                          }, {
                              color: 'rgba(220,20,60, 1)',
                              offset: 1
                          }])
                      },
                      label: {
                          show: true,
                          formatter: function(params) {
                              return params.value;//+'%'
                          },
                        textStyle: {
                              fontSize: 12,
                              color: 'rgb(220,20,60)',
                              textBorderColor:'white',
                              textBorderWidth:2
                          }
                      }
                  },{
                      value: [0, 0, 0, 0, 0],
                      name: ' ',
                      areaStyle: {
                          color: new this.$echarts.graphic.RadialGradient(0.1, 0.6, 1, [{
                              color: 'rgba(255, 215, 0, 0.1)',
                              offset: 0
                          }, {
                              color: 'rgba(255, 215, 0, 1)',
                              offset: 1
                          }])
                      },
                      label: {
                          show: true,
                          formatter: function(params) {
                              return params.value;//+'%'
                          },

                          textStyle: {
                              fontSize: 12,
                              color: 'rgb(255, 215, 0)',
                              textBorderColor:'white',
                              textBorderWidth:2
                          }
                      }
                  }]
              }]
              },
              Time3DChartOption: {
              title: {
                  text: '脱贫时间3D可视化',
                    textStyle: {
                    color: 'rgba(221,221,221,1)', //标题颜色
                    fontSize: 18,
                    lineHeight: 20,

                  },
                  },
            tooltip: {
              formatter:function (params) {
                return (params.value[1]+2017)+' 年<br>'+(params.value[0]+1) +' 月<br>'+params.value[2] +' 个';
              }
            },
            visualMap: {
                max: 20,
                inRange: {
                    color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                },
                textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    }
            },
            xAxis3D: {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月','7月', '8月', '9月', '10月', '11月','12月'],
                axisLabel: {
                    show: true,
                    interval:0,
                    textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    }
                }
            },
            yAxis3D: {
                type: 'category',
                data: ['2017', '2018', '2019','2020'],
                axisLabel: {
                  show: true,
                  textStyle: {
                      fontSize: 12,
                      color: '#fff'
                  }
                }
            },
            zAxis3D: {
                type: 'value',
                axisLabel: {
                  show: true,
                  textStyle: {
                      fontSize: 12,
                      color: '#fff'
                  }
                }
            },
            grid3D: {
                boxWidth: 140,
                boxDepth: 50,
                boxHeight:100,
                viewControl: {
                    // projection: 'orthographic'
                },
                light: {
                    main: {
                        intensity: 1.2,
                        shadow: true
                    },
                    ambient: {
                        intensity: 0.3
                    }
                }
            },
            series: [{
                type: 'bar3D',

                shading: 'lambert',
                label: {
                    fontSize: 16,
                    borderWidth: 1
                },

                emphasis: {
                    label: {
                        fontSize: 20,
                        color: '#900'
                    },
                    itemStyle: {
                        color: '#900'
                    }
                }
            }]
              },
              defaultProps: {
                children: 'children',
                label: 'label'
              },
              yearSlidervalue :0,
              yearmarks: {
                0: {
                  style: {
                    color: '#FFD700',
                    fontSize:'18px'
                  },
                  label: this.$createElement('strong', '2015')
                },
                5: {
                  style: {
                    color: '#B0C4DE',
                    fontSize:'18px'
                  },
                  label: this.$createElement('strong', '2016')
                },
                10:{
                  style: {
                    color: '#B0C4DE',
                    fontSize:'18px'
                  },
                  label: this.$createElement('strong', '2017')
                },
                15: {
                  style: {
                    color: '#B0C4DE',
                    fontSize:'18px'
                  },
                  label: this.$createElement('strong', '2018')
                },
                20:{
                  style: {
                    color:'#B0C4DE',
                    fontSize:'18px'
                  },
                  label: this.$createElement('strong', '2019')
                },
              },

              isS:false,
              isPoorShow:false,
              poorData:[
                {
                  name:"安徽",
                  povertyCounty:["砀山县","阜南县","霍邱县","金寨县","利辛县","临泉县","灵壁县","潜山县","石台县","寿县","舒城县","泗县","宿松县","太湖县","望江县","萧县","颍东区","颍上县","裕安区","岳西县"]
                },
                {
                  name:"海南",
                  povertyCounty:["白沙县","保亭县","临高县","琼中县"]
                },
                {
                  name:"甘肃",
                  povertyCounty:["六盘山区", "兰州市" ,"永登县","皋兰县","榆中县","白银市", "靖远县","会宁县","景泰县", "天水市","清水县","秦安县","甘谷县","武山县","张家川回族自治县","北道区","武威市","古浪县","平凉市","崆峒区","泾川县","灵台县","庄浪县","静宁县","庆阳市","庆城县","环县","华池县","合水县","正宁县","宁县","镇原县","定西市", "安定区","通渭县","陇西县","渭源县","临洮县","漳县","岷县","临夏回族自治州","临夏市","临夏县",'康乐县','永靖县','广河县','和政县','东乡族自治县','积石山自治县', '秦巴山区','陇南市','武都区','成县','文县','宕昌县','康县','西和县','礼县','徽县','两当县','藏族地区武威市','天祝藏族自治县','甘南藏族自治州','合作市','临潭县','卓尼县','舟曲县','迭部县','玛曲县','碌曲县','夏河县']
                },
              ],
              date:(function (){
                var start = new Date("2012-1");
                var end = new Date("2016-12");
                var xdate = [];
                xdate.push(start.toLocaleDateString());
                while(start < end){
                  start.setMonth(start.getMonth()+1);
                  xdate.push(start.toLocaleDateString());
                }
                xdate.pop();
                start =  new Date("2017-1-1");
                end = new Date("2020-12-31");
                xdate.push(start.toLocaleDateString());
                while(start < end){
                  start.setDate(start.getDate()+3);
                  xdate.push(start.toLocaleDateString());
                }
                xdate.pop();
                xdate.pop();
                xdate.push("2020-12-31");
                return xdate;
              })(),
              allNews:[
                {
                  time:-1,
                  date:"1964年2月",
                  content:"《关于在社会主义教育运动中加强农村社会保险工作，帮助贫下中农克服困难的报告》揭示了农村贫困问题的正式提出"
                },
                {
                  time:-1,
                  date:"1979年至1985年",
                  content:"改革开放以工代赈帮助为主、救济为辅"
                },
                {
                  time:-1,
                  date:"1986年5月16日",
                  content:"贫困地区经济开发领导小组成立，我国开始以“贫困县”为单位开展扶贫工作，并确定了331个国家级贫困县"
                },
                {
                  time:-1,
                  date:"1994年4月15日",
                  content:"《国家八七扶贫攻坚计划》提出“用七年时间基本解决8000万农村贫困人口温饱问题”"
                },
                {
                  time:-1,
                  date:"2001年6月13日",
                  content:"出台《中国农村扶贫开发纲要（2001-2010年）》，“整村推进”成为扶贫重点"
                },
                {
                  time:-1,
                  date:"2011年12月1日",
                  content:"通过《中国农村扶贫开发纲要（2011-2020年）》，扶贫开发进入“两不愁三保障”阶段，将片区作为扶贫主战场"
                },
                {
                  time:42,
                  date:"2012年11月8日",
                  content:"十八大把脱贫攻坚纳入“五位一体”总体布局和“四个全面”战略布局，标志着扶贫攻坚战的全面打响"
                },
                {
                  time:64,
                  date:"2013年11月3日",
                  content:"“精准扶贫”概念首次被提出"
                },
                {
                  time:240,
                  date:"2016年11月23日",
                  content:"《十三五”扶贫攻坚规划正式提出了2020年前实现“两不愁三保障”的扶贫攻坚总目标》"
                },
                {
                  time:304,
                  date:"2017年6月",
                  content:"深度贫困成为该阶段扶贫攻坚的重难点"
                },
                {
                  time:350,
                  date:"2017年10月18日",
                  content:"十九大将“精准脱贫”列为决胜全面建设小康社会的三大攻坚战之一"
                },
                {
                  time:719,
                  date:"2020年11月23日",
                  content:"新时代攻坚脱贫目标任务如期完成，在该阶段实行标准下农村贫困人口全部脱贫，贫困县全部摘帽"
                },
                {
                  time:732,
                  date:"2021年2月25日",
                  content:"国家乡村振兴局成立"
                },
                {
                  time:732,
                  date:"2021年4月6日",
                  content:"《人类减贫的中国实践》白皮书发布"
                },
              ],
              //到时要从数据库中获取

              currentNews:  {
                time:-1,
                date:"2011年12月31日",
                content:"通过《中国农村扶贫开发纲要（2011-2020年）》，扶贫开发进入“两不愁三保障”阶段，将片区作为扶贫主战场"
              },
              PChartOption:{
                title: {
                  text:"人口",
                  textStyle:{
                    fontSize:"18px",
                    color:'rgb(204,45,48)'
                  }
                },
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'cross',
                    label: {
                      backgroundColor: '#283b56'
                    }
                  }
                },
                legend: {
                  data:[{
                    name:'总人口',
                    textStyle:{
                      color:['rgb(204,45,48)']
                    }
                  }
                  ],
                  top:"20px",
                },
                toolbox: {
                  show: true,
                  feature: {
                    dataView: {readOnly: false},
                    saveAsImage: {},
                  }
                },
                dataZoom: {
                  show: false,
                },
                xAxis: [
                  {
                    type: 'category',
                    boundaryGap: false,
                    data: [2017,2018,2019,2020,2021],
                  },
                ],
                yAxis: [
                  {
                    type: 'category',
                    data:(function(){
                      var ydata = [];
                      for(var i = 0;i < 50;i++){
                        ydata.push(i);
                      }
                      return ydata;
                    })(),
                    boundaryGap: false
                  },
                ],
                series:[
                  {
                    yAxisIndex:0,
                    name:"总人口",
                    type:"line",
                    data:[],
                    itemStyle: {
                      normal: {
                        color: '#FF3030' //改变折线颜色
                      }
                    },
                  },
                ]
              },
              MChartOption:{
                title: {
                  text:"收入",
                  textStyle:{
                    fontSize:"18px",
                    color:"#54FF9F"

                  }
                },
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'cross',
                    label: {
                      backgroundColor: '#283b56'
                    }
                  }
                },
                legend: {
                  data:[
                    {name:'人均可支配收入/万',textStyle:{
                        color:['#54FF9F']
                    }
                  }
                  ],
                  top:"20px",
                },
                toolbox: {
                  show: true,
                  feature: {
                    dataView: {readOnly: false},
                    saveAsImage: {},
                  }
                },
                dataZoom: {
                  show: false,
                },
                xAxis: [
                  {
                    type: 'category',
                    boundaryGap: false,
                    data: [2017,2018,2019,2020,2021],
                  },
                ],
                yAxis: [
                  {
                    type: 'value',
                    min:0,
                    max:3
                  }
                ],
                series:[
                  {
                    name:"人均可支配收入/万",
                    type:"line",
                    data:[],
                    itemStyle: {
                      normal: {
                        color: '#54FF9F' //改变折线颜色
                      }
                    },
                  },
                ]
              },
              wordCloudOption:{
                title: {
                  text: "词云",
                  x: "center",
                  textStyle:{
                    color:"orange",
                  },
                  left:"0px"
                },
                backgroundColor: "rgb(0,15,26)",
                series: [
                  {
                    textStyle:{
                      color:"orange",
                    },
                    type: "wordCloud",
                    gridSize: 10,
                    sizeRange: [14, 60],
                    rotationRange: [0, 0],
                    left: "center",
                    top: "center",
                    right: null,
                    bottom: null,
                    width: "200%",
                    height: "200%",
                    data: [
                      {
                        name: "十九大精神",
                        value: 15000
                      },
                      {
                        name: "两学一做",
                        value: 10081
                      },{
                        name: "中华民族",
                        value: 9386
                      },
                      {
                        name: "马克思主义",
                        value: 7500
                      },
                      {
                        name: "民族复兴",
                        value: 7500
                      },
                      {
                        name: "社会主义制度",
                        value: 6500
                      },
                      {
                        name: "国防白皮书",
                        value: 6500
                      },
                      {
                        name: "创新",
                        value: 6000
                      },
                      {
                        name: "民主革命",
                        value: 4500
                      },
                      {
                        name: "文化强国",
                        value: 3800
                      },
                      {
                        name: "国家主权",
                        value: 3000
                      },
                    ]
                  }
                ]
              },
              currentIndex:-1,
              currentPoor:[],//省贫困县列表数据
              currentColor:[],
              currentArea:"中国",
              dataNews:[
                {
                  time:-1,
                  date:"1964年2月",
                  content:"《关于在社会主义教育运动中加强农村社会保险工作，帮助贫下中农克服困难的报告》揭示了农村贫困问题的正式提出"
                },
                {
                  time:-1,
                  date:"1979年至1985年",
                  content:"改革开放以工代赈帮助为主、救济为辅"
                },
                {
                  time:-1,
                  date:"1986年5月16日",
                  content:"贫困地区经济开发领导小组成立，我国开始以“贫困县”为单位开展扶贫工作，并确定了331个国家级贫困县"
                },
                {
                  time:-1,
                  date:"1994年4月15日",
                  content:"《国家八七扶贫攻坚计划》提出“用七年时间基本解决8000万农村贫困人口温饱问题”"
                },
                {
                  time:-1,
                  date:"2001年6月13日",
                  content:"出台《中国农村扶贫开发纲要（2001-2010年）》，“整村推进”成为扶贫重点"
                },
                {
                  time:-1,
                  date:"2011年12月1日",
                  content:"通过《中国农村扶贫开发纲要（2011-2020年）》，扶贫开发进入“两不愁三保障”阶段，将片区作为扶贫主战场"
                },
              ],
              currentNewsIndex:0,
              // isNewsShow:true,
              sidebarShow:false,
              isChartShow:true,
              isCurrrentNewsShow:true,
              timeAndPoorShow:true,
              isTimeShow:true,
              isMapShow:true,
              isPhotoShow:false,
              isLoading:false,
              // AutoTimedataMap = {},
              time3DArr:[
                            [0, 0, 0],
                            [0, 1, 0],
                            [0, 2, 0],
                            [0, 3, 0],
                            [0, 4, 0],
                            [0, 5, 0],
                            [0, 6, 0],
                            [0, 7, 0],
                            [0, 8, 0],
                            [0, 9, 0],
                            [0, 10, 0],
                            [0, 11, 0],
                            [1, 0, 0],
                            [1, 1, 0],
                            [1, 2, 0],
                            [1, 3, 0],
                            [1, 4, 0],
                            [1, 5, 0],
                            [1, 6, 0],
                            [1, 7, 0],
                            [1, 8, 0],
                            [1, 9, 0],
                            [1, 10, 0],
                            [1, 11, 0],
                            [2, 0, 0],
                            [2, 1, 0],
                            [2, 2, 0],
                            [2, 3, 0],
                            [2, 4, 0],
                            [2, 5, 0],
                            [2, 6, 0],
                            [2, 7, 0],
                            [2, 8, 0],
                            [2, 9, 0],
                            [2, 10, 0],
                            [2, 11, 0],
                            [3, 0, 0],
                            [3, 1, 0],
                            [3, 2, 0],
                            [3, 3, 0],
                            [3, 4, 0],
                            [3, 5, 0],
                            [3, 6, 1],
                            [3, 7, 0],
                            [3, 8, 0],
                            [3, 9, 0],
                            [3, 10, 0],
                            [3, 11, 5],
              ],
              MODE:11,
              spotClusterTarget:1,
              spotClusterTargetOptions:[{
                  value: 1,
                  label: '人均生产总值(元)'
                }, {
                  value: 2,
                  label: '农村人口可支配收入(元)'
                }, {
                  value: 3,
                  label: '农林牧渔产业增加值(万元)'
                }],
              areaSelectmode:0,//区域选择，0不选，1选省，2sketch，3连片区
              areaMode:'',
              areaModeOptions:[{
                  value: 1,
                  label: '省份分析'
                }, {
                  value: 2,
                  label: '划区分析'
                }, {
                  value: 3,
                  label: '贫困县连片区分析'
                }],
              provinceArea:[],
              provinceAreaName:'',
              connectArea:[],
              sidebarTipShow:false,
              connectAreaName:'',

              IsProvinceDivShow:false,
              IsConnectDivShow:false,
              areaSelectgraphicsArr:[],//盛放区域选择点的数组
              chooseABC:1,
              iscontrastABCShow:false,
              isArea3DShow:false,
              btnsColorClassArr:['activeBtnColor','blurBtnColor','blurBtnColor'],
              isChartShowTwoOne:false,
              ellipseMode:"China",
              isChartShow2_2:false,
              isChartShow2_3_up:false,
              isChartShow2_3_down:false,
              isYearSliderShow:false,
              isGDPTitleShow:false,
              IsAddButtonShow:true,
              // 是否开启尺寸修改
              resizeable: false,
              spatialYearList_1:[],
              spatialYear_2:2,
              spatialYear_3:3,
              spatialAnalystMode:"1",
              // 鼠标按下时的坐标，并在修改尺寸时保存上一个鼠标的位置
              clientX:0,
              clientY:0,
              // div可修改的最小宽高
              minW : 8,
              minH : 8,
              c:document.getElementById('GDP3Dcharts'),
              // 鼠标按下时的位置，使用n、s、w、e表示
              direc : '',
              change3DFlag:false,
              Is2DShow:true,
              // Is3DShow:true,
              centerM:[38.1,42.9,46.5,66.5,86.5,106.5,126.5,146.5],
              tempCM:[38.1,42.9,46.5,66.5,86.5,106.5,126.5,146.5],
              poorM:[1.83108,2.01671,2.19662,2.3821,2.59738,2.8228,3.07328,3.2189],
              tempPM:[0.608,0.685,0.765,0.845,0.938,1.037,1.157,1.259],

              poorN:[989.9,824.9,701.7,557.5,433.5,304.6,166.0,55.1,0],
              tempPN:[989.9,824.9,701.7,557.5,433.5,304.6,166.0,55.1,0],
              poorL:[10.2,8.5,7.2,5.7,4.5,3.1,1.7,0.6,0],
              tempPL:[10.2,8.5,7.2,5.7,4.5,3.1,1.7,0.6,0],
              tempPA:[832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,769,769,769,769,769,769,769,769,769,769,769,769,755,755,753,715,690,690,690,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,659,659,659,659,659,659,659,659,659,659,659,659,659,659,655,655,655,655,655,652,652,652,652,652,635,614,587,582,475,475,447,405,405,405,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,374,374,374,374,374,374,374,374,374,374,374,362,362,362,362,362,362,362,362,332,332,328,323,228,174,151,151,151,151,151,151,151,151,151,151,151,151,146,146,146,146,113,113,107,98,98,98,98,83,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,33,25,17,0],
              poorAN:[832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,832,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,831,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,809,769,769,769,769,769,769,769,769,769,769,769,769,755,755,753,715,690,690,690,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,684,659,659,659,659,659,659,659,659,659,659,659,659,659,659,655,655,655,655,655,652,652,652,652,652,635,614,587,582,475,475,447,405,405,405,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,393,374,374,374,374,374,374,374,374,374,374,374,362,362,362,362,362,362,362,362,332,332,328,323,228,174,151,151,151,151,151,151,151,151,151,151,151,151,146,146,146,146,113,113,107,98,98,98,98,83,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,33,25,17,0],
              isPoorCountryShow:false,
              expression:"",
              isNewsShow:true,
              currentPoorCountry:{
                name:"",
                date:"",
                position:{
                  longitude:"",
                  latitude:""
                },
                office:"",
                intro:""
              },
              props: { multiple: true },
              filterOptions: [{
                value: 1,
                label: '省份',
                children: [
                  {
                  value: 2,
                  label: '安徽省',
                },
                  {
                  value: 3,
                  label: '山西省',
                },
                  {
                  value: 4,
                  label: '河北省',
                },
                  {
                    value: 5,
                    label: '辽宁省',
                  },
                  {
                    value: 6,
                    label: '吉林省',
                  },
                  {
                    value: 7,
                    label: '黑龙江省',
                  },
                  {
                    value: 8,
                    label: '江苏省',
                  },
                  {
                    value: 9,
                    label: '福建省',
                  },
                  {
                    value: 10,
                    label: '江西省',
                  },
                  {
                    value: 11,
                    label: '河南省',
                  },
                  {
                    value: 12,
                    label: '湖北省',
                  },
                  {
                    value: 13,
                    label: '湖南省',
                  },
                  {
                    value: 14,
                    label: '广东省',
                  },
                  {
                    value: 15,
                    label: '海南省',
                  },
                  {
                    value: 16,
                    label: '四川省',
                  },
                  {
                    value: 17,
                    label: '贵州省',
                  },
                  {
                    value: 18,
                    label: '云南省',
                  },
                  {
                    value: 19,
                    label: '陕西省',
                  },
                  {
                    value: 20,
                    label: '甘肃省',
                  },
                  {
                    value: 21,
                    label: '青海省',
                  },
                  {
                    value: 22,
                    label: '上海市',
                  },
                  {
                    value: 23,
                    label: '天津市',
                  },
                  {
                    value: 24,
                    label: '重庆市',
                  },
                  {
                    value: 25,
                    label: '内蒙古自治区',
                  },
                  {
                    value: 26,
                    label: '广西壮族自治区',
                  },
                  {
                    value: 27,
                    label: '西藏自治区',
                  },
                  {
                    value: 28,
                    label: '宁夏回族自治区',
                  },
                  {
                    value: 29,
                    label: '新疆维吾尔自治区',
                  },
                ]
              }],
              anaShow:false,
              filterShow:false,
              filterModel:"",
              filterArray:[],
              result:1,
              legendShow:true,
              btnShow:true,
              targetUrl:"http://www.cpad.gov.cn/",
              provincesHref:[{"name":"新疆","url":"http://fpzg.cpad.gov.cn/429463/429470/429503/index.html"},{"name":"甘肃","url":"http://fpzg.cpad.gov.cn/429463/429470/429500/index.html"},{"name":"青海","url":"http://fpzg.cpad.gov.cn/429463/429470/429501/index.html"},{"name":"宁夏","url":"http://fpzg.cpad.gov.cn/429463/429470/429502/index.html"},{"name":"云南","url":"http://fpzg.cpad.gov.cn/429463/429470/429497/index.html"},{"name":"西藏","url":"http://fpzg.cpad.gov.cn/429463/429470/429498/index.html"},{"name":"陕西","url":"http://fpzg.cpad.gov.cn/429463/429470/429499/index.html"},{"name":"重庆","url":"http://fpzg.cpad.gov.cn/429463/429470/429494/index.html"},{"name":"四川","url":"http://fpzg.cpad.gov.cn/429463/429470/429495/index.html"},{"name":"贵州","url":"http://fpzg.cpad.gov.cn/429463/429470/429496/index.html"},{"name":"广东","url":"http://fpzg.cpad.gov.cn/429463/429470/429491/index.html"},{"name":"广西","url":"http://fpzg.cpad.gov.cn/429463/429470/429492/index.html"},{"name":"海南","url":"http://fpzg.cpad.gov.cn/429463/429470/429493/index.html"},{"name":"河南","url":"http://fpzg.cpad.gov.cn/429463/429470/429488/index.html"},{"name":"湖北","url":"http://fpzg.cpad.gov.cn/429463/429470/429489/index.html"},{"name":"湖南","url":"http://fpzg.cpad.gov.cn/429463/429470/429490/index.html"},{"name":"福建","url":"http://fpzg.cpad.gov.cn/429463/429470/429485/index.html"},{"name":"江西","url":"http://fpzg.cpad.gov.cn/429463/429470/429486/index.html"},{"name":"山东","url":"http://fpzg.cpad.gov.cn/429463/429470/429487/index.html"},{"name":"江苏","url":"http://fpzg.cpad.gov.cn/429463/429470/429482/index.html"},{"name":"浙江","url":"http://fpzg.cpad.gov.cn/429463/429470/429483/index.html"},{"name":"安徽","url":"http://fpzg.cpad.gov.cn/429463/429470/429484/index.html"},{"name":"吉林","url":"http://fpzg.cpad.gov.cn/429463/429470/429479/index.html"},{"name":"黑龙江","url":"http://fpzg.cpad.gov.cn/429463/429470/429480/index.html"},{"name":"上海","url":"http://fpzg.cpad.gov.cn/429463/429470/429481/index.html"},{"name":"山西","url":"http://fpzg.cpad.gov.cn/429463/429470/429476/index.html"},{"name":"内蒙古","url":"http://fpzg.cpad.gov.cn/429463/429470/429477/index.html"},{"name":"辽宁","url":"http://fpzg.cpad.gov.cn/429463/429470/429478/index.html"},{"name":"北京","url":"http://fpzg.cpad.gov.cn/429463/429470/429473/index.html"},{"name":"天津","url":"http://fpzg.cpad.gov.cn/429463/429470/429474/index.html"},{"name":"河北","url":"http://fpzg.cpad.gov.cn/429463/429470/429475/index.html"}],
              mapImgSrcArr:["static/img/暂无图片.png","static/img/暂无图片.png"],
              photoImgSrcArr:["static/img/暂无图片.png","static/img/暂无图片.png"],
            }
          },
    props:{
      earseLoad:Function,
    }
  }
</script>

<style lang="scss" scoped>
  a{
    text-decoration: none !important;
  }
  #viewDiv{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    background-color: rgb(0,15,26);
    overflow-y: hidden !important;
  }
  #mapShow-body{
    overflow-x:hidden;
    height: 100%;
    width: 100%;
    position: absolute;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    overflow-y: hidden !important;
  }

  #sidebar{
    margin-top: 200px;
    width:64px;
    background-color: rgb(84,92,100);
  }
  .sideBarAni-enter-active {transition: all 0.3s ease;}
  .sideBarAni-leave-active{transition: all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
  .sideBarAni-enter,.sideBarAni-leave-to{transform: translateX(-64px);opacity: 0;}
  .first-item{
    font-size: 50px;
  }

  #topbar {
    background: #fff;
    padding: 10px;
  }


  .action-button {
    font-size: 16px;
    background-color: transparent;
    border: 1px solid #d3d3d3;
    color: #6e6e6e;
    height: 32px;
    width: 32px;
    text-align: center;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
  }

  .action-button:hover,
  .action-button:focus {
    background: #0079c1;
    color: #e4e4e4;
          }

  .active {
    background: #0079c1;
    color: #e4e4e4;
  }

  .esri-ui-corner .esri-search {
    /* display: inline-block; */
    position: absolute;
    margin-left: 50px;
  }
  .el-menu{
    border:none
  }
  .esri-ui-corner .esri-expand .esri-widget--panel, .esri-ui-corner .esri-expand .esri-widget--panel-height-only, .esri-ui-corner .esri-component>.esri-widget--panel, .esri-ui-corner .esri-component.esri-widget--panel{
    width: 200px;
  }

  /*设置表格样式*/
  #charts{
    height:920px;
    width: 360px;
    position: absolute;
    right: 5px;
    top:5px ;
    z-index: 9999;
    opacity: 0.5;
    /*background-color: #060c21;*/
    box-shadow: 0px 0px 8px lightblue;
    /*opacity: 50%;*/
  }
  .allCharts-enter-active {transition: all 1s ease;}
  .allCharts-leave-active{transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
  .allCharts-enter,.allCharts-leave-to{transform: translateX(300px);opacity: 0;}

  #charts:hover{
   background-color: rgb(6,9,11);
    opacity: 0.8;
  }
  #concharts:hover{
   background-color: rgb(6,9,11);
    opacity: 0.8;
  }
  #time3DChart:hover{
   background-color: rgb(6,9,11);
    opacity: 0.8;;
  }

  #charts>#chartTitle{
    height: 30px;
    /*background-color: red;*/
    text-align: center;
    line-height: 30px;
    /*text-shadow: 0px 2px 5px #fff;*/
    box-sizing: border-box;
    color:cadetblue;
    font-weight:bolder;
    letter-spacing:30px;
  }

  #timeChange{
    position: absolute;
    top: 70px;
    left: 78px;
    color: #20dbfd;/* 浅蓝色 */
    text-shadow: 0 0 25px #00d8ff; /* 利用文字阴影 */
    font-size: 30px;
    font-family: 'yjsz'; /* 这是重点！！！ */
    line-height: 30px;
    text-align: center;
  }
    #numChange{
      position: absolute;
      top: 100px;
      left: 100px;
      /*background-color: #00f2fe;*/
      color: #20dbfd;/* 浅蓝色 */
      text-shadow: 0 0 25px #00d8ff; /* 利用文字阴影 */
      font-size: 46px;
      font-family: 'yjsz'; /* 这是重点！！！ */
      line-height: 46px;
      text-align: center;
  }
  #currentNumt>a{
    color: red;
    font-size: 20px;
    line-height: 5px;
  }
  #currentNumt{
    text-align: center;
    font-size: 16px;
    height: 30px;
  }
  #currentNumb{
    font-size: 16px;
    height: 20px;
    text-align: right;
  }

  #charts>#numChart{
    /*background-color: orange;*/
    float: left;
    width: 360px;
    height: 305px;
    margin-bottom: 10px;
    border-bottom:solid 2px white;
  }

  #charts>#GDPChart{
    /*background-color: green;*/
    float: left;
    width: 360px;
    margin-right: 20px;
    height: 305px;
    border-bottom:solid 2px white;
  }

  #charts>#poorChart{
    /*background-color: blue;*/
    float: left;
    width: 360px;
    height: 305px;
  margin-top: 10px;
  }

/*设计贫困县展示div*/
  #poorShow{
    height: 880px;
    width: 365px;
    position: absolute;
    right: 5px;
    top:5px ;
    z-index: 9999;
    color: #66afe9;
    background-color: black;
    color:white;
    opacity: 0.5;
    border-left: #00f2fe 5px double;
    border-top: #00f2fe 5px solid;
    border-bottom:#00f2fe 5px solid ;
  }
  .poorShowtrans-enter-active {transition: all 0.5s ease;}
  .poorShowtrans-leave-active{transition: all 0.5s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
  .poorShowtrans-enter,.poorShowtrans-leave-to{transform: translateX(-60px);opacity: 0;}

  #name{
    color: #20dbfd;/* 浅蓝色 */
    text-shadow: 0 0 25px #00d8ff; /* 利用文字阴影 */
    font-size: 20px;
    font-family: 'yjsz'; /* 这是重点！！！ */
  }
  #corName{
    text-align: center;
    display: inline-block;
    width: 30%;
    color: #b0c4de;
  }

  .imgW{
    height: 45px;
  }

/* 新闻主题样式*/
/*  #newsBody{*/

/*  }*/
/*  .newsA{*/
/*    display: block;*/
/*  }*/
/*  .newsDate{*/
/*    font-weight: bold;*/
/*    font-size: 20px;*/
/*    color:#FF6347;*/
/*  }*/

/*  .newContent{*/
/*    color: #00d8ff ;*/
/*    text-shadow: 0 0 25px #00d8ff; !* 利用文字阴影 *!*/
/*    font-family: 'yjsz'; !* 这是重点！！！ *!*/
/*    font-weight:bold ;*/
/*    font-size: 15px;*/
/*  }*/

  /*.newsShow-enter-active {transition: all 1s ease;}*/
  /*.newsShow-leave-active{transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);}*/

/*  设置按钮样式*/
  #backSystem{
    position: absolute;
    z-index: 9999;
    left: 90px;
    top: 88%;
    width: 200px;
    height: 50px;
    overflow: hidden;
    color:#03e9f4;
    letter-spacing:4px;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    transition: left .5s;
  }

  #backSystem:hover{
    color:#050801;
    background-color:#03e9f4;
    box-shadow: 0 0 5px #03e9f4,0 0 25px #03e9f4,0 0 50px #03e9f4,0 0 200px #03e9f4;
  }

  .span1{
    position: absolute;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right,transparent,#03e9f4);
    top: 0;
    left: -100%;
    animation: animatel 1s linear infinite;
    animation-delay:0s;
  }
  @-webkit-keyframes animatel{
    0%{left:-100%;}
    50%{left: 100%;}
    100%{left: 100%;}
  }

  .span2{
    position: absolute;
    width: 2px;
    height: 100%;
    background: linear-gradient(to bottom,transparent,#03e9f4);
    top: -100%;
    right: 0;
    animation: animatel2 1s linear infinite;
    animation-delay:0.25s;
  }
  @-webkit-keyframes animatel2{
    0%{top:-100%;}
    50%{top: 100%;}
    100%{top: 100%;}
  }

  .span3{
    position: absolute;
    width: 100%;
    height: 2px;
    background: linear-gradient(to left,transparent,#03e9f4);
    right: -100%;
    bottom: 0;
    animation: animatel3 1s linear infinite;
    animation-delay:0.5s;
  }
  @-webkit-keyframes animatel3{
    0%{right:-100%;}
    50%{right: 100%;}
    100%{right: 100%;}
  }

  .span4{
    position: absolute;
    width: 2px;
    height: 100%;
    background: linear-gradient(to top,transparent,#03e9f4);
    bottom: -100%;
    left: 0;
    animation: animatel4 1s linear infinite;
    animation-delay:0.75s;
  }
  @-webkit-keyframes animatel4{
    0%{bottom:-100%;}
    50%{bottom: 100%;}
    100%{bottom: 100%;}
  }

/*  实时新闻样式设置*/
  #currrentNews{
    position: absolute;
    opacity: 1;
    color:antiquewhite;
    font-weight: bold;
    left: 500px;
    top:5px;
    width: 940px;
    /*height: 30px;*/
    line-height: 30px;
    overflow: hidden;
  }

  #curNewsCon{
    position: absolute;
    width: 90%;
    top:0;
    left: 0;
  }
  #newsBtn{
    position: absolute;
    left: 95%;
    width: 5%;
    top:0;
    font-size: 20px;
    color: #00f2fe;
  }

  .bn-arrows-left{
    position: absolute;
    background-color: transparent;
    left: 0;
  }

  .bn-arrows-right{
    background-color: transparent;
    position: absolute;
    left: 50%;
  }

  .bn-arrows-left:hover{
    background-color:white;
    opacity: 0.5;
    cursor: pointer;
  }
  .bn-arrows-right:hover{
    background-color:white;
    opacity: 0.5;
    cursor: pointer;
  }

  .bn-arrows-left{
    margin-right:10px;
  }


  .curS1{
    position: absolute;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right,transparent,#03e9f4);
    top: 0;
    left: 0%;
  }
  .curS2{
    position: absolute;
    width: 100%;
    height: 2px;
    background: linear-gradient(to left,transparent,#03e9f4);
    left: 0%;
    bottom: 0;
  }

  #proPoor{
    position: absolute;
    top: 300px;
    left: 83px;
    width: 215px;
    height: 516px;
    /*color: #66afe9;*/
    /*background-color: #060c21;*/
    box-shadow: 0px 0px 8px lightblue;
    overflow: auto;
    text-align: center;
  }
  #proPoor::-webkit-scrollbar {
    display: none;
  }

  li{
    list-style: none;
  }

  .poorLi{
    display: inline-block;
    width: 107.5px;
    border: 1px solid #80bdff;
  }

  .poorLi:hover{
    cursor: pointer;
    background-color: #00f2fe;
  }

  #proPoorContent{
    position: absolute;
    display: block;
    /*top: 5%;*/
  }

  #proPoorTitle{
    position: fixed;
    left: 82px;
    top: 270px;
    width: 215px;
    height: 30px;
    background-color: #0c5460;
    box-shadow: 0px 0px 8px lightblue;
    color:#00f2fe;
    text-align: center;
    opacity: 1;
  }

  /*贫困县展示div*/
  #poorCountryShow{
    position: absolute;
    /*background-color: #66afe9;*/
    width: 85.9%;
    height: 98%;
    left: 302px;
    top:10px;
    font-size: 20px;
    z-index: 9999;
    /*border: 2px orangered solid;*/
    background-color: rgb(0,15,26);
  }

  .closeButton{
    position: absolute;
    left: 15.4%;
    top: 2px;
    z-index: 9999;
  }

  #poorShowBook{
    position: absolute;
    width: 18%;
    height: 100%;
    /*background-color: red;*/
    opacity: 1;
    /*background-color: whitesmoke;*/
    top: 1px;
    left: 0;
    //opacity: 0;
    color:#FFFACD;
    border: 1px solid white;
    border-right: none;
    background-color: #1b6d85;
    background-color: rgb(0,15,26);
  }
  #poorShowBookName{
    color: #B0E2FF;
    font-weight: bolder;
    font-family: my-font1;
    letter-spacing: 10px;
    text-align: center;
    font-size: 50px;
    line-height: 100px;
    /*background-color:  #BEE7E9;*/
    border-bottom: 1px solid #00f2fe;
  }
  #poorShowBookPosition{
    /*letter-spacing: 10px;*/
    line-height: 45px;
    /*background-color:  #BEE7E9;*/
    border-bottom: 1px solid #00f2fe;
    font-weight: bolder;
    color:white;
  }
  #poorShowBookDate{
    font-weight: bolder;
    line-height: 45px;
    border-bottom: 1px solid #00f2fe;
    color:white;
  }
  #poorShowBookOffice{
    margin-left: 5px;
    line-height: 45px;
    border-bottom: 1px solid #00f2fe;
  }
  #poorShowBookOffice>a{
    color:  rgb(102, 175, 233);
  }
  #poorShowBookIntro{
    line-height: 30px;
    overflow: auto;
    height: 630px;
    font-size: 15px;
    color: #3a9873;
    padding-left: 5px;
    padding-right: 5px;
  }
  #poorShowBookIntro::-webkit-scrollbar {
    display: none;
  }

  #poorShowMap{
    position: absolute;
    text-align: center;
    width: 60%;
    height: 100%;
    line-height: 30px;
    /*background-color: yellow;*/
    top: 0px;
    left: 18%;
    opacity: 1;
    //background-color: #1b6d85;
    border: solid white 1px;
  }
  #poorShowMapTitle{
    position: absolute;
    top:0;
    height: 5%;
    width: 100%;
    background-color: rgb(57,66,100);
    font-size: 40px;
    line-height: 40px;
    font-weight: bolder;
    color: white;
  }

  #poorShowMapBody{
    position: absolute;
    top:5%;
    width: 100%;
    height: 95%;
  }

  #poorShowPhotoBody{
    position: absolute;
    top:5%;
    width: 100%;
    height: 95%;
    //background-color: #80bdff;
  }

  #stateBtn{
    position: absolute;
    top:2px;
    right: 140px;
    width: 80px;
    background-color: #122b40;
    height: 40px;
    border-color: rgb(17,168,171);
  }

  .activeBtnColor{
    color:#90EE90 !important;
  }
  .blurBtnColor{
    color:white !important;
  }

  #PhotoBtn{
    position: absolute;
    right: 20px;
    height: 40px;
    top:2px;
    //color:white !important;
    background-color: #122b40;
    width: 80px;
    border-color: rgb(17,168,171);
  }

  #layerBtn{
    position: absolute;
    right: 270px;
    height: 40px;
    top:2px;
    //color:white !important;
    background-color: #122b40;
    width: 80px;
    border-color:#20B2AA;
    text-align: center;
  }

  #beforeImg{
    width: 990px;
    height: 110%;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  #nowImg{
    width: 990px;
    height: 100%;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  #bIContatiner{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 870px;
    overflow: hidden;
    float: left;
  }
  #nIContatiner{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 870px;
    overflow: hidden;
    float: left;
  }

  #sliderContainer{
    position: absolute;
    height: 100%;
    /*width: 10px;*/
    border: #8B8378 solid 3px;
    /*background-color: #00b09b;*/
    z-index: 9999;
  }

  #sliderBtn{
    position: absolute;
    top:48%;
    background-color:white;
    opacity: 0.5;
    width: 35px;
    height: 50px;
    left: -20px;
    //border: black solid 3px;
    border-left: none;
  }
  #sliderBtn:hover{
    opacity: 0.5;
    cursor:col-resize;
  }


  #poorShowCharts{
    position: absolute;
    top: 0px;
    left: 78%;
    width: 20%;
    height: 100%;
    /*opacity: 50%;*/
    /*background-color: #0c5460;*/
    border: white 2px solid;
    border-left: none;
  }

  .poorCountryAni-enter-active {transition: all 1s ease;}
  .poorCountryAni-leave-active{transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
  .poorCountryAni-enter,.poorCountryAni-leave-to{transform: translateX(-60px);opacity: 0;}

  #poorCountryPChart{
    height: 300px;
    width: 330px;
    /*background-color: blue;*/
    opacity: 0.5;
  }
  #poorCountryMChart{
    margin-top: 10px;
    height: 300px;
    width: 330px;
    opacity: 0.5;
    margin-bottom: 10px;
  }
  #wordCloud{
    height: 300px;
    width: 330px;
    /*opacity: 50%;*/
  }
  .newsShow-enter-active {transition: all 0.5s ease;}
  .newsShow-leave-active{transition: all 0.5s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
  .newsShow-enter,.newsShow-leave-to{transform: translateY(-300px);opacity: 0;}

  i.iconfont{
    font-size: 35px;
    color: #928dab;
  }

  i.el-icon-search{
    font-size: 30px;
    color: #928dab;
  }
/*  过滤器样式*/
  #filter{
    position: absolute;
    /*background-color: #928dab;*/
    /*width: 900px;*/
    /*height: 40px;*/
    height: 60px;
    left: 500px;
    top: 50px;
    /*background-color: #0c5460;*/
  }
  #filterMid{
    display: inline-block;
    width: 73px;
  }
  .filterAni-enter-active {transition: all 0.5s ease;}
  .filterAni-leave-active{transition: all 0.5s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
  .filterAni-enter,.filterAni-leave-to{transform: translateX(-60px);opacity: 0;}

  .inline-input{
    width: 600px;
  }
  .closeButton{
    background-color: #80bdff;
    border: none;
  }

  #cascader{
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;
    height: 30px;
  }
  #autocomplete{
    position: absolute;
    top: 0;
    left: 220px;
    width: 100px;
    height: 30px;
  }

  .el-icon-s-custom{
    font-size: 30px;
    color: #928dab;
  }

  /*设置图标样式*/
  #iconContainer{
    position: absolute;
    left: 60px;
    top: 10px;
  }
  #systemIcon{
    width: 70px;
    height: 60px;
  }

  #spatialAnalyst{
    position: absolute;
    left: 70px;
    top: 80px;
    // /*background-color:#2C3E50;*/
    height: 106px;
    width: 26%;
    opacity: 0.8;
    border: #66afe9 double 5px;
    overflow-y: auto;
    overflow-x: hidden;
    color:#03e9f4;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
  }

  #contrastABC{
    position: absolute;
    left: 70px;
    top: 80px;
    // /*background-color:#2C3E50;*/
    height: 180px;
    width: 20%;
    opacity: 0.8;
    border: #66afe9 double 5px;
    overflow-y: auto;
    overflow-x: hidden;
    color:#03e9f4;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
  }
  #uiABCLabel{
    background-color: white;
    margin:10px;
    height:100px;
    // font-size: 15px;
  }
   .el-tag {
     color:black;
    margin-left: 10px;
    background-color:white;
    font-size: 18px;
    border-width: 2px;
    // border-col
  }
  .button-new-tag {
    color:black;
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    font-size: 18px;
  }
  .input-new-tag {
    color:black;
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
    font-size: 18px;
  }
  .contrastWindowOne-enter-active {transition: all 1s ease;}
  .contrastWindowOne-leave-active{transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
  .contrastWindowOne-enter,.contrastWindowOne-leave-to{transform: translateX(-600px);opacity: 0;}
  .contrastWindowTwo-enter-active {transition: all 1s ease;}
  .contrastWindowTwo-leave-active{transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
  .contrastWindowTwo-enter,.contrastWindowTwo-leave-to{transform: translateX(-600px);opacity: 0;}
  .contrastWindowThree-enter-active {transition: all 1s ease;}
  .contrastWindowThree-leave-active{transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
  .contrastWindowThree-enter,.contrastWindowThree-leave-to{transform: translateX(-600px);opacity: 0;}
// "对比分析"div 查看对比分析结果
  #confirmContrast{
    height: 40px;
    width: 200px;
    margin-left: 25%;
    background-color:#03e9f4;
    color:black;
    font-size: 20px;
    line-height:40px;
  }
  #concharts{
    // background-color:black;
    height:920px;
    width: 500px;
    position: absolute;
    right: 5px;
    top:5px ;
    z-index: 9999;
     opacity: 0.8;
    /*background-color: #060c21;*/
    box-shadow: 0px 0px 8px lightblue;
    /*opacity: 50%;*/
  }
  #concharts>#autoTimeChart{
  /*background-color: green;*/
  float: left;
  width: 480px;
  height: 300px;
  }
  #concharts>#barLineChart{
  /*background-color: green;*/
  float: left;
  width: 480px;
  height: 300px;
  }
  #concharts>#radarChart{
  /*background-color: green;*/
  float: left;
  width: 480px;
  height: 300px;
  }

  //加载动画
  #Loading {
      width:100%;
      height: 100%;
      top:50%;
      left:50%;
      position: absolute;

      background-color: rgba(0, 0, 0, 0.4);
      -webkit-transform: translateY(-50%)  translateX(-50%);
      transform: translateY(-50%)  translateX(-50%);
      z-index:99999;
  }
  #threeBalls{
      top:50%;
      left:50%;
      position: absolute;
  }
  @-webkit-keyframes ball-beat {
      50% {
          opacity: 0.2;
          -webkit-transform: scale(0.75);
          transform: scale(0.75); }

      100% {
          opacity: 1;
          -webkit-transform: scale(1);
          transform: scale(1); } }

  @keyframes ball-beat {
      50% {
          opacity: 0.2;
          -webkit-transform: scale(0.75);
          transform: scale(0.75); }

      100% {
          opacity: 1;
          -webkit-transform: scale(1);
          transform: scale(1); } }

  .ball-beat > div {
      background-color:  #20dbfd;//#5D9BFF;
      width: 16px;
      height: 16px;
      border-radius: 100% !important;
      margin: 2px;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      display: inline-block;
      -webkit-animation: ball-beat 0.7s 0s infinite linear;
      animation: ball-beat 0.7s 0s infinite linear; }
  .ball-beat > div:nth-child(2n-1) {
      -webkit-animation-delay: 0.35s !important;
      animation-delay: 0.35s !important; }

  // 划区分析
  .Area3DWindow-enter-active {transition: all 1s ease;}
  .Area3DWindow-leave-active{transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
  .Area3DWindow-enter,.Area3DWindow-leave-to{transform: translateX(600px);opacity: 0;}
  .yearSelectionWindow-enter-active {transition: all 1s ease;}
  .yearSelectionWindow-leave-active{transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
  .yearSelectionWindow-enter,.yearSelectionWindow-leave-to{transform: translateY(400px);opacity: 0;}
  #yearSelection{
    position: absolute;
    left:480px;
    top:800px;

  }
  #sliderTitle{
    background-color:rgb(5,17,37);
    position: absolute;
    width:260px;
    top:570px;
    left:30px;
    font-size: 20px;
    color: whitesmoke;
    text-align: center;
    font-weight: bold;

  }
    #Area3D{
    position: absolute;
    left: 78px;
    top: 100px;
    // /*background-color:#2C3E50;*/
    height: 100px;
    width: 290px;
    opacity: 0.5;
    border: #66afe9 double 5px;
    overflow-y: auto;
    overflow-x: hidden;
    // color:#03e9f4;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
  }

  #areaModeDiv{
    font-size: 20px;
    position: absolute;
    top:20px;
    left:30px;
    width:220px;
    height:50px;
  }
  #provinceAreaDiv{
    font-size: 20px;
    position: absolute;
    top:20px;
    left:300px;
    width:200px;
    height:50px;
  }
  #connectAreaDiv{
    font-size: 20px;
    position: absolute;
    top:20px;
    left:300px;
    width:200px;
    height:50px;
  }
  #eagleEyeDiv{
    width: 100%;
    height: 100%;
  }
  #view3DDiv{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    background-color: rgb(0,15,26);
    overflow-y: hidden !important;
  }
  #time3DContainer{
    position: absolute;
    right: 5px;
    top: 470px;
    // /*background-color:#2C3E50;*/
    height: 450px;
    width: 25%;
    opacity: 0.8;
    border: #66afe9 double 5px;
    overflow-y: auto;
    overflow-x: hidden;
    // color:#03e9f4;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
  }
  #GDP3Dcharts{
    height:450px;
    width: 25%;
    position: absolute;
    right: 5px;
    top:5px ;
    z-index: 9999;
    border: #66afe9 double 5px;
    opacity: 0.9;
    /*background-color: #060c21;*/
    box-shadow: 0px 0px 8px lightblue;
    /*opacity: 50%;*/
  }
  #province{
    width: 120px;
    height: 40px;
    color: white;
    margin:20px;
    background-color: darkgray;
    left:50%;
    text-align: center;
    // position: absolute;
    line-height:40px;
    font-size: 18px;
    display: inline-block;
  }
  #sketchArea{
    width: 120px;
    height: 40px;
    color: white;
    margin:20px;
    background-color: darkgray;
    left:50%;
    // position: absolute;
    text-align: center;
    line-height:40px;
    font-size: 18px;
    display: inline-block;
  }
  #connectedArea{
    width: 120px;
    height: 40px;
    color: white;
    margin:20px;
    background-color: darkgray;
    left:50%;
    text-align: center;
    line-height:40px;
    font-size: 18px;
    display: inline-block;
  }
  #connectedAreaOption{
    display: inline-block;
    width: 180px;
    height: 35px;
    font-size: 16px;
  }
  #charts>#3dTimeChart{
    /*background-color: green;*/
    // float: left;
    // left:50%;
    // margin: 0 auto;
    width: 480px;
    position: absolute;
    // left: 50%;
    // margin-right: 20px;
    height: 400px;
  }
  .esri-component esri-sketch esri-widget{
    position: absolute;
    margin-right: 200px;
  }
    .el-autocomplete-suggestion el-popper{
    width:200px;
  }
</style>

<style>
  .SpotClusterTarget .el-select>.el-input{
    margin-top: 10px;
  }
  .el-radio__input.is-checked .el-radio__inner{
    border-color: #C8291C;;
    background: #C8291C;
  }
  .el-radio__input.is-checked+.el-radio__label{
    color:#C8291C;
  }
  .el-radio{
    color:white
  }
  .el-radio__label{
    font-weight:bold;
    font-size: 16px;
  }
  /* 时间轴圆点 */
  .el-slider__stop{
    height: 10px;
    width:10px;
  }
  /* 时间轴线 */
  .el-slider__bar{
    height:10px;
  }
  .el-slider__button{
    height: 22px;
    width:22px;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    background-color: rgb(0,0,0,0);
  }
  .el-tabs--border-card>.el-tabs__header{
    background-color: rgb(0,0,0,0);
  }
  .el-checkbox__label{
    font-size: 16px;
    color:white;
  }
  .el-tabs--border-card{
    background-color: rgb(0,0,0,0);
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover{
      color: #C8291C;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
      color: #C8291C;
      border-color: whitesmoke;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #C8291C;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #C8291C;
    border-color: #C8291C;
  }
  .el-checkbox__label{
    font-weight:bold;
  }
  .el-tabs__item{
      font-size: 20px;
      font-weight:bold;
  }
  #changeRouter{
    position: absolute;
    left: 70px;
    top: 10px;
    /*background-color: #7cbaec;*/
    /*width: 200px;*/
    /*height: 200px;*/
  }
  .btnOfAdmin{
    font-size: 20px !important;
    background-color: #5B55E6;
    color: white;
  }
  .btnofUser{
    font-size: 20px !important;
    background-color: #5B55E6;
    color: white;
  }

  .el-select-dropdown__item{
    font-size: 18px;
  }

  .inline-input[data-v-8e902200]{
    width:250px;
  }
  .el-input__inner{
    font-size: 18px;
  }
  .el-autocomplete-suggestion li{
    font-size: 18px;
  }
  .el-autocomplete-suggestion el-popper{
    width:250px;
  }

  /*标签样式*/
  #labelTextContainer{
    text-align: center;
    background-color:rgb(26,47,64);
    line-height: 30px;
    position: absolute;
    top: 39.4%;
    left: 1.5%;
    width: 200px;
    color: white;
    /*opacity: 70%;*/
    border-radius: 2% 2% 0 0;
  }
  .closeLegendBtn{
    background-color: rgb(26,47,64);;
    font-size: 5px;
    position: absolute;
    right: 10px;
    top: 2px;
    color: white !important;
    outline: none;
    border: none;
  }
  .closeLegendBtn:hover{
    color: red !important;
  }
  #openLegendBtnContainer{
    /*text-align: center;*/
    position: absolute;
    bottom: 0;
    left:1%;
  }
/*  侧边栏提示样式*/
  #sidebarTip{
    position: absolute;
    top: 200px;
    left: 0px;
    width: 10px;
    height: 400px;
    background-color:#7FFFD4;
    /*background: #00CED1;*/
  }

  .sidebarTipAni-enter-active {transition: all 0.3s ease;}
  .sidebarTipAni-leave-active{transition: all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
  .sidebarTipAni-enter,.sidebarTipAni-leave-to{transform: translateX(64px);opacity: 0;}

  #tipImgContainer{
    position: absolute;
    top: 30%;
    left: -3px;
  }
  .tipImg{
    width: 50px;
    height: 50px;
  }
  .arrowsLeft{
    position: absolute;
    background-color: transparent;
    left: 0%;
    top: 0;
    height: 28px;
  /* //width: 70px;

  //z-index: 999;
  //display: block;
  //height: 100px; */
  }
  .arrowsLeft:hover{
    background-color:white;
    /*opacity: 50%;*/
    cursor: pointer;
  }
  th,td{
    padding: .5em .7em;
    word-break: break-word;
    vertical-align: top;
    font-size: 12px;
    font-weight: 400;
  }
  th{
    width: 40%;
    text-align: left;
    border-right: 3px solid rgba(0,0,0,.05);
  }
  td{
    width: 60%;
  }
  #uiABCLabel{
    background-color: rgba(0,0,0,0);
  }
  .el-tag[data-v-8e902200]{
    /*background-color: rgb(0,0,0,0);*/
  }
  data-v-8e902200 .el-button{
    background-color:#98F5FF;
  }
  .closeLegendIcon{
    border: none;
    border: none;
    font-size: 20px;
    background-color: rgb(32,219,253);
   color: #1f2b37 !important;
  }

  #jianjieSpan{
    font-size: 30px;
  }
  .iconText{
    horiz-align: center;
    font-size: 30px;
    letter-spacing: 3px;
    font-family: 黑体;
    font-weight: bolder;
    position: absolute;
    top:10px;
    width: 200px;
    color: rgb(218,18,31);
  }
  .todayAndBefore{
    position: absolute;
    top: 5px;
    left: 42%;
  }
</style>
