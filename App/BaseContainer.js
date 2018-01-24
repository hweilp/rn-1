import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	ActivityIndicator
} from 'react-native'

export default class BaseContainer extends Component {
	constructor(props){
		super(props);
		this.state = {
			hideLoadingSpinner : false
		};
	}

	HideLoadingSpinner = () => {
		this.setState( { ...this.state,hideLoadingSpinner: true })

	};
	ShowLoadingSpinner = () => {
		if (this.state.hideLoadingSpinner) return null;
		return <View style={styles.loading_container}>
				<ActivityIndicator
					animating={true}
					color='#ccc'
					size='large'
				/>
		</View>
	};

	render(children) {
		return (
			<View style={styles.base_container}>
				{this.ShowLoadingSpinner()}
				{children}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	base_container : {
		flex:1,
		backgroundColor:'#FFF'
	},
	loading_container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'#FFF',
		position:'absolute',
		top:0,
		right:0,
		left:0,
		bottom:0,
		zIndex:2
	}

});