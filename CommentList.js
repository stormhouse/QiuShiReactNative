'use strict';

var React = require('react-native');

var CommentListCell = require('./CommentListCell');
var MainListCell = require('./MainListCell');


var {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  ListView,
  Text,
  Component
} = React;

var styles = StyleSheet.create({
  container: {
		backgroundColor: '#ededed',
		flex:1,
		flexDirection: 'row',
	},
  loadingText: {
    fontSize: 25,
		textAlign: 'center',
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 10,
		marginRight: 10,
		color: '#666E74',
		flex:1
  }
});


class CommentList extends Component {
  onLocationPressed() {
    console.log('--------------')
  }

  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      loaded: false,
      dataSource: dataSource
    };
  }
  componentDidMount(){
    var commentUrl = 'http://www.qiushibaike.com/commentpage/'+this.props.data.id+'?page=1'
    console.log(commentUrl)
    fetch(commentUrl)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
					dataSource: this.state.dataSource.cloneWithRows(responseData.comments.items),
					loaded: true,
					// currentPage: this.state.currentPage+1,
					// pageLoaded: true
				});
    })
    .catch((error) => {
      alert('error')
      console.warn(error);
    });
  }


  // renderLoading() {
  //   return (
	// 		<View style={styles.container}>
	// 			<Text style={styles.loadingText}>
	// 				{'Loading...'}
	// 			</Text>
	// 		</View>
	// 	);
  // }

  renderForRow(rowData, sectionID, rowID){
    return (
      <CommentListCell data={rowData}/>
			// <MainListCell
      // onSelect={() => this.toDetail(rowData)}
			// 	// showImg={this.state.showImg}
			// 	data={rowData}
      //   />
      );
  }

  renderContent() {
    return (
      <MainListCell
        // onSelect={() => this.onSelect()}
        // showImg={this.state.showImg}
        data={this.props.data}
        />
    )
  }

  renderList() {
    return (
			<ListView
        renderHeader={this.renderContent.bind(this)}
				dataSource={this.state.dataSource}
				renderRow={this.renderForRow.bind(this)}
				// renderFooter={this.renderFooterLoading}
				// onEndReached={this.fetchData}
				// onEndReachedThreshold={20}
        />
		);
  }

  render() {
    return this.renderList()
  }
}


module.exports = CommentList;
