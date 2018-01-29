import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet,
	ToastAndroid,
	Platform,
	Dimensions
} from 'react-native'


import { Scene, Router, Tabs,	Stack, Modal } from 'react-native-router-flux';
import TabIcon from './components/tabbarIcon';


import Map from './page/map';
import Article from './page/home';
import ArticleContent from './page/home/webView';
import ImageList from './page/image';
import Music from './page/video';
import Contacts from './page/contacts';
import ContactsDetail from './page/contacts/ContactsDetail';
import ImagePicker from './page/image/ImagePicker';
import File from './page/file';
import FileDetail from './page/file/FileDetail';

export default class Index extends Component {

	_backAndroidHandler() {
		if (Platform.OS === 'android') {
			if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
				return false
			}
			this.lastBackPressed = Date.now();
			ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
			return true
		}else {
			return true
		}
	}

	render() {
		return (
			<Router onExitApp={this._backAndroidHandler}>
				<Modal key="modal">
					<Stack
						key="stack"
						hideNavBar
		        tabBarStyle={styles.tabBarStyle}
					>
						<Tabs
							key="tabbar"
				      tabBarPosition="bottom"
				      icon={TabIcon}
				      swipeEnabled={false}
							hideNavBar
						>
							<Scene key="tab1" icon={TabIcon}  title={'知乎'} hideNavBar>
								<Scene key='Article'  title={'文章'} component={(info) => <Article {...this.props} {...info}/>}  />
								<Scene key='articleContent' title='文章内容' component={(info) => <ArticleContent {...this.props} {...info}/>}/>
							</Scene>

							<Scene
								key="ImageList"
								title={'靓图'}
								component={(info) => <ImageList {...this.props} {...info}/>}
								hideNavBar
							/>
							<Scene
								key="Music"
								title={'歌单'}
								component={(info) => <Music {...this.props} {...info}/>}
								hideNavBar
							/>
							<Scene
								key="Map"
								title={'地图'}
								component={(info) => <Map {...this.props} {...info}/>}
								hideNavBar
							/>
						</Tabs>
						<Scene
							key="Contacts"
							component={(info) => <Contacts {...this.props} {...info}/>}
							hideNavBar
						/>
						<Scene
							key="ContactsDetail"
							component={(info) => <ContactsDetail {...this.props} {...info}/>}
							hideNavBar
						/>
						<Scene
							key="ImagePicker"
							component={(info) => <ImagePicker {...this.props} {...info}/>}
							hideNavBar
						/>
						<Scene
							key="File"
							component={(info) => <File {...this.props} {...info}/>}
							hideNavBar
						/>
						<Scene
							key="FileDetail"
							component={(info) => <FileDetail {...this.props} {...info}/>}
							hideNavBar
						/>


					</Stack>
				</Modal>

			</Router>
		)
	}
}

const styles = StyleSheet.create({
	navigationBarStyle : {
		borderBottomWidth:1,
		borderColor:'#CCC',
		backgroundColor:'white',
		padding : 3,
		justifyContent:'center',
		height:Platform.OS === 'android' ? 45 : 30,
	},
	tabBarStyle:{
		backgroundColor:'white',
		borderTopWidth:1,
		borderColor:'#CCC',
		height: 45,
	},
	titleStyle:{
		fontSize:16,
		textAlign:'center',
		width:Dimensions.get('window').width - 40
	},
	titleStyle_back:{
		fontSize:16,
		textAlign:'center',
		width:Platform.OS === 'android' ? Dimensions.get('window').width - 40 - 100 :Dimensions.get('window').width - 40 - 60
	}
});



