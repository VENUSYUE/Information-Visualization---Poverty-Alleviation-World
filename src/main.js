import Vue from 'vue'

import "../static/icon/iconfont.css"
import '../static/font/fonts.css'

// 引入Elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'

// 引入路由
import router from './router'

// 引入echarts
import * as echarts from 'echarts';
import 'echarts-gl';
Vue.prototype.$echarts = echarts;

//引入axios
import axios from 'axios'
Vue.prototype.axios = axios;

//需要挂载到Vue原型上
Vue.use(ElementUI);

Vue.prototype.HOST = './api'

//创建事件总线
export const eventBus = new Vue();

//引入百度地图
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: '7FMYOvOtgAV06WyKIsumzXsGUBZsgGhb'
});

new Vue({
  el:'#app',
  components:{App},
  template:'<App/>',
  router,
})
