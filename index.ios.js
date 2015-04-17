/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native')
var TabBar = require('./TabBar')
var MainList = require('./MainList')

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var QiuShiReactNative = React.createClass({
  render: function() {
    return (
      // <MainList />


    <React.NavigatorIOS
      style={styles.container}
        initialRoute={{
          title: 'Qiu~~~',
          component: MainList,
        }}/>
      );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('QiuShiReactNative', () => QiuShiReactNative);
