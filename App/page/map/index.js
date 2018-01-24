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
import { Actions } from 'react-native-router-flux';
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
		this.HideLoadingSpinner();
	};

	render() {
		return super.render(
			<View style={styles.base_container}>
				<View style={styles.container}>
					<ListRow bottomSeparator='full'  title='获取手机通讯录' detail='' onPress={() => this.props.navigation.navigate('Contacts') } />
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