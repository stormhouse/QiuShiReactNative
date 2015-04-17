'use strict';

var React = require('react-native');
var CommentList = require('./CommentList');

var MainListCell = require('./MainListCell');

var hotUrl = "http://m2.qiushibaike.com/article/list/suggest?count=20&page="

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
		justifyContent: 'center',
		alignItems: 'center'
	},
  // loading: {
  //   backgroundColor:'#efefef',
	// 	padding: 20,
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// 	alignSelf: 'center'
  // },
  // loadingInfo: {
  //   fontSize: 14,
	// 	color: '#888888'
  // }
  loadingText: {
		fontSize: 25,
		textAlign: 'center',
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 10,
		marginRight: 10,
		color: '#666E74',
		flex:1
	},
});


class MainList extends Component {
  onLocationPressed() {
    console.log('--------------')
  }

  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      loaded: false,
      currentPage: 0,
      dataSource: dataSource,
      pageLoaded: true,
      data: []
    };
  }

  fetchData() {
    this.state.loaded = false
    this.state.pageLoaded = false
    var url = hotUrl + (this.state.currentPage+1)
    fetch(url)
    .then((response) => response.json())
    .then((responseData) => {

      var length = this.state.data.length

      if(length !== 0 && this.state.data[length-1].loadingCell == true) {
        this.state.data.shift()
      }

      var newData = this.state.data.concat(responseData.items)
      this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newData),
          loaded: true,
          currentPage: this.state.currentPage+1,
          data: newData
          // pageLoaded: true
        });
    })
    .catch((error) => {
      console.warn(error);
    });

  }

  componentDidMount(){
    this.fetchData()
  }


  renderLoading() {
    return (
			<View style={styles.container}>
				<Text style={styles.loadingText}>
					{'Loading...'}
				</Text>
			</View>
		);
  }

  renderForRow(rowData, sectionID, rowID){
    console.log('=======')
    console.log(rowData)
    return (
			<MainListCell
      onSelect={() => this.toDetail(rowData)}
				// showImg={this.state.showImg}
				data={rowData}
        />
      );
  }

  renderList() {
    return (
			<ListView
				dataSource={this.state.dataSource}
				renderRow={this.renderForRow.bind(this)}
				renderFooter={this.renderFooterLoading(this)}
				onEndReached={this.fetchData.bind(this)}
				onEndReachedThreshold={0}
				// style={Style.listView}
        />
		);
  }

  render() {
    if(this.state.loaded){
      return this.renderList()
    } else {
      return this.renderLoading()
    }
  }

  toDetail(data) {
    this.props.navigator.push({
      title: "Detail",
      component: CommentList,
      passProps: {data: data}
    });
  }

  renderFooterLoading() {
    if(this.state.currentPage == 0) return null

    var lastIndex = this.state.data.length-1
    if(this.state.data[lastIndex].loadingCell == true) {
      return null
    } else {
      var newData = this.state.data.concat({
        loadingCell: true
      })
      this.state.data = newData
      this.state.dataSource = this.state.dataSource.cloneWithRows(newData)
    }
    // if(this.state.pageLoaded){
		// 	return null;
		// }
		// return (
		// 	<View style={styles.loading}>
		// 		<Text style={styles.loadingInfo}>{'loading..f.'}</Text>
		// 	</View>
		// );
  }

}


module.exports = MainList;
