/**
 * Created by HW with WebStorm on 2018/1/19 下午4:38.
 * Description :
 * Fun :
 */
import React, { Component } from 'react'
import {
	View,
	Image,
	Animated,
	Dimensions,
	TouchableWithoutFeedback,
	StyleSheet
} from 'react-native'

import {Theme, Toast, Overlay, Button, Label} from 'teaset';
import RNFetchBlob from 'react-native-fetch-blob';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default class ImageModal extends Component {

	constructor() {
		super();
		this.state = {
			modalSize: new Animated.Value(0.5),
			modalOpacity: new Animated.Value(1.0),
			modalWidth: new Animated.Value(deviceWidth),
			animatedDuration: 400,
			loading: true,
		}
	}

	componentDidUpdate() {
		this.props.hide ? this._hideModal() : this._showModal()
	}

	_showModal() {
		let animated = Animated.sequence([
			Animated.timing(this.state.modalWidth, {
				toValue: deviceWidth,
				duration: 1,
			}),
			Animated.parallel([
				Animated.timing(this.state.modalSize, {
					toValue: 1.0,
					duration: this.state.animatedDuration,
				}),
				Animated.timing(this.state.modalOpacity, {
					toValue: 1.0,
					duration: this.state.animatedDuration,
				})
			])
		]);
		animated.start()
	}

	_hideModal() {
		let animated = Animated.sequence([
			Animated.parallel([
				Animated.timing(this.state.modalSize, {
					toValue: .5,
					duration: this.state.animatedDuration,
				}),
				Animated.timing(this.state.modalOpacity, {
					toValue: 0.0,
					duration: this.state.animatedDuration,
				})
			]),
			Animated.timing(this.state.modalWidth, {
				toValue: 0,
				duration: 1,
			})
		]);
		animated.start()
	}


	// react-native-fetch-blob
	DownImageFB = () => {
		console.log(RNFetchBlob)
		let dirs = RNFetchBlob.fs.dirs;
		let RandomNum = (Math.random() * 100000000000000) | 0;
		let ImgUrl = this.props.uri;

		RNFetchBlob.config({
			fileCache : true,
			appendExt:'png',
			path : dirs.PictureDir + '/helloRN'+RandomNum,
			addAndroidDownloads : {
				notification : true,
				title : 'Great ! Download Success !  ',
				description : 'An image file.',
				mime : 'image/png',
				mediaScannable : true,
			}
		}).fetch('GET', ImgUrl).then((res) => {Toast.message('图片下载成功')}).catch((err) => {Toast.message('图片下载失败')});
	};

	saveImg = () => {
		let overlayView = (
			<Overlay.PopView
				style={{alignItems: 'center', justifyContent: 'center'}}
				overlayOpacity={0}
				ref={v => this.customPopView = v}
			>
				<View style={{
					backgroundColor: Theme.defaultColor,
					minWidth: 200, minHeight: 150,
					borderRadius: 10,
					justifyContent: 'center',
					alignItems: 'center'
				}}>
					<Label type='title' size='lg' text={'是否下载图片'} />
					<View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginTop:20}}>
						<Button title='取消' onPress={() => this.customPopView && this.customPopView.close()} />
						<Button title='下载图片' onPress={() =>  this.customPopView && this.customPopView.close() && this.DownImageFB() } style={{marginLeft:20}}/>
					</View>
				</View>
			</Overlay.PopView>
		);
		Overlay.show(overlayView);
	};

	render() {
		if (!this.props.uri) return <View/>;
		return (
			<Animated.View
				style={{
					backgroundColor: '#000',
					position: 'absolute',
					top:  -45,
					left: 0,
					bottom:0,
					right:0,
					width: this.state.modalWidth,
					height: deviceHeight,
					zIndex: 100000,
					opacity: this.state.modalOpacity,
					justifyContent: 'center',
					alignItems: 'center',
					transform: [
						{scale: this.state.modalSize},
					]
				}}
			>
				<TouchableWithoutFeedback onPress={this.props.onPress} onLongPress={() => this.saveImg()}>
            <View style={[styles.ImageModalView]}>
	            <Image
		            style={[styles.ImageModal]}
		            resizeMode='contain'
		            source={{uri: this.props.uri}}
		            onLoadStart={() => this.setState({loading: true})}
		            onLoad={() => this.setState({loading: false})}
	            />
            </View>



				</TouchableWithoutFeedback>

			</Animated.View>
		)
	}
}

const styles = StyleSheet.create({
	ImageModalView:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'black',
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height - 90,
	},
	ImageModal:{
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height - 90
	}

});
