import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	Text,
	Image,
	Dimensions,
	TouchableOpacity,
	ScrollView,
	ImageBackground,
	Linking
} from 'react-native'
import BaseContainer from '../../BaseContainer'
import { Actions } from 'react-native-router-flux';
import {ListRow,Toast} from 'teaset';

export default class ContactsDetail extends BaseContainer {
	constructor(props){
		super(props);
		this.state = {};
		console.log(this.props.navigation.state.params.info)
	}
	componentDidMount = () => {
		this.SetNavBarParam('联系人详情',true);
		this.HideLoadingSpinner();
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

	sendEmail = (phoneNumber) => {
		if(!phoneNumber || phoneNumber === '') {
			Toast.message('邮件地址为空');
			return ;
		}
		let mailUrl = 'mailto:' + phoneNumber;
		Linking.canOpenURL(mailUrl).then(supported => {
			if (supported) {
				Linking.openURL(mailUrl);
			} else {
				Toast.message('无法打开该URL:' + mailUrl);
			}
		})
	};

	render() {
		// familyName 姓 givenName 名字 middleName 特徵
		let contactsInfo = this.props.navigation.state.params.info;
		let familyName = '', middleName = '', givenName = '';

		if(contactsInfo.familyName && contactsInfo.familyName !== ''){
			familyName = contactsInfo.familyName;
		}
		if(contactsInfo.middleName && contactsInfo.middleName !== ''){
			middleName = contactsInfo.middleName;
		}
		if(contactsInfo.givenName && contactsInfo.givenName !== ''){
			givenName = contactsInfo.givenName;
		}
		contactsInfo.constantsName = familyName + middleName + givenName;

		if(contactsInfo.phoneNumbers && contactsInfo.phoneNumbers.length > 0 &&  contactsInfo.phoneNumbers[0].number){
			contactsInfo.phoneNum = contactsInfo.phoneNumbers[0].number
		}else {
			contactsInfo.phoneNum = ''
		}

		if(contactsInfo.emailAddresses && contactsInfo.emailAddresses.length > 0 &&  contactsInfo.emailAddresses[0].email){
			contactsInfo.email = contactsInfo.emailAddresses[0].email
		}else {
			contactsInfo.email = ''
		}

		if(contactsInfo.postalAddresses && contactsInfo.postalAddresses.length > 0 &&  contactsInfo.postalAddresses[0].postCode){
			contactsInfo.postAddress = contactsInfo.postalAddresses[0].country + contactsInfo.postalAddresses[0].city + contactsInfo.postalAddresses[0].region + contactsInfo.postalAddresses[0].street
			contactsInfo.postCode = contactsInfo.postalAddresses[0].postCode
		}else {
			contactsInfo.postAddress = '';
			contactsInfo.postCode = ''
		}


		return super.render(
			<View style={styles.base_container}>

				<View style={styles.headImgView}>
					<ImageBackground style={styles.headImg} source={require('../../static/icon/girlHeadImg.jpeg')} resizeMode={'stretch'}/>
					<Text style={styles.headName}>{contactsInfo.constantsName}</Text>
 				</View>
				<ScrollView>
					<View style={styles.contactsInfo}>

						<View style={styles.contactsInfoList}>
							<View style={styles.detailsInfo}>
								<Text style={styles.phoneTitle}>Mobile</Text>
								<View style={styles.lines}/>
								<Text style={styles.phoneNum}>电话号码 : { contactsInfo.phoneNum}</Text>
							</View>
							<View style={styles.constantsIconView}>

								<TouchableOpacity onPress={() => this.callPhone(contactsInfo.phoneNum)}>
									<View style={styles.constantsIconViews}>
										<Image source={require('../../static/icon/tel.png')} resizeMode='contain' style={styles.constantsIcon}/>
									</View>
								</TouchableOpacity>

								<TouchableOpacity onPress={() => this.sendMessage(contactsInfo.phoneNum)}>
									<View style={styles.constantsIconViews}>
										<Image source={require('../../static/icon/message05.png')} resizeMode='contain' style={styles.constantsIcon}/>
									</View>
								</TouchableOpacity>

							</View>
						</View>

						<View style={styles.contactsInfoList}>
							<View style={styles.detailsInfo}>
								<Text style={styles.phoneTitle}>Email</Text>
								<View style={styles.lines}/>
								<Text style={styles.phoneNum}>邮件地址 : { contactsInfo.email}</Text>
							</View>
							<View style={styles.constantsIconView}>

								<TouchableOpacity onPress={() => this.sendEmail(contactsInfo.email)}>
									<View style={styles.constantsIconViews}>
										<Image source={require('../../static/icon/email.png')} resizeMode='contain' style={styles.constantsIcon}/>
									</View>
								</TouchableOpacity>

							</View>
						</View>

						<View style={styles.contactsInfoList}>
							<View style={styles.detailsInfo}>
								<Text style={styles.phoneTitle}>Address</Text>
								<View style={styles.lines}/>
								<Text style={styles.phoneNum}>地址 : { contactsInfo.postAddress}</Text>
							</View>
						</View>
						<View style={styles.contactsInfoList}>
							<View style={styles.detailsInfo}>
								<Text style={styles.phoneTitle}>PostCode</Text>
								<View style={styles.lines}/>
								<Text style={styles.phoneNum}>邮编 : { contactsInfo.postCode}</Text>
							</View>
						</View>
						<View style={styles.contactsInfoList}>
							<View style={styles.detailsInfo}>
								<Text style={styles.phoneTitle}>Company</Text>
								<View style={styles.lines}/>
								<Text style={styles.phoneNum}>公司 : { contactsInfo.company}</Text>
							</View>
						</View>

					</View>
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
	headImgView:{
		height:200,
		width:Dimensions.get('window').width,
		backgroundColor:'rgba(238, 103, 105, 0.13)',
		justifyContent:'center',
		alignItems:'center',
		marginBottom:20
	},
	headImgBorderR:{
		height:100,
		width:100,
		backgroundColor:'red',
		borderRadius:100,
		marginBottom:15,
		justifyContent:'center',
		alignItems:'center'
	},

	headImg:{
		height:100,
		width:100,
		overflow:'hidden',
		borderRadius:50,
		marginBottom:15,

	},
	headName:{
		fontSize:18,
		fontWeight:'600',
		color:'#5a5e6c'
	},

	contactsInfo:{

	},
	contactsInfoList:{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		paddingLeft:16,
		paddingRight:16,
		marginBottom:10
	},
	detailsInfo:{
		flex:1,
		justifyContent:'space-around'
	},
	phoneTitle:{
		textAlign:'left',
		fontSize:18,
		color:'#25292f'
	},
	phoneNum:{
		textAlign:'left',
		fontSize:16,
		color:'#5a5e6c'
	},

	constantsIconView:{
		height:60,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		marginLeft:5,
	},
	constantsIconViews:{
		width:30,
		height:30,
		borderRadius:15,
		marginRight:3,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'rgba(241,150,157,.8)'
	},
	constantsIcon:{
		height:20,
		width:20
	},
	lines:{
		height:1.5,
		backgroundColor:'#e6e6e6'
	}



});