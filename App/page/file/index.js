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
			_Text : '',
			isFileImage : require('../../static/icon/file.png'),
			isFolderImage : require('../../static/icon/folder.png'),
			curePath : [],
			cureFolderName :''
		};
	}
	componentDidMount() {
		this.SetNavBarParam('文件',true);
		this.readDir();
		this.HideLoadingSpinner();
	}


	readDir = (dir,dirName) => {
		let path = dir ? dir :  RNFS.DocumentDirectoryPath;
		let folderName = dirName ? dirName : '';

		let UnExistent = false;

		this.state.curePath.map((item,index) => {
			if(item.name !== folderName){
				 UnExistent = true;
			}else {
				UnExistent = false
			}
		});

		RNFS.readDir(path)
			.then((result) => {
				result.map((item,index) => {
					if(item.name.indexOf(".")>-1) item.isFiles = true;
					if(item.name.length > 10){
						item.names = item.name.substring(0,3) + '...' + item.name.substring(item.name.length - 5);
					} else {
						item.names = item.name
					}
				});

				let State = this.state;
				State.Files = result;
				if(dir && dir !== '' && UnExistent){
					State.curePath.push({path:dir,name:"/"+folderName});
				}else if(!dir && !folderName) {
					State.curePath.push({path:'',name:''});
				}else {}

				let FolderName = '';
				State.curePath.map((item,index) => {
					FolderName += item.name
				});
				State.cureFolderName = FolderName;

				this.setState(State);

			})
			.then((statResult) => {
				if (statResult[0].isFile()) {
					return RNFS.readFile(statResult[1], 'utf8');
				}
				this.setState({_Text:'暂无文件！'});
			})
			.then((contents) => {
				this.setState({
					...this.state,
					_Text: contents
				})
			})
			.catch((err) => {

			});
	};

	FileItemBtn = (item) => {
		if(item.isFiles){
			this.props.navigation.navigate('FileDetail',{path:item.path});
		}else {
			this.readDir(item.path,item.name);
		}
	};

	renderFileItem = () => {
		let FileItem = [];
		if(this.state.Files.length <= 0){
			return <View style={[{alignItems:'flex-start'}]}>
				<Text>{this.state._Text} </Text>
			</View>
		}
		this.state.Files.forEach((item,index) => {
			FileItem.push(<TouchableOpacity activeOpacity={.5} onPress={() => {this.FileItemBtn(item)} } key={index+item.size}>
				<View style={styles.ItemView} key={index+item.size}>
					<Image style={styles.ItemImage} source={item.isFiles ? this.state.isFileImage : this.state.isFolderImage} resizeMode={'contain'}/>
					<Text style={styles.ItemName}>{item.names}</Text>
				</View>
			</TouchableOpacity>)
		});
		return FileItem;
	};

	goBackUpperLevel = () => {
		let curePath = this.state.curePath;
		if(curePath.length <= 1) {
			Toast.message('已是最外层');
		}else {
			let State = this.state;
			State.curePath.pop(); // 去除最后一个
			this.setState(State);
			this.readDir(curePath[curePath.length - 1].path,curePath[curePath.length - 1].name);
		}
	};

	render() {
		return super.render(
			<View style={styles.container}>
				<TouchableOpacity onPress={() => this.goBackUpperLevel()}>
				<View style={{backgroundColor:'#f6f8fa',height:30,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingLeft:12}}>
						<Image source={require('../../static/icon/nav_back.png')} resizeMode={'contain'} style={{height:15,width:15}}/>
						<Text>返回上一级 {this.state.cureFolderName}</Text>
				</View>
				</TouchableOpacity>
				<ScrollView contentContainerStyle={styles.containerSView}>
					{this.renderFileItem()}
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
	containerSView:{
		marginTop:10,
		minHeight:50,
		justifyContent:'space-around',
		alignItems:'center',
		flexDirection:'row',
		flexWrap:'wrap'
	},

	ItemView:{
		marginTop:5,
		justifyContent:'center',
		alignItems:'center',
		width:(Dimensions.get('window').width - 40) / 3
	},
	ItemImage:{
		width:(Dimensions.get('window').width - 40) / 3 - 10,
		height:50
	},
	ItemName:{
		fontSize:14,
		color:'#262626',
		overflow:'hidden'
	}

});