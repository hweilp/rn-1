import React from 'react';
import {
	Image
} from 'react-native';

const TabIcon = (props) => {
	let normalIcon;
	let selectedIcon;
	switch (props.navigation.state.key) {
		case 'tab1':
			selectedIcon = require('../static/icon/zhifu_blue.png');
			normalIcon = require('../static/icon/zhifu_grey.png');
			break;
		case 'ImageList':
			selectedIcon = require('../static/icon/image_blue.png');
			normalIcon = require('../static/icon/image_grey.png');
			break;
		case 'Music':
			selectedIcon = require('../static/icon/music_blue.png');
			normalIcon = require('../static/icon/music_grey.png');
			break;
		case 'Map':
			selectedIcon = require('../static/icon/map_blue.png');
			normalIcon = require('../static/icon/map_grey.png');
			break;
		default:
			selectedIcon = require('../static/icon/zhifu_blue.png');
			normalIcon = require('../static/icon/zhifu_grey.png');
			break;
	}
	return (<Image style={{width:18,height:18,}} resizeMode='contain' source={props.focused ? selectedIcon : normalIcon}/>)
};

export default TabIcon;