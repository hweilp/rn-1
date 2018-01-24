import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	WebView,
	Dimensions
} from 'react-native'
import BaseContainer from '../../BaseContainer'
export default class Image extends BaseContainer {
	constructor() {
		super();
		this.state = {
			html: ''
		}
	}
	componentWillMount (){
		this._fetch()
	}
	_fetch() {
		fetch('https://news-at.zhihu.com/api/4/news/' + this.props.articleID)
			.then((response) => response.json())
			.then((responseJson) => {
				fetch('https://daily.zhihu.com/css/share.css?v=5956a')
					.then((responseCSS) => responseCSS.text())
					.then((css) => {
						let cssLink = '<style>'+css+'</style>',
							imgLink = '<div class="img-wrap"> '  +
								'<h1 class="headline-title">'+responseJson.title+'</h1>' +
								'<span class="img-source"></span>' +
								'<img src="'+responseJson.image+'" alt="">' +
								'<div class="img-mask"></div>' +
								'</div>';
						this.setState({
							html: cssLink + responseJson.body.replace(/<div class=\"img-place-holder\"><\/div>/, imgLink),
						});
						this.HideLoadingSpinner();
					})
			})
	}



	render() {
		return super.render(
			<View style={styles.container}>
				<WebView
					style={{flex:1,width:Dimensions.get('window').width,}}
					source={{ html: this.state.html, baseUrl: ''}}
					javaScriptEnabled={true}
					scalesPageToFit={true}
					bounces={false}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width:Dimensions.get('window').width,
	},
});