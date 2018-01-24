import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';

import Index from './App/index'

export default class App extends Component {
	componentDidMount () {
		SplashScreen.hide();
	}
	render() {
		return (<Index/>);
	}
}

