import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	Dimensions,
	Image,
	TouchableWithoutFeedback,
	ImageBackground,
	RefreshControl,
} from 'react-native'
import BaseContainer from '../../BaseContainer';
import {Drawer,ListRow,Toast} from 'teaset';
import  RNFS from 'react-native-fs';


export default class FileIndex extends BaseContainer {
	constructor(props){
		super(props);
		this.state = {
			Files : [],
			Text:''
		};
	}
	componentDidMount() {
		this.SetNavBarParam('文件内容',true);
		this.readFile(this.props.path);
	}
	readFile = (Path) => {
		RNFS.readFile(Path,'utf8')
			.then( (contents) => {
				this.setState({Text:contents});
				this.HideLoadingSpinner();
			})
			.catch( (err) => {
				this.HideLoadingSpinner();
				Toast.message('无法读取文件')
			})
	};

	render() {
		return super.render(
			<View style={styles.container}>
				<ScrollView>
					<View style={styles.textStyleView}>
						<Text style={styles.textStyle}>
							{this.state.Text}
						</Text>
					</View>

				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		flex:1,
		backgroundColor:'#FFF'
	},
	textStyleView:{
		justifyContent:'flex-start',
		alignItems:'center',
		padding:10
	},

	textStyle :{
		fontSize:14,
		color:'#262626'
	}

});