import React, {Component} from 'react';
import {
	Text,
	Image,
	ImageBackground,
	View,
	StyleSheet,
	Dimensions,
	TouchableWithoutFeedback
} from 'react-native';
import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';

export default class SlefSWiper extends Component {
	constructor(props){
		super(props);
		this.state = {

		}
	}
	renderItem = () => {
		let views = [];
		this.props.dataList.forEach((ele, index, arr) => {
			views.push(
				<TouchableWithoutFeedback onPress={() => Actions.articleContent({articleID: ele.id})} key={index}>
					<View style={[styles.slide]} key={index} >
						<ImageBackground
							key={index}
							style={{flex: 1, height: 200, justifyContent: 'center', alignItems: 'center'}}
							source={{uri: ele.image}}
							resizeMode='cover'
						>
							<Text style={styles.slideTitle} key={index}>
								{ele.title}
							</Text>
						</ImageBackground>
					</View>
				</TouchableWithoutFeedback>
			)
		});
		return views;
	};
	render() {
		return (
			<Swiper
				style={styles.wrapper}
				autoplay={true}
				autoplayTimeout={3}
        showsPagination={false}
			>
				{this.renderItem()}
			</Swiper>
		)
	}
};
const styles = StyleSheet.create({
	wrapper : {
		height:180,
		width:Dimensions.get('window').width,
		justifyContent:'center',
		alignItems:'center',
		flex: 0
	},
	slide: {
		height: 180,
		backgroundColor: 'transparent',
	},
	slideTitle:{
		color: '#fff',
		fontSize: 18,
		marginTop: 100,
		marginLeft: 20,
		marginRight: 20,
		textAlign: 'center'
	},

});