import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	Text,
	Image,
	ScrollView,
	Dimensions,
	TouchableOpacity
} from 'react-native'
import BaseContainer from '../../BaseContainer';
import {AlbumView, Overlay,Theme,Label,Button} from 'teaset';
import Storage from '../../tool/Storage';


export default class MapIndex extends BaseContainer {
	constructor(props){
		super(props);
		this.state = {
			images :[],
			thumbs:[],
		};
	}
	componentDidMount = () => {
		this.get();

		this.SetNavBarParam('相册图片',true,null,<TouchableOpacity onPress={() => this.removeAllImage()}>
			<Text style={{fontSize:16}}>清除</Text>
		</TouchableOpacity>);

		this.HideLoadingSpinner();
	};

	get = () => {
		Storage.load({
			key: 'picker',
			id:'2222',
			autoSync: true,
		}).then(res => {
			res.thumbs.push({uri:this.props.navigation.state.params.uri});
			this.setState({thumbs:res.thumbs,images:res.thumbs});
		}).catch(err => {
			let State = this.state;
			State.thumbs.push({uri:this.props.navigation.state.params.uri});
			State.images.push({uri:this.props.navigation.state.params.uri});
			this.setState(State);
			this.save();
		});
	};

	save = () => {
		Storage.save({
			key: 'picker',
			id:'2222',
			data:{
				thumbs:this.state.thumbs
			},
			expires: 1000 * 3600 * 24 * 10
		});
	};

	remove = () => {
		Storage.remove({
			key: 'picker',
			id: '2222'
		});
		this.setState({thumbs : []})
	};

	removeAllImage = () => {
		let overlayView = (
			<Overlay.PopView
				style={{alignItems: 'center', justifyContent: 'center'}}
				overlayOpacity={.6}
				ref={v => this.customPopView = v}
			>
				<View style={{
					backgroundColor: Theme.defaultColor,
					minWidth: 200, minHeight: 150,
					borderRadius: 10,
					justifyContent: 'center',
					alignItems: 'center'
				}}>
					<Label type='title' size='lg' text={'是否清除图片'} />
					<View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginTop:20}}>
						<Button title='取消' onPress={() => this.customPopView && this.customPopView.close()} />
						<Button title='确定' onPress={() =>  this.customPopView && this.customPopView.close() && this.remove() } style={{marginLeft:20}}/>
					</View>
				</View>
			</Overlay.PopView>
		);
		Overlay.show(overlayView);
	};

	onImagePress(index) {
		let pressView = this.refs['it' + index];
		pressView.measure((x, y, width, height, pageX, pageY) => {
			let overlayView = (
				<Overlay.PopView
					style={{}}
					containerStyle={{flex: 1}}
					overlayOpacity={1}
					type='custom'
					customBounds={{x: pageX, y: pageY, width, height}}
					ref={v => this.fullImageView = v}
				>
					<AlbumView
						style={{flex: 1}}
						control={true}
						images={this.state.images}
						thumbs={this.state.thumbs}
						defaultIndex={index}
						onPress={() => this.fullImageView && this.fullImageView.close()}
					/>
				</Overlay.PopView>
			);
			Overlay.show(overlayView);
		});

	}

	render() {
		return super.render(
			<View style={styles.base_container}>
				<ScrollView>
					<View style={styles.container}>
						{this.state.thumbs.map((item, index) => (
							<View style={{width: (Dimensions.get('window').width - 20 - 2) / 3, height: 100, padding: 2}} key={index}>
								<TouchableOpacity style={{flex: 1}} ref={'it' + index} onPress={() => this.onImagePress(index)}>
									<Image style={{width: null, height: null, flex: 1}} source={item} resizeMode='cover' />
								</TouchableOpacity>
							</View>
						))}
					</View>
				</ScrollView>
			</View>
		);
	}


}

const styles = StyleSheet.create({
	base_container : {
		flex:1,
		backgroundColor:'#FFF',
	},
	container:{
		flex:1,
		padding: 10,
		flexDirection:'row',
		flexWrap:'wrap',
		alignItems:'flex-start',
		justifyContent:'flex-start'
	}
});