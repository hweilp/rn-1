/**
 * Created by HW with WebStorm on 2018/1/19 下午4:38.
 * Description :
 * Fun :
 */
import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	Text,
	Dimensions,
	ScrollView,
	Linking,
	Image,
	TouchableOpacity
} from 'react-native'
import BaseContainer from '../../BaseContainer'

import {Theme, Toast, Overlay, Button, Label} from 'teaset';
import Contacts from 'react-native-contacts'


export default class MapIndex extends BaseContainer {
	constructor(props){
		super(props);
		this.state = {
			contactsList : []
		};
	}
	componentWillMount(){
		this.SetNavBarParam('手机通讯录',true)
	}
	componentDidMount = () => {
		this.getContacts()
	};

	callPhone = (phoneNumber) => {
		if(!phoneNumber || phoneNumber === '') {
			Toast.message('号码为空');
			return ;
		}
		let Telurl  = 'tel:' + phoneNumber;
	  Linking.canOpenURL(Telurl).then(supported => {
		  if (supported) {
			  Linking.openURL(Telurl);
		  } else {
			  Toast.message('无法打开该URL:' + Telurl);
		  }
	  })
	};

	sendMessage = (phoneNumber) => {
		if(!phoneNumber || phoneNumber === '') {
			Toast.message('号码为空');
			return ;
		}
		let messUrl = 'smsto:' + phoneNumber;
		Linking.canOpenURL(messUrl).then(supported => {
			if (supported) {
				Linking.openURL(messUrl);
			} else {
				Toast.message('无法打开该URL:' + messUrl);
			}
		})

	};

	showPop(type, modal, text, phoneNumber) {
		let overlayView = (
			<Overlay.PopView
				style={{alignItems: 'center', justifyContent: 'center'}}
				overlayOpacity={.7}
				ref={v => this.customPopView = v}
			>
				<View style={{backgroundColor: Theme.defaultColor, minWidth: 260, minHeight: 180, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
					<Label type='title' size={'lg'} text={text} />
					<View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginTop:20}}>
										<Button title='拨打电话' onPress={() => this.customPopView && this.customPopView.close() && this.callPhone(phoneNumber) } />
										<Button title='发送信息' onPress={() =>  this.customPopView && this.customPopView.close() && this.sendMessage(phoneNumber) } style={{marginLeft:20}}/>
					</View>
				</View>
			</Overlay.PopView>
		);
		Overlay.show(overlayView);
	}

	pressBtn = (phoneNumber) => {
		this.showPop('zoomIn', true, '拨打电话/发送信息？',phoneNumber);
	};

	renderContactsItem = () => {
		let Arr = [];
		let contactsList = this.state.contactsList;

		if(contactsList.length <= 0) return <View
			style={[styles.constantsView,{backgroundColor:"rgba(191, 191, 191, 1)",
				justifyContent:'center',width:Dimensions.get('window').width}]}>
			<Image source={require('../../static/gif/loading.gif')} style={styles.constantsIcon}/>
			<Text style={[styles.constantsName,{textAlign:'center'}]}>正在获取联系人，请稍后...</Text>
		</View>;

		// for (let i = 0 ;i < contactsList.length;i++){
		for (let i = 0 ;i < 50;i++){
			let constantsName = '',constantsPhone = '',familyName = '', middleName = '', givenName = '';

			if(contactsList[i].familyName && contactsList[i].familyName !== ''){
				familyName = contactsList[i].familyName;
			}
			if(contactsList[i].middleName && contactsList[i].middleName !== ''){
				middleName = contactsList[i].middleName;
			}
			if(contactsList[i].givenName && contactsList[i].givenName !== ''){
				givenName = contactsList[i].givenName;
			}
			constantsName = familyName + middleName + givenName;

			if(contactsList[i].phoneNumbers && contactsList[i].phoneNumbers.length > 0 &&  contactsList[i].phoneNumbers[0].number){
				constantsPhone = contactsList[i].phoneNumbers[0].number
			}

			Arr.push(
				<TouchableOpacity onPress={() => this.pressBtn(constantsPhone)} key={contactsList[i].recordID+i}>
					<View  style={styles.constantsViewContainer} key={contactsList[i].recordID+i}>

						<View style={[styles.constantsView,]} >
							<Text key={contactsList[i].recordID+i} style={styles.constantsName}>{constantsName}</Text>
							<Text key={Number(contactsList[i].recordID)-i} style={styles.constantsNum}>{constantsPhone}</Text>
						</View>
						<View style={[styles.constantsView,{justifyContent:'center',width:80}]} >
							<Image source={require('../../static/icon/message05.png')} resizeMode='contain' style={styles.constantsIcon}/>
							<Image source={require('../../static/icon/tel.png')} resizeMode='contain' style={styles.constantsIcon}/>
							<Image source={require('../../static/icon/right.png')} resizeMode='contain' style={styles.constantsIcon}/>
						</View>
					</View>
				</TouchableOpacity>

			)
		}
		return Arr;
	};

	getContacts = () => {
		Contacts.getAll( (err, contacts) => {
			let State = this.state;
			State.contactsList = contacts;
			this.setState(State);
		});
		this.HideLoadingSpinner();
	};
	render() {
		return super.render(
			<View style={styles.container}>
				<ScrollView contentContainerStyle={[styles.container]}>
					{this.renderContactsItem()}
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	base_container : {
		flex:1,
		backgroundColor:'#FFF'
	},
	constantsViewContainer:{
		flexDirection:'row',
		justifyContent:'space-around',
		height:45,
		width:Dimensions.get('window').width,
		backgroundColor:'rgba(246, 252, 255,.8)',
		paddingLeft:14,
		paddingRight:14,
		borderBottomWidth:1,
		borderColor:'#ddd'
	},

	constantsView:{
		flexDirection:'row',
		justifyContent:'flex-start',
		alignItems:'center',
		height:40,
		width:Dimensions.get('window').width - 80,
	},
	constantsName:{
		minWidth:100,
		height:40,
		fontSize:14,
		lineHeight:40,
		textAlign:'left',
		overflow:'hidden'
	},
	constantsNum : {
		height:40,
		maxWidth:140,
		fontSize:14,
		lineHeight:40,
		textAlign:'center',
		overflow:'hidden',
	},
	constantsIcon:{
		height:18,
		width:18,
		marginLeft:3,
		marginRight:3
	}

});