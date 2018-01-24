/**
 * Created by HW with WebStorm on 2018/1/23 下午4:51.
 * Description :
 * Fun :
 */

import React, {Component} from 'react';

import {
	MapView,
	MapTypes,
	Geolocation
} from 'react-native-baidu-map';

import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Dimensions,
	ToastAndroid
} from 'react-native';

export default class BaiduMapDemo extends Component {

	constructor() {
		super();

		this.state = {
			trafficEnabled: false,
			baiduHeatMapEnabled: false,
			mayType: MapTypes.NORMAL,
			zoom: 18,
			position:{
				country:"",
				province:"",
				city:'',
				district:'',
				street:'',
				streetNumber:'',
				name:'东莞.恒星大厦'
			},
			onClickPosition:{}
		};
	}
	componentWillMount(){
		this.getCurPosition();
	};

	componentDidMount() {
		// this.getCurPosition()
	}
	getCurPosition = () => {
		Geolocation.getCurrentPosition()
			.then(data => {
				this.setState({
					...this.state,
					markers:[
						{
							latitude: data.latitude,
							longitude: data.longitude,
							title:'当前位置',
						}
					],
					center:{
						latitude: data.latitude,
						longitude: data.longitude,
					},
					position:{
						country:data.country,
						province:data.province,
						city:data.city,
						district:data.district,
						street:data.street,
						streetNumber:data.streetNumber,
						name:data.buildingName? data.buildingName : "当前位置",
						address:data.address,
					}
				});
			})
			.catch(e =>{
				ToastAndroid.show('出错了', ToastAndroid.LONG);
			})
	};

	UpdatePosition = (latitude, longitude) => {
		// 获取地址
		Geolocation.reverseGeoCode(latitude, longitude)
			.then(data => {
				this.setState({
					position:{
						...this.state.position,
						address:data.address
					},
					onClickPosition:data
				})
			})
			.catch(e =>{
				ToastAndroid.show('出错了', ToastAndroid.LONG);
			})
	};

	// 点击地图 获取建筑物
	onMapPoiClick = (e) => {
		this.UpdatePosition(e.latitude,e.longitude);
		this.setState({
			...this.state,
			center:{
				longitude: e.longitude,
				latitude: e.latitude,
			},
			markers:[
				{
					longitude: e.longitude,
					latitude: e.latitude,
					title: e.name
				}
			],
			position:{
				...this.state.position,
				name:e.name,
			}
		})
	};

	render() {
		return (
			<View style={styles.container}>
				<MapView
					trafficEnabled={this.state.trafficEnabled}
					zoom={this.state.zoom}
					mapType={this.state.mapType}
					center={this.state.center}
					markers={this.state.markers}
					style={styles.map}
					onMapPoiClick={(e) => {  this.onMapPoiClick(e)}}
				/>

				<View style={styles.row}>
					<View style={styles.rowItem} >
						<TouchableOpacity onPress={() => {this.setState({mapType: MapTypes.NORMAL})}} activeOpacity={.6}>
							<Text style={styles.btnTitleStyle}>标准</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.rowItem} >
						<TouchableOpacity onPress={() => {this.setState({mapType: MapTypes.SATELLITE})}} activeOpacity={.6}>
							<Text style={styles.btnTitleStyle}>卫星</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.rowItem} >
						<TouchableOpacity onPress={() => {this.getCurPosition()}} activeOpacity={.6}>
							<Text style={styles.btnTitleStyle}>定位</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.rowItem} >
						<TouchableOpacity onPress={() => {this.setState({trafficEnabled: !this.state.trafficEnabled})}} activeOpacity={.6}>
							<Text style={styles.btnTitleStyle}>交通</Text>
						</TouchableOpacity>
					</View>


				</View>
				<View style={{marginTop:10,width: Dimensions.get('window').width,height:40,justifyContent:'center'}}>
					<Text style={{fontSize:14,textAlign:'center'}}>当前地址 ： {this.state.position.address}</Text>
					<Text style={{fontSize:14,textAlign:'center'}}>建筑物 ： {this.state.position.name}</Text>
				</View>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		height: 40,
		marginTop:10
	},
	rowItem:{
		height:35,
		width:40,
		marginLeft:3,
		marginRight:3,
		borderRadius:4,
		backgroundColor:'#4394ff',
		justifyContent:'center',
		alignItems:'center'
	},
	btnTitleStyle:{
		textAlign:'center',
		fontSize:16,
		color:'#FFF',
	},
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	map: {
		width: Dimensions.get('window').width,
		height: 300,
	},
	btn:{

	}
});