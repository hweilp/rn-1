import React,{Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image,
	Dimensions
} from 'react-native';
const {height, width} = Dimensions.get('window');

import { Actions } from 'react-native-router-flux';

const NavBackComponent = () => {
	return (
		<TouchableOpacity onPress={() => Actions.pop()} activeOpacity={.5} >
			<View style={styles.navBtn}>
				<Image source={require('../static/icon/nav_back.png')} resizeMode={'contain'} style={styles.image}/>
			</View>
		</TouchableOpacity>
	)
};

export default class NavBar extends React.Component {
	constructor(props){
		super(props);
	}
	renderLeftComponent = () => {
		if(this.props.leftComponent && !this.props.back ){
			return this.props.leftComponent
		}else if(this.props.back){
			return <NavBackComponent/>
		}else {
			return null
		}
	};
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.navBtn}>
					{this.renderLeftComponent()}
				</View>

				<View style={styles.navTitle}>
					{this.props.title ? <Text style={styles.titles}>{this.props.title}</Text> : null }
				</View>

				<View style={styles.navBtn}>
					{this.props.rightComponent ? this.props.rightComponent : null }
				</View>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		position:'relative',
		height:45,
		width:width,
		flexDirection:'row',
		justifyContent:'space-around',
		alignItems:'center',
		backgroundColor:'#FFF',
		borderColor:'#CCC',
		borderBottomWidth:1,
		zIndex:999999
	},
	navBtn:{
		height:40,
		width:40,
		justifyContent:'center',
		alignItems:'center',
	},
	navTitle:{
		flex:1
	},
	image:{
		height:20,
		width:20,
	},
	titles:{
		fontSize:18,
		color:'#000',
		textAlign:'center',
	}

});

