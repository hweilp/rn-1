/**
 * Created by HW with WebStorm on 2018/1/19 下午4:39.
 * Description :
 * Fun :
 */
import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	ListView,
	Dimensions,
	TouchableOpacity,
	Text,
	Image
} from 'react-native';
import BaseContainer from '../../BaseContainer';
import SlefSwiper from '../../components/Swiper';
import { Actions } from 'react-native-router-flux';
const ListItem = ({ data }) => {
	return (
		<TouchableOpacity style={styles.listItem} onPress={() => Actions.articleContent({articleID: data.id})}>
			<View style={{flexDirection: 'row'}}>
				<Text style={styles.itemTitle} numberOfLines={2}>
					{data.title}
				</Text>
				<Image
					style={styles.itemImage}
					source={{uri: data.images[0]}}
				/>
			</View>
		</TouchableOpacity>
	)
};

export default class HomeIndex extends BaseContainer {
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			SWiperList : [],
			stories: ds,
		};
	}
	componentDidMount () {
		let self = this;
		fetch('https://news-at.zhihu.com/api/4/news/latest')
			.then((data) => {return data.json()})
			.then((res) => {
				self.setState({
					stories: this.state.stories.cloneWithRows(res.stories),
					SWiperList: res.top_stories
				});

				self.HideLoadingSpinner()
			})
	}

	render() {
		return super.render(
			<View style={styles.container}>
				<View style={[styles.center]}>
					<SlefSwiper dataList={this.state.SWiperList}/>
				</View>
				<ListView
					dataSource={this.state.stories}
					renderRow={(rowData, sectionID, rowID) => <ListItem data={rowData} key={rowID} />}
					renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => {
						return <View style={{borderWidth: .3, borderColor: '#ccc'}} key={rowID}/>
					}}
				/>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		flex:1,
		backgroundColor:'#FFF'
	},
	center:{
		height:180,
		justifyContent:"center",
		alignItems:'center'
	},
	listItem: {
		backgroundColor: 'white',
		width: Dimensions.get('window').width,
		padding: 10,
	},
	itemTitle: {
		flex: 1,
		lineHeight: 20,
		marginRight: 5
	},
	itemImage: {
		width: 60,
		height: 60
	},

});