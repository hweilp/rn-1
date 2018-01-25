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
	Image,
	Linking
} from 'react-native';
import BaseContainer from '../../BaseContainer';
import SlefSwiper from '../../components/Swiper';
import { Actions } from 'react-native-router-flux';
import {Drawer,ListRow,Toast} from 'teaset';

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
		this.SetNavBarParam('文章',false,this.renderLeft());
		fetch('https://news-at.zhihu.com/api/4/news/latest')
			.then((data) => {return data.json()})
			.then((res) => {
				this.setState({
					stories: this.state.stories.cloneWithRows(res.stories),
					SWiperList: res.top_stories
				});
				this.HideLoadingSpinner();
			});
	};

	renderLeft = () => {
		return (
			<TouchableOpacity onPress={() => this.ShowDrawerLeft()} >
				<Image source={require('../../static/icon/person.png')} resizeMode={'contain'} style={styles.image}/>
			</TouchableOpacity>
		)
	};

	ShowDrawerLeft = () => {
		this.ShowDrawerLeftMenu = Drawer.open(this.renderDrawerMenu(), 'left', 'none');
	};

	GoToContacts = () => {
		this.ShowDrawerLeftMenu.close();
		this.props.navigation.navigate('Contacts');
	};

	GoToWebView = (webUrl) => {
		let WebUrl = 'http://' + webUrl;
		Linking.canOpenURL(WebUrl).then(supported => {
			if (supported) {
				Linking.openURL(WebUrl);
			} else {
				Toast.message('无法打开该URL:' + WebUrl);
			}
		})
	};

	renderDrawerMenu = () => {
		return (
			<View style={{width : Dimensions.get('window').width - 50}}>
				<View style={{backgroundColor:'#eaebec',height:45,justifyContent:'center',alignItems:'center'}}>
					<Text style={{fontSize:18,color:"#fb6868"}}>个人中心</Text>
				</View>

				<ListRow bottomSeparator='full'  title='获取手机通讯录' detail='' onPress={() => this.GoToContacts() } />
				<ListRow bottomSeparator='full'  title='进入百度' detail='' onPress={() => this.GoToWebView('www.baidu.com') } />
				<View style={{marginTop:10}}>
					<Text style={{textAlign:'center',color:"#3485ff",fontSize:16,}} onPress={() => this.ShowDrawerLeftMenu.close() }>返回</Text>
				</View>

			</View>

		)
	};





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
	image:{
		height:20,
		width:20,
	}
});