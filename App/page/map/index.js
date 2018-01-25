import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	Text,
	Platform,
	Dimensions,
	TouchableOpacity
} from 'react-native'
import BaseContainer from '../../BaseContainer'
import {ListRow} from 'teaset';
import BaiDuMap from '../../components/BaiduMap'

export default class MapIndex extends BaseContainer {
	constructor(props){
		super(props);
		this.state = {
			pause : true
		};
	}
	componentDidMount = () => {
		this.SetNavBarParam('地图');
		this.HideLoadingSpinner();
	};

	render() {
		return super.render(
			<View style={styles.base_container}>
				<View style={styles.container}>
					<BaiDuMap/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	base_container : {
		flex:1,
		backgroundColor:'#FFF'
	},
	container:{
		flex:1,
		backgroundColor:'#FFF'
	}

});