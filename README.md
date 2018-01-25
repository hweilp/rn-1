# React-Native入门指南

## theNewYear
### 一、前言

	代码，仅供参考; 有经验的开发人员，从看js Reactjs React-Native 到写demo总共2天时间就够.

### 二、环境配置
	(1)需要一台Mac(OSX),这个是前提，建议还是入手一本啦。(ios 需要xcode 运行)
	(2)在Mac上安装Xcode,建议Xcode 6.3以上版本
	(3)安装node.js:https://nodejs.org/download/
	   淘宝镜像 npm config set registry https://registry.npm.taobao.org --global
               npm config set disturl https://npm.taobao.org/dist --global
    (4)安装yarn  npm install yarn -g  Yarn是Facebook提供的替代npm的工具，可以加速node模块的下载。
	(5)建议安装watchman，终端命令：brew install watchman
	(6)安装flow：brew install flow
	(7)安装 Android Studio 。。。。。。
### 三、Hello, React-Native
创建一个React-Native的项目，因此可以按照下面的步骤：
打开终端

	(1)cd 到需要建立项目的目录下 在该目录下运行终端
	(2)创建一个空项目 ：执行命令 react-native init 项目名
	(3)成功 进入到 项目名 路径下
	(4)打开xcode Simulator 运行 react-native run-ios  即可在iOS模拟器上 运行项目
	(5)安装 安卓的模拟器 Genymotion , react-native run-android 即可在android模拟器上 运行项目
	(6)通过修改App.js 修改项目

### 四、使用的三方组件

使用的三方组件,我们启动npm命令行，在项目的根目录使用如下命令安装模块。

	$ yarn add react-native-swiper --save
	$ yarn add react-native-baidu-map --save
	$ yarn add react-native-contacts --save
	$ yarn add react-native-fetch-blob --save
	$ yarn add react-native-video --save
	$ yarn add react-native-router-flux --save
	$ yarn add react-native-splash-screen --save
	$ yarn add teaset --save

### 实战内容

	引导页，轮播图，路由，tab栏，webView， 百度地图API，手机通讯录 拨打电话 发送信息，图片下载，teaset UI 等

### 效果图预览

 ![image](https://github.com/hwhtml/rn-1/blob/master/screenShot/6680454D-6F06-4816-8506-E611F4BB5699.png)


 ![image](https://github.com/hwhtml/rn-1/blob/master/screenShot/Screenshot_2018-01-24-17-32-17.png)


 ![image](https://github.com/hwhtml/rn-1/blob/master/screenShot/Screenshot_2018-01-24-17-32-48.png)


 ![image](https://github.com/hwhtml/rn-1/blob/master/screenShot/Screenshot_2018-01-24-17-32-53.png)

### 项目暂时Android 运行 （ios待续)




