import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	ListView,
	Text,
	Image,
	TouchableWithoutFeedback,
	ImageBackground,
	RefreshControl,
} from 'react-native'
import BaseContainer from '../../BaseContainer'
import ImageModal from '../../components/ImageModal'

const ImageItem = ({ url, images, rowID, t }) => {
	// let gif = url.endsWith('.gif'), newUrl = url;
	// if (gif) newUrl = url.replace('mw690','small')
	// 	.replace('mw1024','small')
	// 	.replace('mw1200','small');

	return (
		<TouchableWithoutFeedback onPress={() => {t.setState({modalUri: url, modalHide: false})}}>
			<View style={{padding: 10, borderRadius: 5, backgroundColor: '#FFF'}}>
				<Image
					style={{
						flex: 1,
						height: 200,
						justifyContent: 'center',
						alignItems: 'center'
					}}
					resizeMethod='scale'
					source={{uri: url}}
				/>
			</View>
		</TouchableWithoutFeedback>
	)
}


export default class ImageIndex extends BaseContainer {
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		this.state = {
			imageDS: ds,
			images: [],
			isRefreshing: false,
			currentPage: 1,
			modalUri: '',
			modalHide: true
		};
	}
	componentDidMount() {
		this.initData()
	}
	initData = (page = 1, callback) => {

		// let url = 'https://i.jandan.net/?oxwlxojflwblxbsapi=jandan.get_ooxx_comments&page=' + page;
		let url = 'https://image.baidu.com/channel/listjson?&rn=10&tag1=美女&tag2=全部&ftags=小清新&ie=utf8&pn=' + page;
		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				let tmp = page == 1 ? [] : this.state.images;
				res.data.forEach((ele, index, arr) => {
					tmp = tmp.concat(ele.image_url)
				});
				// res.comments.forEach((ele, index, arr) => {
				// 	tmp = tmp.concat(ele.pics)
				// });
				this.setState({
					imageDS: this.state.imageDS.cloneWithRows(tmp),
					images: tmp,
					currentPage: page
				}, callback && callback());
				this.HideLoadingSpinner();
			})
	};
	_onRefresh = () => {
		this.setState({isRefreshing: true});
		this.initData(1,this.setState({isRefreshing: false}))
	};

	_onLoadMore = () => {
		let page = ++this.state.currentPage;
		this.initData(page)
	};

	render() {
		return super.render(
			<View style={styles.container}>
				<ListView
					dataSource={this.state.imageDS}
					renderRow={(rowData, sectionID, rowID) =>
						<ImageItem url={rowData} images={this.state.images} key={rowID} rowID={rowID} t={this} />
					}
					refreshControl={
						<RefreshControl
							refreshing={ this.state.isRefreshing}
							onRefresh={() => this._onRefresh()}
							tintColor='rgba(204, 204, 204, 0.22)'
							title='拼命加载中'
							titleColor="black"
							colors={['#ccc']}
							progressBackgroundColor={"rgba(204, 204, 204, 0.22)"}
						/>
					}
					onEndReachedThreshold={250}
					onEndReached={() => this._onLoadMore()}
				/>
				<ImageModal
					uri={this.state.modalUri}
					hide={this.state.modalHide}
					onPress={()=>this.setState({modalHide: true})}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container : {
		flex:1,
		backgroundColor:'#FFF'
	}
});