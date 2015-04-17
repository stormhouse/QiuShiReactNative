'use strict';

var React = require('react-native');

var MainListCell = require('./MainListCell');
var CommentList = require('./CommentList');

var {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  Component
} = React;


var styles = StyleSheet.create({

});

class DetailView extends Component {

  render() {
    var property = this.props.property;


    return (
      <ScrollView>
        <View>
          <MainListCell
            onSelect={() => this.onSelect()}
    				// showImg={this.state.showImg}
    				data={property}
            />
          <View>
            <CommentList
              // showImg={this.state.showImg}
              data={property}
              />
          </View>
        </View>
      </ScrollView>
    );
  }

  onSelect() {}
}

module.exports = DetailView;
