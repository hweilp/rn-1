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

export default class ContactsDetail extends BaseContainer {
	constructor(props){
		super(props);
		this.state = {

		};
	}
	componentDidMount = () => {
		this.HideLoadingSpinner();
	};

	render() {
		return super.render(
			<View style={styles.container}>
				<View>
				 <Text>ContactsDetail</Text>
				</View>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	base_container : {
		flex:1,
		backgroundColor:'#FFF'
	}
});