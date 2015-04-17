'use strict';

var React = require('react-native');
var {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} = React;

var TabBar = React.createClass({
  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.'
  },

  getInitialState: function() {
    var hotUrl = "http://m2.qiushibaike.com/article/list/suggest?count=20&page=1"
    fetch(hotUrl)
    .then((response) => response.text())
    .then((responseText) => {
      console.log(responseText);
    })
    .catch((error) => {
      console.warn(error);
    });
    return {
      selectedTab: 'hotTab',
      notifCount: 0,
      presses: 0,
    };
  },

  _handleResponse(response){
    console.log("======");
    console.log(response);
  },
  _renderContent: function(color: string, pageText: string) {

    alert(pageText)

    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{this.state.presses} re-renders of the More tab</Text>
      </View>
    );
  },

  render: function() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Hot"
          selected={this.state.selectedTab === 'hotTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'hotTab',
            });
          }}>
          {this._renderContent('#414A8C', 'hot')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="history"
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          {this._renderContent('#783E33', 'Red Tab')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="more"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
              presses: this.state.presses + 1
            });
          }}>
          {this._renderContent('#21551C', 'Green Tab')}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },

});

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

module.exports = TabBar;
