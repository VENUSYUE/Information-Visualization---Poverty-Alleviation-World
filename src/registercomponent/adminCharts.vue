<template>
  <div id="chartsContainer">
    <div id="chartTitle">
      <div id="chinaBtnContainer" title="全国尺度下的图表" @click="changeArea1" :style="{backgroundColor:color[0]}">
        全国尺度图表
      </div>
      <div id="countryBtnContainer" title="贫困县尺度下的图表" @click="changeArea2" :style="{backgroundColor: color[1]}">
        贫困县请求数量一览
      </div>
      <div id="chargeBtnContainer" title="负责人评分相关图表" @click="changeArea3" :style="{backgroundColor:color[2]}">
        负责人评价图表
      </div>
    </div>

    <!--全国尺度图表-->
    <div id="chinaChartContainer" v-show="whichArea==1">
      <div id="chageBtnContainer" v-show="whichKind!=3" @click="changeToOther">
        <el-button class="changeBtn"  icon="el-icon-arrow-right"></el-button>
      </div>
      <div id="chageBtnContainer2" v-show="whichKind!=1" @click="changeToChina">
        <el-button class="changeBtn2"  icon="el-icon-arrow-left"></el-button>
      </div>

      <div id="chinaLineChartContainer" ref="chinaLineChart" v-show="whichKind==1">

      </div>
      <div id="otherChartsContainer" v-show="whichKind==2">
        <div id="shanChart" ref="shanChart">

        </div>
      </div>
      <div id="zhuChartContainer" v-show="whichKind==3" ref="zhuChart">
      </div>
      <div>
      </div>
    </div>

    <!--县级数字-->
    <div id="totalNum" v-show="whichArea==2">
      <div id="totalNumTitle">请求总数量</div>
      {{totalNum}}
    </div>
    <div id="waitNum" v-show="whichArea==2">
      <div id="waitNumTitle">待处理请求数量</div>
      {{waitNum}}
    </div>
    <div id="peopleNum" v-show="whichArea==2">
      <div id="peopleNumTitle">系统注册贫困户</div>
      {{peopleNum}}
    </div>
    <div>

    </div>

    <!--县级多选框-->
    <div id="selectContainer" v-show="whichArea==2 && adminArea=='全国'">
      <el-cascader
        v-model="selectValue"
        :options="selectOption"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange"
      ></el-cascader>
    </div>

    <!--县级尺度图表-->
    <div id="poorCountryCloseBtnContaniner" @click="closeCharts()">
      <el-button class="pcCloseBtn" circle icon="el-icon-close"></el-button>
    </div>
    <div id="poorCountryChart" v-show="whichArea==2" ref="map">
    </div>

    <!--负责人图表-->
    <div id="chargePeopleChartContainer" v-show="whichArea==3" ref="chargePeopleChart">

    </div>

  </div>

</template>

<script>
import {eventBus} from "../main";
export default {
  name: "adminCharts",
  props:{
    closeCharts:Function,
    adminArea:String
  },
  created() {
    eventBus.$on('showChart',()=>{
      this.refreshchinaLineChart();
    })
  },
  mounted(){
    //初始化多选框列表
    var baseVlue = 30;
    for(let item of this.selectOption) {
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
  watch:{
    whichKind(newValue){
      if(newValue==1){
        this.refreshchinaLineChart();
      }else if(newValue==2){
        this.refreshShan();
      }else{
        this.refreshZhuChart();
      }
    }
  },
  methods:{
    refreshchinaLineChart(){

      this.axios.get('http://localhost:3000/getreqnumbydate').then(res=>{
        //设置option
        this.chinaLineChart  = this.$echarts.init(this.$refs['chinaLineChart']);
        this.chinaLineChartOption.series[0].data=res.data;
        this.chinaLineChart.setOption(this.chinaLineChartOption);
      })
    },
    refreshShan(){
      //获取数据 将数据绑定到图表
      this.shanOption.series[0].data.length=0;
      this.axios.get('http://localhost:3000/getreqnumbybelong').then(res=>{
        for(let item of res.data){
          this.shanOption.series[0].data.push({
            name:item.belong,
            value:item.num
          })
        }
        this.shanChart = this.$echarts.init(this.$refs['shanChart']);
        this.shanChart.setOption(this.shanOption);
      })
    },
    refreshZhuChart(){
      this.ZhuChartOption.xAxis[0].data.length=0;
      this.ZhuChartOption.xAxis[1].data.length=0;
      this.ZhuChartOption.series[0].data.length=0;
      this.ZhuChartOption.series[1].data.length=0;
      this.axios.get('http://localhost:3000/getreqnumbyname').then(res=>{
        for(let item of res.data){
          this.ZhuChartOption.xAxis[0].data.push(item.belong);
          this.ZhuChartOption.series[0].data.push(item.num);
        }
        this.axios.get('http://localhost:3000/getreqnumbynamestate').then(res=>{
          for(let item of res.data){
            this.ZhuChartOption.xAxis[1].data.push(item.belong);
            this.ZhuChartOption.series[1].data.push(item.num);
          }
          this.zhuChart = this.$echarts.init(this.$refs['zhuChart']);
          this.zhuChart.setOption(this.ZhuChartOption);
        })
      })
    },
    changeToOther(){
      this.whichKind++;
    },
    changeToChina(){
      this.whichKind--;
    },
    changeArea1(){
      this.whichArea=1;
      this.color[0] = '#80bdff';
      this.color[1] = 'rgb(91,85,230)';
      this.color[2] = 'rgb(91,85,230)';
      document.getElementById('chinaBtnContainer').style.color = 'black';
      document.getElementById('countryBtnContainer').style.color = 'white';
      document.getElementById('chargeBtnContainer').style.color = 'white';
      this.axios.get('http://localhost:3000/getreqnumbydate').then(res=>{
        //设置option
        this.chinaLineChart  = this.$echarts.init(this.$refs['chinaLineChart']);
        this.chinaLineChartOption.series[0].data=res.data;
        this.chinaLineChart.setOption(this.chinaLineChartOption);
      })
    },
    changeArea2(){
      this.whichArea=2;
      this.color[1] = '#80bdff';
      this.color[0] = 'rgb(91,85,230)';
      this.color[2] = 'rgb(91,85,230)';
      document.getElementById('chinaBtnContainer').style.color = 'white';
      document.getElementById('countryBtnContainer').style.color = 'black';
      document.getElementById('chargeBtnContainer').style.color = 'white';
      //县级图表展示
      /*更新数字*/
      if(this.adminArea=='全国'){
        this.getreqnumbypoornameUrl='http://localhost:3000/getreqnumbypoorname?name=秭归县';
      }else{
        this.getreqnumbypoornameUrl= 'http://localhost:3000/getreqnumbypoorname?name='+this.adminArea;
      }
      //向数据库发请求 获取数据
      this.axios.get(this.getreqnumbypoornameUrl).then(res=>{
        this.totalNum = res.data[0];
        this.waitNum = res.data[1];
        this.peopleNum = res.data[2];
      })
      /*更新地图*/
      this.axios.get('http://localhost:3000/getpoorjsonbyname?name='+this.adminArea).then(res=>{
        this.$echarts.registerMap('zigui', res.data);
        var map = this.$echarts.init(this.$refs['map']);
        map.setOption({
          tooltip: { //提示框组件。
            trigger: 'item', //数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
            textStyle: {
              fontSize: '12',
              color:'black'
            },
            backgroundColor: 'rgba(50,50,50,0)',
            padding: 0,
            enterable: true,
            position: 'inside',
            formatter: function(params) {
              //地图上面展示出来的数据
              var tipHtml = '';
              tipHtml =
                `<div class="mapStyle">
						<div>${params.name}</div>
						</div>`;
              return tipHtml;
            }
          },
          geo: [{
            show: true,
            map: 'zigui', // 地区名字  如 本项目中的 “南京”
            aspectScale: 1, // 地图倾斜度
            zoom: 1.15, // 地图放大倍数
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true,
              }
            },
            visualMap: [{
              show: true,
              type: 'piecewise',

              itemWidth: 20, // 图形的宽度，即长条的宽度。
              itemHeight: 40,
              // text: ['bar3D'],
              calculable: true,
              categories: ['4A', '3A', '其他'],
              textStyle: {
                color: '#fff'
              },
              inRange: {
                symbol: 'path://M512 144.896c-141.312 0-256.512 115.2-256.512 256.512 0 178.688 164.864 372.224 227.328 445.44 9.728 11.776 15.872 18.944 18.432 22.528 2.56 3.584 6.656 5.632 10.752 5.632 3.584 0 7.168-1.536 9.728-4.096l1.024-1.024 0.512-1.024c2.048-3.072 7.68-9.728 18.944-23.04 61.952-73.728 226.816-268.8 226.816-444.416C768.512 260.096 653.312 144.896 512 144.896z m0 352.256c-52.736 0-95.744-43.008-95.744-95.744s43.008-95.744 95.744-95.744 95.744 43.008 95.744 95.744-43.008 95.744-95.744 95.744z',
                color: ['#D65769', '#D9C124', '#32F597']
              },
              dimension: [
                [{ name: '4A' }],
              ],
              seriesIndex: 3
            }],
            roam: false, //地图设置不可拖拽，固定的
            itemStyle: {
              normal: {
                areaColor: '#00FFFF', // 地图颜色
                borderWidth: 4, // 边框的宽度
                shadowColor: '#0098d9', //  阴影颜色
                borderColor: '#00FFFF', // 边框颜色
                // shadowOffsetX: -5,
                // shadowOffsetY: 10,
                shadowBlur: 12, // 阴影的模糊大小
                shadowOffsetX: 0, //阴影水平方向上的偏移距离
                shadowOffsetY: 12, // 阴影垂直方向上的偏移距离
              },
            }
          }],
          series: [{
            name: '申请数量',
            type: 'map',
            mapType: 'zigui',
            aspectScale: 1,
            zoom: 1.15,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#fff",
                  fontSize: "12"
                }
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: "12",
                }
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#0371a0',
                borderColor: '#00FFFF',
              },
            },
            animation: false,
            data: [{
              "name": "伍家岗区",
              "value": 351
            }
            ]
          }]
        });
      })
    },
    changeArea3(){
      this.chargePeopleOption.xAxis[0].data.length=0;
      this.chargePeopleOption.series[0].data.length=0;
      this.chargePeopleOption.series[1].data.length=0;
      this.whichArea=3;
      this.color[2] = '#80bdff';
      this.color[1] = 'rgb(91,85,230)';
      this.color[0] = 'rgb(91,85,230)';
      document.getElementById('chinaBtnContainer').style.color = 'white';
      document.getElementById('countryBtnContainer').style.color = 'white';
      document.getElementById('chargeBtnContainer').style.color = 'black';
      //获取数据
      if(this.adminArea=='全国'){
        this.getallchargepeoplesUrl = 'http://localhost:3000/getallchargepeoples';
      }else{
        this.getallchargepeoplesUrl = 'http://localhost:3000/getpartchargepeoples?chargearea='+this.adminArea;
      }
      this.axios.get(this.getallchargepeoplesUrl).then(res=>{
        for(let item of res.data){
          this.chargePeopleOption.xAxis[0].data.push(item.name);
          this.chargePeopleOption.series[0].data.push(item.num);
          this.chargePeopleOption.series[1].data.push(item.grade);
        }
        this.chargePeopleChart =this.$echarts.init(this.$refs['chargePeopleChart']);
        this.chargePeopleChart.setOption(this.chargePeopleOption);
      });
    },
    handleChange(newPoor){
      for(let item of this.selectOption[newPoor[0]-2].children){
        if(item.value==newPoor[1]){
          //向数据库发请求 获取数据
          this.axios.get('http://localhost:3000/getreqnumbypoorname?name='+item.label).then(res=>{
            this.totalNum = res.data[0];
            this.waitNum = res.data[1];
            this.peopleNum = res.data[2];
          })
          /*更新地图*/
          this.axios.get('http://localhost:3000/getpoorjsonbyname?name='+item.label).then(res=>{
            console.log(res.data);
            this.$echarts.registerMap('zigui', res.data);
            var map = this.$echarts.init(this.$refs['map']);
            map.setOption({
              tooltip: { //提示框组件。
                trigger: 'item', //数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
                textStyle: {
                  fontSize: '12',
                  color:'black'
                },
                backgroundColor: 'rgba(50,50,50,0)',
                padding: 0,
                enterable: true,
                position: 'inside',
                formatter: function(params) {
                  //地图上面展示出来的数据
                  var tipHtml = '';
                  tipHtml =
                    `<div class="mapStyle">
						<div>${params.name}</div>
						</div>`;
                  return tipHtml;
                }
              },
              geo: [{
                show: true,
                map: 'zigui', // 地区名字  如 本项目中的 “南京”
                aspectScale: 1, // 地图倾斜度
                zoom: 1.15, // 地图放大倍数
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: true,
                  }
                },
                visualMap: [{
                  show: true,
                  type: 'piecewise',

                  itemWidth: 20, // 图形的宽度，即长条的宽度。
                  itemHeight: 40,
                  // text: ['bar3D'],
                  calculable: true,
                  categories: ['4A', '3A', '其他'],
                  textStyle: {
                    color: '#fff'
                  },
                  inRange: {
                    symbol: 'path://M512 144.896c-141.312 0-256.512 115.2-256.512 256.512 0 178.688 164.864 372.224 227.328 445.44 9.728 11.776 15.872 18.944 18.432 22.528 2.56 3.584 6.656 5.632 10.752 5.632 3.584 0 7.168-1.536 9.728-4.096l1.024-1.024 0.512-1.024c2.048-3.072 7.68-9.728 18.944-23.04 61.952-73.728 226.816-268.8 226.816-444.416C768.512 260.096 653.312 144.896 512 144.896z m0 352.256c-52.736 0-95.744-43.008-95.744-95.744s43.008-95.744 95.744-95.744 95.744 43.008 95.744 95.744-43.008 95.744-95.744 95.744z',
                    color: ['#D65769', '#D9C124', '#32F597']
                  },
                  dimension: [
                    [{ name: '4A' }],
                  ],
                  seriesIndex: 3
                }],
                roam: false, //地图设置不可拖拽，固定的
                itemStyle: {
                  normal: {
                    areaColor: '#00FFFF', // 地图颜色
                    borderWidth: 4, // 边框的宽度
                    shadowColor: '#0098d9', //  阴影颜色
                    borderColor: '#00FFFF', // 边框颜色
                    // shadowOffsetX: -5,
                    // shadowOffsetY: 10,
                    shadowBlur: 12, // 阴影的模糊大小
                    shadowOffsetX: 0, //阴影水平方向上的偏移距离
                    shadowOffsetY: 12, // 阴影垂直方向上的偏移距离
                  },
                }
              }],
              series: [{
                name: '申请数量',
                type: 'map',
                mapType: 'zigui',
                aspectScale: 1,
                zoom: 1.15,
                label: {
                  normal: {
                    show: true,
                    textStyle: {
                      color: "#fff",
                      fontSize: "12"
                    }
                  },
                  emphasis: {
                    show: false,
                    textStyle: {
                      fontSize: "12",
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    areaColor: '#0371a0',
                    borderColor: '#00FFFF',
                  },
                },
                animation: false,
                data: [{
                  "name": "伍家岗区",
                  "value": 351
                }
                ]
              }]
            });
          })
        }
      }

    }
  },
  data(){
    return{
      whichKind:1,
      whichArea:1,
      color:['#80bdff','rgb(91,85,230)','rgb(91,85,230)'],
      totalNum:'',
      waitNum:'',
      peopleNum:'',
      selectValue:"",
      chinaLineChartOption:{
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        title: {
          left: 'center',
          text: '请求数量变化折线图',
          textStyle:{
            color:'white'
          }
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: (()=>{
            var dateArr=[];
            //生成日期
            let baseDate = new Date(2021,6,1);
            let endDate = new Date(2021,9,16);
            dateArr.push(baseDate.getFullYear()+'/'+baseDate.getMonth()+'/'+baseDate.getDate());
            while(baseDate < endDate){
              baseDate.setDate(baseDate.getDate()+1);
              dateArr.push(baseDate.getFullYear()+'/'+baseDate.getMonth()+'/'+baseDate.getDate());
            }
            return dateArr;
          })()
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [ {
          start: 0,
          end: 10
        }],
        series: [
          {
            name: '请求数量',
            icona:"el-icon-arrow-right",
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
              color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(255, 158, 68)'
              }, {
                offset: 1,
                color: 'rgb(255, 70, 131)'
              }])
            },
            data: []
          }
        ]
      },
      shanOption:{
        title:{
          text:"系统注册贫困人口分布",
          left:"center",
          textStyle:{
            color:"white"
          }
        },
        legend: {
          left: 'left',
          textStyle: {
            color:'white'
          }
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        series: [
          {
            name: '面积模式',
            type: 'pie',
            radius: [50, 250],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: []
          }
        ]
      },
      ZhuChartOption:{
        title:{
          left:'center',
          textStyle:{
            color:'white'
          },
          text:"请求数量相关图表",
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        legend: {
          data:[
            {
              name:'总请求数量',
              textStyle:{
                color:'white'
              }
            },
            {
              name:'未处理请求数量',
              textStyle:{
                color:'white'
              }
            }
          ],
          top:"bottom"
        },
        tooltip: {},
        xAxis: [
          {type: 'category', gridIndex: 0,data:[]},
          {type: 'category', gridIndex: 1,data:[]}
        ],
        yAxis: [
          {gridIndex: 0},
          {gridIndex: 1}
        ],
        grid: [
          {bottom: '55%'},
          {top: '55%'}
        ],
        series: [
          // These series are in the first grid.
          {type: 'bar', seriesLayoutBy: 'row',data:[], xAxisIndex: 0, yAxisIndex: 0,name:'总请求数量'},
          {type: 'bar', seriesLayoutBy: 'row',data:[], xAxisIndex: 1, yAxisIndex: 1,name:'未处理请求数量'},
        ]
      },
      chargePeopleOption:{
        title: {
          text: '负责人处理申请数和评价情况',
          left:"center",
          textStyle:{
            color:'white'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['处理总数', '评价情况'],
          top:'bottom',
          textStyle:{
            color:'white'
          }

        },
        toolbox: {
          show: true,
          feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '处理总数',
            type: 'bar',
            data: [],
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          },
          {
            name: '评价情况',
            type: 'bar',
            data: [],
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          }
        ]
      },
      selectOption:[
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
      ]
    }
  }
}
</script>

<style scoped>
/*包围框样式*/
#chartsContainer{
  opacity: 0.9;
  position: absolute;
  left: 0;
  top:0;
  width: 100%;
  height: 100%;
  border: #7cbaec 1px solid;
}
/*标题选项样式*/
#chartTitle{
  position: absolute;
  left: 0;
  top:0;
  width: 100%;
  height: 10%;
  background-color: #00d8ff;
}
#chinaBtnContainer,#countryBtnContainer,#chargeBtnContainer{
  border-right: white solid 1px;
  border-bottom: white solid 1px;
  float: left;
  width: 33.333%;
  height: 100%;
  /*background-color: rgb(91,85,230);*/
  text-align: center;
  line-height: 80px;
  font-size: 30px;
  font-weight: bolder;
  letter-spacing: 5px;
  color: white;
}
#chinaBtnContainer{
  /*background-color: #80bdff;*/
  color: black;
}
#chinaBtnContainer:hover,#countryBtnContainer:hover,#chargeBtnContainer:hover{
  color: black;
  cursor: pointer;
}

/*图表所在区域*/
#chinaChartContainer{
  position: absolute;
  left: 0;
  top: 10%;
  width: 100%;
  height: 90%;
  /*background-color: #00b09b;*/
}
#chinaLineChartContainer{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color:  rgb(9,29,51);
}
#otherChartsContainer{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /*background-color: #00b09b;*/
}
/*切换按钮*/
#chageBtnContainer{
  position: absolute;
  top: 40%;
  right: 10px;
  z-index: 999;
}
.changeBtn{
  width: 50px;
  height: 50px;
}
#chageBtnContainer2{
  position: absolute;
  top: 40%;
  left: 10px;
  z-index: 999;
}
.changeBtn2{
  width: 50px;
  height: 50px;
}
#shanChart{
  float: left;
  height: 100%;
  width: 100%;
  background-color:  rgb(9,29,51);
}
#zhuChartContainer{
  position: absolute;
  top: 0;
  left:0;
  height: 100%;
  width: 100%;
  background-color:rgb(9,29,51) ;
}
#chargePeopleChartContainer{
  position: absolute;
  left: 0;
  top: 10%;
  width: 100%;
  height: 90%;
  background-color:rgb(9,29,51) ;
}
#poorCountryChart{
  position: absolute;
  left: 0;
  top: 10%;
  width: 100%;
  height: 90%;
  background-color:rgb(9,29,51) ;
}
#totalNum{
  position: absolute;
  width: 20%;
  left: 10px;
  top: 15%;
  font-size: 50px;
  font-family: my-font2;
  color: #00d8ff;
  z-index: 9999;
}
#totalNumTitle{
  font-size: 20px;
  color: rgb(37,204,111);
  font-weight: bolder;
}
#waitNum{
  position: absolute;
  width: 20%;
  left: 10px;
  top: 30%;
  font-size: 50px;
  font-family: my-font2;
  color: #00d8ff;
  z-index: 9999;
}
#waitNumTitle{
  font-size: 20px;
  color: rgb(254,13,13);
  font-weight: bolder;
}
#peopleNum{
  position: absolute;
  width: 20%;
  right: 10px;
  top: 15%;
  font-size: 100px;
  font-family: my-font2;
  color: #00d8ff;
  z-index: 9999;
}
#peopleNumTitle{
  font-size: 20px;
  color: #FFA500;
  font-weight: bolder;
  margin-left: 20px;
}
#selectContainer{
  position: absolute;
  top: 15%;
  left: 15%;
  z-index: 9999;
}

#poorCountryCloseBtnContaniner{
  position: absolute;
  right: 0;
  top: 0;
  color: white;
}
</style>
