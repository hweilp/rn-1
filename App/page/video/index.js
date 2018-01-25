/**
 * Created by HW with WebStorm on 2018/1/19 下午4:37.
 * Description :
 * Fun :
 */

import React, { Component } from 'react'
import {
	StyleSheet,
	Dimensions,
	Text,
	Image,
	View,
	Slider,
	TouchableOpacity,
	ScrollView,
	Animated,
	Easing,
} from 'react-native'
import Video from 'react-native-video'

import songList from '../../static/musicJson/list.json';
import songInfoList from '../../static/musicJson/infoJson.json';
import RNFetchBlob from 'react-native-fetch-blob';

import BaseContainer from '../../BaseContainer'

const {width,height} = Dimensions.get('window');
let lyrObj = [];   // 存放歌词
let myAnimate;
export default class Music extends BaseContainer {
	constructor(props) {
		super(props);
		this.spinValue = new Animated.Value(0);
		this.state = {
			songs: [],   //歌曲id数据源
			playModel:1,  // 播放模式  1:列表循环    2:随机    3:单曲循环
			btnModel:require('../../static/icon/list_turn.png'), //播放模式按钮背景图
			pic_small:'http://pic29.nipic.com/20130528/12386668_104351383000_2.jpg',    //小图
			pic_big:'http://img.taopic.com/uploads/allimg/120101/8879-120101203G137.jpg',      //大图
			file_duration:0,    //歌曲长度
			song_id:'',     //歌曲id
			title:'',       //歌曲名字
			author:'',      //歌曲作者
			file_link:'',   //歌曲播放链接
			songLyr:[],     //当前歌词
			sliderValue: 0,    //Slide的value
			pause:true,       //歌曲播放/暂停
			currentTime: 0.0,   //当前时间
			duration: 0.0,     //歌曲时间
			currentIndex:0,    //当前第几首
			isplayBtn:require('../../static/icon/stop.png'),  //播放/暂停按钮背景图
			imgRotate: new Animated.Value(0),
		};
		this.isGoing = false; //为真旋转
		this.myAnimate = Animated.timing(this.state.imgRotate, {
			toValue: 1,
			duration: 6000,
			easing: Easing.inOut(Easing.linear),
		});
	}
	imgMoving = () => {
		if (this.isGoing) {
			this.state.imgRotate.setValue(0);
			this.myAnimate.start(() => {
				this.imgMoving()
			})
		}
	};

	stop = () => {
		this.isGoing = !this.isGoing;
		if (this.isGoing) {
			this.myAnimate.start(() => {
				this.myAnimate = Animated.timing(this.state.imgRotate, {
					toValue: 1,
					duration: 6000,
					easing: Easing.inOut(Easing.linear),
				});
				this.imgMoving()
			})
		} else {
			this.state.imgRotate.stopAnimation((oneTimeRotate) => {
				//计算角度比例
				this.myAnimate = Animated.timing(this.state.imgRotate, {
					toValue: 1,
					duration: (1-oneTimeRotate) * 6000,
					easing: Easing.inOut(Easing.linear),
				});
			});
		}
	};
	//上一曲
	prevAction = (index) =>{
		this.recover();
		lyrObj = [];
		if(index == -1){
			index = this.state.songs.length - 1 // 如果是第一首就回到最后一首歌
		}
		this.setState({
			currentIndex:index  //更新数据
		});
		this.LoadSong(index)  //加载数据
	};
	//下一曲
	nextAction = (index) =>{
		this.recover();
		lyrObj = [];
		if(index == this.state.songs.length){
			index = 0 //如果是最后一首就回到第一首
		}
		this.setState({
			currentIndex:index,  //更新数据
		});
		this.LoadSong(index)   //加载数据
	};
	// 播放结束
	onSongEnd = () => {
		// playModel:1,  // 播放模式  1:列表循环    2:随机    3:单曲循环
		if(this.state.playModel == 3){
			this.nextAction(this.state.currentIndex)
		}else if(this.state.playModel == 2){
			let  last =  this.state.songs.length; //json 中共有几首歌
			let random = Math.floor(Math.random() * last);  //取 0~last之间的随机整数
			this.nextAction(random) //播放
		}else {
			this.refs.video.seek(0) //让video 重新播放
			_scrollView.scrollTo({x: 0,y:0,animated:false});
			// this.nextAction(this.state.currentIndex + 1)
		}
	};
	//播放器每隔250ms调用一次
	onProgress =(data) => {
		let val = parseInt(data.currentTime);
		this.setState({
			sliderValue: val,
			currentTime: data.currentTime
		});
		//如果当前歌曲播放完毕,需要开始下一首
		if(val == this.state.file_duration){
			if(this.state.playModel == 1){
				//列表 就播放下一首
				this.nextAction(this.state.currentIndex + 1)
			}else if(this.state.playModel == 2){
				let  last =  this.state.songs.length //json 中共有几首歌
				let random = Math.floor(Math.random() * last)  //取 0~last之间的随机整数
				this.nextAction(random) //播放
			}else{
				//单曲 就再次播放当前这首歌曲
				this.refs.video.seek(0) //让video 重新播放
				_scrollView.scrollTo({x: 0,y:0,animated:false});
			}
		}

	};
	//换歌时恢复进度条 和起始时间
	recover = () =>{
		this.setState({
			sliderValue:0,
			currentTime: 0.0
		})
	};
	//播放模式 接收传过来的当前播放模式 this.state.playModel
	playModel = (playModel) =>{
		playModel++;
		playModel = playModel == 4 ? 1 : playModel;
		//重新设置
		this.setState({
			playModel:playModel
		});
		//根据设置后的模式重新设置背景图片
		if(playModel == 1){
			this.setState({
				btnModel:require('../../static/icon/list_turn.png'),
			})
		}else if(playModel ==  2){
			this.setState({
				btnModel:require('../../static/icon/random.png'),
			})
		}else{
			this.setState({
				btnModel:require('../../static/icon/single_turn.png'),
			})
		}
	};
	//播放/暂停
	playAction =() => {
		this.stop();
		this.setState({pause : !this.state.pause});
		//判断按钮显示什么
		if(this.state.pause){
			this.setState({isplayBtn:require('../../static/icon/play.png')})
		}else {
			this.setState({isplayBtn:require('../../static/icon/stop.png')})
		}

	};

	//把秒数转换为时间类型
	formatTime(time) {
		// 71s -> 01:11
		let min = Math.floor(time / 60)
		let second = time - min * 60
		min = min >= 10 ? min : '0' + min
		second = second >= 10 ? second : '0' + second
		return min + ':' + second
	}
	// 歌词
	renderItem() {
		// 数组
		let itemAry = [];
		for (let i = 0; i < lyrObj.length; i++) {
			let item = lyrObj[i].txt;
			if (this.state.currentTime.toFixed(2) > lyrObj[i].total) {
				//正在唱的歌词
				itemAry.push(
					<View key={i} style={[styles.itemStyle,]}>
						<Text style={{ color: 'red' }}> {item} </Text>
					</View>
				);
				_scrollView.scrollTo({x: 0,y:(35 * i),animated:false});
			}
			else {
				//所有歌词
				itemAry.push(
					<View key={i} style={[styles.itemStyle,]}>
						<Text style={{ color: '#000' }}> {item} </Text>
					</View>
				)
			}
		}

		return itemAry;
	}
	// 播放器加载好时调用,其中有一些信息带过来
	onLoad = (data) => {
		this.setState({ duration: data.duration });
	};
	//旋转动画
	spin () {
		this.spinValue.setValue(0);
		myAnimate = Animated.timing(
			this.spinValue,
			{
				toValue: 1,
				duration: 4000,
				easing: Easing.linear
			}
		).start(() => this.spin())

	};

	LoadSong = (index) => {
		//加载歌曲
		let songinfo = songInfoList.song[index].songinfo;
		let bitrate = songInfoList.song[index].bitrate;
		let State = this.state;

		State.songs = songList.song_list;
		State.pic_small = songinfo.pic_small;
		State.pic_big = songinfo.pic_big;
		State.title = songinfo.title;
		State.author = songinfo.author;
		State.file_link = bitrate.file_link;
		State.file_duration = bitrate.file_duration;
		this.setState(Object.assign({}, { State }));

		//加载歌词
		let lry = songInfoList.lyr[index].lrcContent;
		let lryAry = lry.split('\n');   //按照换行符切数组
		lryAry.forEach(function (val, index) {
			let obj = {};   //用于存放时间
			val = val.replace(/(^\s*)|(\s*$)/g, '');   //正则,去除前后空格
			let indeofLastTime = val.indexOf(']');  // ]的下标
			let timeStr = val.substring(1, indeofLastTime); //把时间切出来 0:04.19
			let minSec = '';
			let timeMsIndex = timeStr.indexOf('.');  // .的下标
			if (timeMsIndex !== -1) {
				//存在毫秒 0:04.19
				minSec = timeStr.substring(1, val.indexOf('.')); // 0:04.
				obj.ms = parseInt(timeStr.substring(timeMsIndex + 1, indeofLastTime))  //毫秒值 19
			} else {
				//不存在毫秒 0:04
				minSec = timeStr
				obj.ms = 0
			}
			let curTime = minSec.split(':');  // [0,04]
			obj.min = parseInt(curTime[0]);   //分钟 0
			obj.sec = parseInt(curTime[1]);   //秒钟 04
			obj.txt = val.substring(indeofLastTime + 1, val.length); //歌词文本: 留下唇印的嘴
			obj.txt = obj.txt.replace(/(^\s*)|(\s*$)/g, '');
			obj.dis = false;
			obj.total = obj.min * 60 + obj.sec + obj.ms / 100 ;  //总时间
			if (obj.txt.length > 0) {
				lyrObj.push(obj)
			}
		});
		this.spin();  //   启动旋转
	};
	componentDidMount() {
		this.SetNavBarParam('歌单');
		this.HideLoadingSpinner();
		this.LoadSong(0);
	};

	render() {
		return super.render(
			<View style={styles.container}>
				{/*背景大图*/}
				<Image source={{uri:this.state.pic_big}} style={{flex:1}}/>
				{/*背景白色透明遮罩*/}
				<View style = {{position:'absolute',width: width,height:height,backgroundColor:'white',opacity:0.8}}/>

				<View style = {{position:'absolute',width: width}}>
					{/*胶片光盘*/}
					<Image source={require('../../static/icon/pan.png')} style={{width:220,height:220,alignSelf:'center'}}/>
					{/*旋转小图*/}
					<Animated.Image
						ref = 'myAnimate'
						style={{width:140,height:140,marginTop: -180,alignSelf:'center',borderRadius: 140*0.5,transform: [{rotate: this.state.imgRotate.interpolate({
							inputRange: [0, 1],
							outputRange: ['0deg', '360deg']
						})
						}]}}
						source={{uri: this.state.pic_small}}
					/>
					{/*播放器*/}
					<Video
					  source={{uri:this.state.file_link}}
						ref='video'
						volume={1.0}
						paused={this.state.pause} // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
						onProgress={(e) => this.onProgress(e)}
						onLoad={(e) => this.onLoad(e)}
						playInBackground={true}
						onEnd={() => this.onSongEnd()}
					/>

					{/*歌曲信息*/}
					<View style={styles.playingInfo}>
						{/*作者-歌名*/}
						<Text>{this.state.author} - {this.state.title}</Text>
						{/*时间*/}
						<Text>{this.formatTime(Math.floor(this.state.currentTime))} - {this.formatTime(Math.floor(this.state.duration))}</Text>
					</View>
					{/*播放模式*/}
					<View style = {{marginTop: 5,marginBottom:5,marginLeft: 20}}>
						<TouchableOpacity onPress={()=>this.playModel(this.state.playModel)}>
							<Image source={this.state.btnModel} style={{width:20,height:20}}/>
						</TouchableOpacity>
					</View>
					{/*进度条*/}
					<Slider
						ref='slider'
						style={{ marginLeft: 10, marginRight: 10}}
						value={this.state.sliderValue}
						maximumValue={this.state.file_duration}
						step={1}
						minimumTrackTintColor='#FFDB42'
						onValueChange={(value) => {
							this.setState({
								currentTime:value
							})
						}}
						onSlidingComplete={(value) => {
							this.refs.video.seek(value)
						}}
					/>
					{/*歌曲按钮*/}
					<View style = {{flexDirection:'row',justifyContent:'space-around'}}>
						<TouchableOpacity onPress={()=>this.prevAction(this.state.currentIndex - 1)}>
							<Image source={require('../../static/icon/p_song.png')} style={{width:30,height:30}}/>
						</TouchableOpacity>

						<TouchableOpacity onPress={()=>this.playAction()}>
							<Image source={this.state.isplayBtn} style={{width:30,height:30}}/>
						</TouchableOpacity>

						<TouchableOpacity onPress={()=>this.nextAction(this.state.currentIndex + 1)}>
							<Image source={require('../../static/icon/n_song.png')} style={{width:30,height:30}}/>
						</TouchableOpacity>
					</View>

					{/*歌词*/}
					<View style={{height:140,alignItems:'center'}}>

						<ScrollView
							contentContainerStyle={{position:'relative',paddingBottom:60,paddingTop:10}}
							ref={(scrollView) => { _scrollView = scrollView}}
						>
							{this.renderItem()}
						</ScrollView>
					</View>
				</View>

			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		flex: 1
	},
	playingControl: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 10,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 20
	},
	playingInfo: {
		flexDirection: 'row',
		alignItems:'stretch',
		justifyContent: 'space-between',
		paddingTop: 40,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor:'rgba(255,255,255,0.0)'
	},
	text: {
		color: "black",
		fontSize: 22
	},
	modal: {
		height: 300,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		paddingTop: 5,
		paddingBottom: 50
	},
	itemStyle: {
		height:35,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'rgba(255,255,255,0.0)',
	}
});