import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	Dimensions,
	ActivityIndicator
} from 'react-native'
import NavBar from './components/navBar'

export default class BaseContainer extends Component {
	constructor(props){
		super(props);
		this.state = {
			hideLoadingSpinner : false,
			NavBarParam:{
				title: '',
				leftComponent: null,
				rightComponent: null,
				back: false
			}
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
	SetNavBarParam = (title = '',back = false, leftComponent,rightComponent) => {
		this.setState({
			...this.state,
			NavBarParam:{
				title: title,
				leftComponent: leftComponent,
				rightComponent: rightComponent,
				back: back
			}
		});
	};

	render(children) {
		return (
			<View style={styles.base_container}>
				<NavBar {...this.state.NavBarParam}/>
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
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height - 90 ,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'#FFF',
	}

});