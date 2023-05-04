<template>

  <div id="register-bodyer">

    <div id="backBtn" v-show="isLoadShow">
      <el-button type="success"  class="el-button"  @click="backMap" icon="el-icon-back">返回</el-button>
    </div>

    <!------------ Starry Sky------------------------>
    <div class="stars" v-show="isLoadShow"></div>
    <div class="twinkling" v-show="isLoadShow"></div>
    <!------------ End - Starry Sky------------------>
    <div class="wrapper" v-show="isLoadShow">
      <!------------ Parallax Scene-------------------->
      <ul id="scene" class="scene">
        <li class="layer" data-depth="0.00"></li>
        <li class="layer" data-depth="0.30"><a href="#0">防返贫系统</a></li>
      </ul>
      <!------------ End - Parallax Scene------------->

    </div>

    <div id="chooseUserTypeContainer" v-show="isLoadShow">
      <el-radio v-model="radio" label="1" class="radioInRegister">用户</el-radio>
      <el-radio v-model="radio" label="2" class="radioInRegister">管理员</el-radio>
    </div>

    <div class="wrapper2" v-show="isLoadShow">
      <form class="login">
        <p class="title">防返贫系统登录界面</p>
        <input v-model="username" type="text" placeholder="用户名" autofocus/>
        <i class="fa fa-user"></i>
        <input type="password"  v-model="passWord" placeholder="密码" />
        <i class="fa fa-key"></i>
        <a href="#" @click="signUp">还没有账户?点我注册</a>
        <button>
          <i class="spinner"></i>
          <span class="state">登陆系统</span>
        </button>
      </form>
      <!--      <footer><a target="blank" href="http://boudra.me/">boudra.me</a></footer>-->
    </div>

    <!--注册界面-->
    <transition name="signAni">
      <div id="signForm" v-show="signUpShow && isLoadShow">
        <div id="formTitle">注册
          <div id="titleSpan"></div>
        </div>
        <input id="username" v-model="sizeForm.username" placeholder="用户名" autocomplete="off"></input>
        <div id="border1"></div>
        <input id="passWord" v-model="sizeForm.passWord" placeholder="密码" autocomplete="off"></input>
        <div id="border2"></div>
        <input id="phoneNumber" v-model="sizeForm.phonenumber" placeholder="手机号码" autocomplete="off"></input>
        <div id="border3"></div>
        <div id="sexy">
          <el-radio v-model="sizeForm.sexy" label="男">男</el-radio>
          <el-radio v-model="sizeForm.sexy" label="女">女</el-radio>
        </div>
        <div id="btns">
          <button id="btn1" @click="submitData">提交</button>
          <button id="btn2" @click="cancelSign">取消</button>
        </div>
      </div>
    </transition>

    <!--两种界面-->
    <div v-show="!(isLoadShow)">
      <div v-show="normalShow">
        <noramlUser :sizeForm="passArr" :center="{lng:passArr[10],lat:passArr[11]}" ref="userChild"></noramlUser>
      </div>
    </div>
  </div>
</template>

<script>
import noramlUser from '../registercomponent/normalUser'
export default {
  components:{
    noramlUser,
  },
  props:{
    earseLoad:Function,
  },
  beforeDestroy() {
  },
  mounted() {
    setTimeout(()=>{
      this.earseLoad();
    },500);
    (function(window, document, undefined) {

      var NAME = 'Parallax';
      var MAGIC_NUMBER = 30;
      var DEFAULTS = {
        calibrationThreshold: 100,
        calibrationDelay: 500,
        supportDelay: 500,
        calibrateX: false,
        calibrateY: true,
        invertX: true,
        invertY: true,
        limitX: false,
        limitY: false,
        scalarX: 10.0,
        scalarY: 10.0,
        frictionX: 0.1,
        frictionY: 0.1
      };

      function Parallax(element, options) {

        // DOM Context
        this.element = element;
        this.layers = element.getElementsByClassName('layer');

        // Data Extraction
        var data = {
          calibrateX: this.data(this.element, 'calibrate-x'),
          calibrateY: this.data(this.element, 'calibrate-y'),
          invertX: this.data(this.element, 'invert-x'),
          invertY: this.data(this.element, 'invert-y'),
          limitX: this.data(this.element, 'limit-x'),
          limitY: this.data(this.element, 'limit-y'),
          scalarX: this.data(this.element, 'scalar-x'),
          scalarY: this.data(this.element, 'scalar-y'),
          frictionX: this.data(this.element, 'friction-x'),
          frictionY: this.data(this.element, 'friction-y')
        };

        // Delete Null Data Values
        for (var key in data) {
          if (data[key] === null) delete data[key];
        }

        // Compose Settings Object
        this.extend(this, DEFAULTS, options, data);

        // States
        this.calibrationTimer = null;
        this.calibrationFlag = true;
        this.enabled = false;
        this.depths = [];
        this.raf = null;

        // Offset
        this.ox = 0;
        this.oy = 0;
        this.ow = 0;
        this.oh = 0;

        // Calibration
        this.cx = 0;
        this.cy = 0;

        // Input
        this.ix = 0;
        this.iy = 0;

        // Motion
        this.mx = 0;
        this.my = 0;

        // Velocity
        this.vx = 0;
        this.vy = 0;

        // Callbacks
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onDeviceOrientation = this.onDeviceOrientation.bind(this);
        this.onOrientationTimer = this.onOrientationTimer.bind(this);
        this.onCalibrationTimer = this.onCalibrationTimer.bind(this);
        this.onAnimationFrame = this.onAnimationFrame.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);

        // Initialise
        this.initialise();
      }

      Parallax.prototype.extend = function() {
        if (arguments.length > 1) {
          var master = arguments[0];
          for (var i = 1, l = arguments.length; i < l; i++) {
            var object = arguments[i];
            for (var key in object) {
              master[key] = object[key];
            }
          }
        }
      };

      Parallax.prototype.data = function(element, name) {
        return this.deserialize(element.getAttribute('data-'+name));
      };

      Parallax.prototype.deserialize = function(value) {
        if (value === "true") {
          return true;
        } else if (value === "false") {
          return false;
        } else if (value === "null") {
          return null;
        } else if (!isNaN(parseFloat(value)) && isFinite(value)) {
          return parseFloat(value);
        } else {
          return value;
        }
      };

      Parallax.prototype.offset = function(element) {
        var x = 0, y = 0;
        while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
          x += element.offsetLeft - element.scrollLeft;
          y += element.offsetTop - element.scrollTop;
          element = element.offsetParent;
        }
        return {top:y, left:x};
      };

      Parallax.prototype.camelCase = function(value) {
        return value.replace(/-+(.)?/g, function(match, character){
          return character ? character.toUpperCase() : '';
        });
      };

      Parallax.prototype.transformSupport = function(value) {
        var element = document.createElement('div');
        var propertySupport = false;
        var propertyValue = null;
        var featureSupport = false;
        var cssProperty = null;
        var jsProperty = null;
        for (var i = 0, l = this.vendors.length; i < l; i++) {
          if (this.vendors[i] !== null) {
            cssProperty = this.vendors[i][0] + 'transform';
            jsProperty = this.vendors[i][1] + 'Transform';
          } else {
            cssProperty = 'transform';
            jsProperty = 'transform';
          }
          if (element.style[jsProperty] !== undefined) {
            propertySupport = true;
            break;
          }
        }
        switch(value) {
          case '2D':
            featureSupport = propertySupport;
            break;
          case '3D':
            if (propertySupport) {
              document.body.appendChild(element);
              element.style[jsProperty] = 'translate3d(1px,1px,1px)';
              propertyValue = window.getComputedStyle(element).getPropertyValue(cssProperty);
              featureSupport = propertyValue !== undefined && propertyValue.length > 0 && propertyValue !== "none";
              document.body.removeChild(element);
            }
            break;
        }
        return featureSupport;
      };

      Parallax.prototype.ww = null;
      Parallax.prototype.wh = null;
      Parallax.prototype.hw = null;
      Parallax.prototype.hh = null;
      Parallax.prototype.portrait = null;
      Parallax.prototype.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|IEMobile)/);
      Parallax.prototype.vendors = [null,['-webkit-','webkit'],['-moz-','Moz'],['-o-','O'],['-ms-','ms']];
      Parallax.prototype.motionSupport = window.DeviceMotionEvent !== undefined;
      Parallax.prototype.orientationSupport = window.DeviceOrientationEvent !== undefined;
      Parallax.prototype.orientationStatus = 0;
      Parallax.prototype.transform2DSupport = Parallax.prototype.transformSupport('2D');
      Parallax.prototype.transform3DSupport = Parallax.prototype.transformSupport('3D');

      Parallax.prototype.initialise = function() {

        // Configure Context Styles
        if (this.transform3DSupport) this.accelerate(this.element);
        var style = window.getComputedStyle(this.element);
        if (style.getPropertyValue('position') === 'static') {
          this.element.style.position = 'relative';
        }

        // Configure Layer Styles
        for (var i = 0, l = this.layers.length; i < l; i++) {
          var layer = this.layers[i];
          if (this.transform3DSupport) this.accelerate(layer);
          layer.style.position = i ? 'absolute' : 'relative';
          layer.style.display = 'block';
          layer.style.height = '100%';
          layer.style.width = '100%';
          layer.style.left = 0;
          layer.style.top = 0;

          // Cache Layer Depth
          this.depths.push(this.data(layer, 'depth') || 0);
        }

        // Setup
        this.updateDimensions();
        this.enable();
        this.queueCalibration(this.calibrationDelay);
      };

      Parallax.prototype.updateDimensions = function() {

        // Cache Context Dimensions
        this.ox = this.offset(this.element).left;
        this.oy = this.offset(this.element).top;
        this.ow = this.element.offsetWidth;
        this.oh = this.element.offsetHeight;

        // Cache Window Dimensions
        this.ww = window.innerWidth;
        this.wh = window.innerHeight;
        this.hw = this.ww / 2;
        this.hh = this.wh / 2;
      };

      Parallax.prototype.queueCalibration = function(delay) {
        clearTimeout(this.calibrationTimer);
        this.calibrationTimer = setTimeout(this.onCalibrationTimer, delay);
      };

      Parallax.prototype.enable = function() {
        if (!this.enabled) {
          this.enabled = true;
          if (this.orientationSupport) {
            this.portrait = null;
            window.addEventListener('deviceorientation', this.onDeviceOrientation);
            setTimeout(this.onOrientationTimer, this.supportDelay);
          } else {
            this.cx = 0;
            this.cy = 0;
            this.portrait = false;
            window.addEventListener('mousemove', this.onMouseMove);
          }
          window.addEventListener('resize', this.onWindowResize);
          this.raf = requestAnimationFrame(this.onAnimationFrame);
        }
      };

      Parallax.prototype.disable = function() {
        if (this.enabled) {
          this.enabled = false;
          if (this.orientationSupport) {
            window.removeEventListener('deviceorientation', this.onDeviceOrientation);
          } else {
            window.removeEventListener('mousemove', this.onMouseMove);
          }
          window.removeEventListener('resize', this.onWindowResize);
          cancelAnimationFrame(this.raf);
        }
      };

      Parallax.prototype.calibrate = function(x, y) {
        this.calibrateX = x === undefined ? this.calibrateX : x;
        this.calibrateY = y === undefined ? this.calibrateY : y;
      };

      Parallax.prototype.invert = function(x, y) {
        this.invertX = x === undefined ? this.invertX : x;
        this.invertY = y === undefined ? this.invertY : y;
      };

      Parallax.prototype.friction = function(x, y) {
        this.frictionX = x === undefined ? this.frictionX : x;
        this.frictionY = y === undefined ? this.frictionY : y;
      };

      Parallax.prototype.scalar = function(x, y) {
        this.scalarX = x === undefined ? this.scalarX : x;
        this.scalarY = y === undefined ? this.scalarY : y;
      };

      Parallax.prototype.limit = function(x, y) {
        this.limitX = x === undefined ? this.limitX : x;
        this.limitY = y === undefined ? this.limitY : y;
      };

      Parallax.prototype.clamp = function(value, min, max) {
        value = Math.max(value, min);
        value = Math.min(value, max);
        return value;
      };

      Parallax.prototype.css = function(element, property, value) {
        var jsProperty = null;
        for (var i = 0, l = this.vendors.length; i < l; i++) {
          if (this.vendors[i] !== null) {
            jsProperty = this.camelCase(this.vendors[i][1] + '-' + property);
          } else {
            jsProperty = property;
          }
          if (element.style[jsProperty] !== undefined) {
            element.style[jsProperty] = value;
            break;
          }
        }
      };

      Parallax.prototype.accelerate = function(element) {
        this.css(element, 'transform', 'translate3d(0,0,0)');
        this.css(element, 'transform-style', 'preserve-3d');
        this.css(element, 'backface-visibility', 'hidden');
      };

      Parallax.prototype.setPosition = function(element, x, y) {
        x += '%';
        y += '%';
        if (this.transform3DSupport) {
          this.css(element, 'transform', 'translate3d('+x+','+y+',0)');
        } else if (this.transform2DSupport) {
          this.css(element, 'transform', 'translate('+x+','+y+')');
        } else {
          element.style.left = x;
          element.style.top = y;
        }
      };

      Parallax.prototype.onOrientationTimer = function(event) {
        if (this.orientationSupport && this.orientationStatus === 0) {
          this.disable();
          this.orientationSupport = false;
          this.enable();
        }
      };

      Parallax.prototype.onCalibrationTimer = function(event) {
        this.calibrationFlag = true;
      };

      Parallax.prototype.onWindowResize = function(event) {
        this.updateDimensions();
      };

      Parallax.prototype.onAnimationFrame = function() {
        var dx = this.ix - this.cx;
        var dy = this.iy - this.cy;
        if ((Math.abs(dx) > this.calibrationThreshold) || (Math.abs(dy) > this.calibrationThreshold)) {
          this.queueCalibration(0);
        }
        if (this.portrait) {
          this.mx = (this.calibrateX ? dy : this.iy) * this.scalarX;
          this.my = (this.calibrateY ? dx : this.ix) * this.scalarY;
        } else {
          this.mx = (this.calibrateX ? dx : this.ix) * this.scalarX;
          this.my = (this.calibrateY ? dy : this.iy) * this.scalarY;
        }
        if (!isNaN(parseFloat(this.limitX))) {
          this.mx = this.clamp(this.mx, -this.limitX, this.limitX);
        }
        if (!isNaN(parseFloat(this.limitY))) {
          this.my = this.clamp(this.my, -this.limitY, this.limitY);
        }
        this.vx += (this.mx - this.vx) * this.frictionX;
        this.vy += (this.my - this.vy) * this.frictionY;
        for (var i = 0, l = this.layers.length; i < l; i++) {
          var layer = this.layers[i];
          var depth = this.depths[i];
          var xOffset = this.vx * depth * (this.invertX ? -1 : 1);
          var yOffset = this.vy * depth * (this.invertY ? -1 : 1);
          this.setPosition(layer, xOffset, yOffset);
        }
        this.raf = requestAnimationFrame(this.onAnimationFrame);
      };

      Parallax.prototype.onDeviceOrientation = function(event) {

        // Validate environment and event properties.
        if (!this.desktop && event.beta !== null && event.gamma !== null) {

          // Set orientation status.
          this.orientationStatus = 1;

          // Extract Rotation
          var x = (event.beta  || 0) / MAGIC_NUMBER; //  -90 :: 90
          var y = (event.gamma || 0) / MAGIC_NUMBER; // -180 :: 180

          // Detect Orientation Change
          var portrait = this.wh > this.ww;
          if (this.portrait !== portrait) {
            this.portrait = portrait;
            this.calibrationFlag = true;
          }

          // Set Calibration
          if (this.calibrationFlag) {
            this.calibrationFlag = false;
            this.cx = x;
            this.cy = y;
          }

          // Set Input
          this.ix = x;
          this.iy = y;
        }
      };

      Parallax.prototype.onMouseMove = function(event) {

        // Calculate Input
        this.ix = (event.pageX - this.hw) / this.hw;
        this.iy = (event.pageY - this.hh) / this.hh;
      };

      // Expose Parallax
      window[NAME] = Parallax;

    })(window, document);

    /**
     * Request Animation Frame Polyfill.
     * @author Tino Zijdel
     * @author Paul Irish
     * @see https://gist.github.com/paulirish/1579671
     */
    ;(function() {

      var lastTime = 0;
      var vendors = ['ms', 'moz', 'webkit', 'o'];

      for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
      }

      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function() { callback(currTime + timeToCall); },
            timeToCall);
          lastTime = currTime + timeToCall;
          return id;
        };
      }

      if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
        };
      }

    }());
    var scene = document.getElementById('scene');
    var parallax = new Parallax(scene);
    let _self = this;
    $('.login').on('submit', function(e){
      e.preventDefault();
      var $this = $(this),
        $state = $this.find('button > .state');
      $this.addClass('loading');
      $state.html('验证中');

      if(_self.radio===''){
        _self.$message.error('登陆失败!请选择您的用户类型!');
        setTimeout( ()=> {
          $this.removeClass('ok loading');
          $this.removeClass('warn');
          $state.html('登陆系统');
        },500)
        return;
      }
      if(_self.radio=='1'){
        _self.axios.get("http://localhost:3000/login?username="+_self.username+"&passWord="+_self.passWord).then(res=> {
          if (res.data.length > 0) {
            $this.addClass('ok');
            $state.html('欢迎进入系统!');

            setTimeout(() => {
              if (res.data[0].type == 0) {//普通用户
                _self.$route.meta.normal = true;
                _self.normalShow = true;
                _self.passArr.push(0);
                _self.passArr.push(res.data[0].username);
                _self.passArr.push(res.data[0].passWord);
                _self.passArr.push(res.data[0].phone);
                _self.passArr.push(res.data[0].sexy);
                _self.$refs['userChild'].init();
              } else {//贫困户
                _self.$route.meta.normal = true;
                _self.normalShow = true;
                _self.passArr.push(1);
                _self.passArr.push(res.data[0].username);
                _self.passArr.push(res.data[0].passWord);
                _self.passArr.push(res.data[0].phone);
                _self.passArr.push(res.data[0].sexy);
                _self.passArr.push(res.data[0].name);
                _self.passArr.push(res.data[0].id);
                _self.passArr.push(res.data[0].belong);
                _self.passArr.push(res.data[0].jid);
                _self.passArr.push(res.data[0].position);
                _self.passArr.push(res.data[0].longitude);
                _self.passArr.push(res.data[0].latitude);
                _self.$refs['userChild'].init();
              }
              _self.isLoadShow = false;
              _self.$route.meta.login = false;
            }, 2000);
          } else{
            $this.addClass('warn');
            $state.html('账号或密码有误,请重新登录！');
            setTimeout( ()=> {
              $this.removeClass('ok loading');
              $this.removeClass('warn');
              $state.html('登陆系统');
            },1000)
          }
        })
      }else{
        _self.axios.get("http://localhost:3000/admin?username="+_self.username+"&passWord="+_self.passWord).then(res=>{
          if(res.data.length>0){
            $this.addClass('ok');
            $state.html('管理员！欢迎进入系统!');
            setTimeout(()=>{
              // _self.adminShow=true;
              _self.$router.replace({name:'admin',params:{adminArea:res.data[0].adminarea}});
              _self.isLoadShow = false;
            },2000);
          }
          else{
            $this.addClass('warn');
            $state.html('账号或密码有误,请重新登录！');
            setTimeout( ()=> {
              $this.removeClass('ok loading');
              $this.removeClass('warn');
              $state.html('登陆系统');
            },1000)
          }
        });
      }
    })
  },
  methods:{
    backMap(){
      this.$router.replace('/mapshow');
    },
    jump(){
      this.$router.replace({path:'/mapshow'})
    },
    signUp(){
      this.signUpShow = true;
    },
    cancelSign(){
      this.signUpShow = false;
    },
    submitData(){
      //axios发送请求
      let param = new URLSearchParams();
      param.append("username",this.sizeForm.username);
      param.append("passWord",this.sizeForm.passWord);
      param.append("phonenumber",this.sizeForm.phonenumber);
      param.append("sexy",this.sizeForm.sexy);

      this.axios.post("http://120.27.240.160:3000/sign",param ,{
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        }
      }).then(res=>{
        if(res.data==false){
          this.$message({
            message: '用户名重复!请重新注册!',
            type: 'warning'
          });
          this.sizeForm.username="";
          this.sizeForm.passWord="";
          this.sizeForm.phonenumber="";
          this.sizeForm.sexy="";
        }
        else{
          this.$message({
            message: '成功创建账号!',
            type: 'success'
          });
          this.sizeForm.username="";
          this.sizeForm.passWord="";
          this.sizeForm.phonenumber="";
          this.sizeForm.sexy="";
          this.signUpShow=false;
        }
      })
    }
  },
  data:function () {
    return{
      radio:'',
      isLoadShow: true,
      username:"",
      passWord:"",
      normalShow:false,
      poorShow:false,
      adminShow:false,
      signUpShow:false,
      sizeForm: {
        type:"",
        username:"",
        passWord:"",
        phonenumber:"",
        sexy:"",
      },
      passArr:[],
    }
  },
}
</script>

<style>
/*body {*/
/*  font-family: "Open Sans", sans-serif;*/
/*  height: 100vh;*/
/*  !*background: url("https://i.imgur.com/HgflTDf.jpg") 50% fixed;*!*/
/*  background-size: cover;*/
/*}*/

@keyframes spinner {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(359deg);
  }
}

* {
  box-sizing: border-box;
}

.wrapper2 {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 1000px;
  padding: 20px;
  z-index: 800;
  /*background: rgba(4, 40, 68, 0.85);*/
}

.login {
  z-index: 800;
  border-radius: 2px 2px 5px 5px;
  padding: 10px 20px 20px 20px;
  width: 90%;
  max-width: 400px;
  background: rgb(78 76 76);
  position: relative;
  padding-bottom: 80px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
  left: 20px;
}

.login.loading button {
  max-height: 100%;
  padding-top: 50px;
}

.login.loading button .spinner {
  opacity: 1;
  top: 40%;
}

.login.ok button {
  background-color: #8bc34a;
}
.login.warn button {
  background-color: rgb(230,76,101);
}

.login.ok button .spinner {
  border-radius: 0;
  border-top-color: transparent;
  border-right-color: transparent;
  height: 20px;
  animation: none;
  transform: rotateZ(-45deg);
}

.login input {
  display: block;
  float:left;
  padding: 15px 10px;
  margin-left:0px;
  margin-bottom: 10px;
  width: 100%;
  border: 1px solid #ddd;
  transition: border-width 0.2s ease;
  border-radius: 25px;
  color: #ccc;
}

.login input + i.fa {
  color: #fff;
  font-size: 1em;
  position: absolute;
  margin-top: -47px;
  opacity: 0;
  left: 0;
  transition: all 0.1s ease-in;
}

.login input:focus {
  outline: none;
  color: #444;
  border-color: #2196F3;
  border-left-width: 35px;
}

.login input:focus + i.fa {
  opacity: 1;
  left: 30px;
  transition: all 0.25s ease-out;
}

.login a {
  font-size: 0.8em;
  color: #7cbaec;
  text-decoration: none;
}

.login a:hover {
  text-decoration: underline;
}

.login .title {
  text-align: center;
  color:  #f2f2f2;
  font-size: 1.4em;
  font-weight: bold;
  margin: 10px 0 30px 0;
  border-bottom: 1px solid #c3c2c2;
  padding-bottom: 20px;
}

.login button {
  width: 60%;
  height: 16%;
  padding: 10px 10px;
  background: rgb(177 188 197);
  color: #fff;
  font-size:18px;
  display: block;
  border: none;
  margin: 20px 80px 10px;
  position: absolute;
  left: 0;
  bottom: 0;
  max-height: 60px;
  border: 0px solid rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  transform: rotateZ(0deg);
  transition: all 0.1s ease-out;
  border-bottom-width: 7px;
}

.login button .spinner {
  display: block;
  width: 40px;
  height: 40px;
  position: absolute;
  border: 4px solid #ffffff;
  border-top-color: rgba(255, 255, 255, 0.3);
  border-radius: 100%;
  left: 50%;
  top: 0;
  opacity: 0;
  margin-left: -20px;
  margin-top: -20px;
  animation: spinner 0.6s infinite linear;
  transition: top 0.3s 0.3s ease, opacity 0.3s 0.3s ease, border-radius 0.3s ease;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);
}

.login:not(.loading) button:hover {
  box-shadow: 0px 1px 3px #2196F3;
}

.login:not(.loading) button:focus {
  border-bottom-width: 4px;
}

footer {
  display: block;
  padding-top: 50px;
  text-align: center;
  color: #ddd;
  font-weight: normal;
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.2);
  font-size: 0.8em;
}

footer a, footer a:link {
  color: #fff;
  text-decoration: none;
}

#signForm{
  position: absolute;
  left: 780px;
  top: 150px;
  background-color: #80bdff;
  width: 400px;
  height: 600px;
  z-index: 9999;
}

.signAni-enter-active {transition: all 1s ease;}
.signAni-leave-active{transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
.signAni-enter,.signAni-leave-to{transform: translateX(300px);opacity: 0;}

body {
  /*font: 18px Arial, sans-serif;*/
  background: #000;
  color: #fff;
  margin: 0;
}

.wrapper{
  width:100%;
  height:900px;
  margin-left: auto ;
  margin-right: auto ;
  overflow:hidden;
  position:absolute;
  z-index:1;
}

.scene {
  padding: 0;
  position:fixed;
  top: 1px;
  left: 0px;
}
/*================================================================
Starry Sky
Trick created by Andrey https://www.script-tutorials.com/night-sky-with-twinkling-stars/
================================================================*/
@keyframes move-twink-back {
  from {background-position:0 0;}
  to {background-position:-10000px 5000px;}
}

@-webkit-keyframes move-twink-back {
  from {background-position:0 0;}
  to {background-position:-10000px 5000px;}
}

@-moz-keyframes move-twink-back {
  from {background-position:0 0;}
  to {background-position:-10000px 5000px;}
}

@-ms-keyframes move-twink-back {
  from {background-position:0 0;}
  to {background-position:-10000px 5000px;}
}

.stars, .twinkling {
  position:absolute;
  top:0%;
  left:0;
  right:0;
  bottom:0;
  width:100%;
  height:100%;
  display:block;
}

.stars {
  background:#000 url(https://www.land-of-web.com/wp-content/uploads/2016/08/stars.png) repeat top center;
  z-index:0;
}

.twinkling {
  background:transparent url(https://www.land-of-web.com/wp-content/uploads/2016/08/twinkling.png) repeat top center;
  z-index:1;
  -moz-animation:move-twink-back 200s linear infinite;
  -ms-animation:move-twink-back 200s linear infinite;
  -o-animation:move-twink-back 200s linear infinite;
  -webkit-animation:move-twink-back 200s linear infinite;
  animation:move-twink-back 200s linear infinite;
}

/*================================================================
Animation - Move Up and Move Down Letters
================================================================*/
/*================================================================
Move Up
================================================================*/

/*================================================================
PARALLAX
================================================================*/
ul#scene {
  list-style-type:none;
}

.layer {
  display: block;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  position: absolute;
}

li.layer a {
  color:white;
  text-decoration:none;
  text-shadow: 3px 3px 3px #ccc;
  width: 410px;
  text-align: center;
  /*display: block;*/
}
li.layer:nth-child(1) {} /*1 item*/

/*-----Logotype----------------*/
li.layer:nth-child(2) a{
  font-size:3.5vw;
  color:white;
  text-shadow: 2px 2px 2px #ccc;
  padding:7px;
  /*border:2px solid white;*/
  border-radius:5px;
  /*box-shadow:2px 2px 2px #ccc;*/
  position: absolute;
  top:20vh;
  left:40vw;
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  -ms-transition: all 1s ease;
  transition: all 1s ease;
}

li.layer:nth-child(2) a:hover{
  font-size:4.0vw;
}

#formTitle{
  position: absolute;
  width: 400px;
  height: 100px;
  /*background-color: yellow;*/
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  font-weight: bolder;
}
#signForm{
  background-color: rgb(44,57,64);
  border-radius: 8px;
  box-shadow: 0 1px 6px rgba(0,0,0,.3);
}

#titleSpan{
  position: absolute;
  width: 360px;
  height: 2px;
  background-color: white;
  left: 20px;
  bottom: 20px;
}

input:focus{
  outline: none;
}
#username{
  display: block;
  position: absolute;
  /*height: 100px;*/
  width: 93%;
  background-color: rgb(44,57,64);
  top: 100px;
  height: 80px;
  left: 7%;
  border: none;
  /*border: none;*/
}
#passWord{
  display: block;
  position: absolute;
  /*height: 100px;*/
  width: 93%;
  top: 182px;
  border: none;
  height: 80px;
  left: 7%;
  background-color: rgb(44,57,64);
}
#phoneNumber{
  display: block;
  position: absolute;
  /*height: 100px;*/
  width: 93%;
  top: 262px;
  border: none;
  left: 7%;
  height: 80px;
  background-color: rgb(44,57,64);
}
#sexy{
  display: block;
  position: absolute;
  /*height: 100px;*/
  width: 93%;
  border: none;
  top: 400px;
  text-align: center;
}

#border1{
  position: absolute;
  height: 2px;
  width: 360px;
  background-color: white;
  opacity: 50%;
  top: 180px;
  left: 20px;
}
#border2{
  position: absolute;
  height: 2px;
  width: 360px;
  background-color: white;
  opacity: 50%;
  top: 260px;
  left: 20px;
}
#border3{
  position: absolute;
  height: 2px;
  width: 360px;
  background-color: white;
  opacity: 50%;
  top: 342px;
  left: 20px;
}
#btns{
  position: absolute;
  top: 500px;
  left: 60px;
}
#btn1{
  height:40px;
  width: 140px;
  background-color: #5CAB7D;
  border: none;
}
#btn1:hover{
  background-color: #6dc793;
}
#btn2{
  height:40px;
  width: 140px;
  background-color: #df405a;
  border: none;
}
#btn2:hover{
  background-color: #f0435f;
}
.el-button{
  color: #0c5460 !important;
}
#backBtn{
  position: absolute;
  right: 20px;
  top: 10px;
  z-index: 9999;
}
#chooseUserTypeContainer{
  position: absolute;
  z-index: 9999;
  top: 60%;
  left: 48%;
  width: 200px;
  height: 30px;
  /*background-color: skyblue;*/
}
.radioInRegister{
  color: white !important;
}
</style>
