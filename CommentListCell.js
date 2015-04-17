'use strict';

var React = require('react-native');

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
  cellWrapperOuter: {
    backgroundColor: '#f5f5f5'
  },
  cellWrapper: {
    borderTopColor: '#ededed',
    borderTopWidth: 1,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 4,
    marginBottom: 4,
    padding: 12,
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: '#222121'
  },
  cellContent: {
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#f5f5f5',
  },
  titleWrapper: {
    flex: 1,
		flexDirection: 'row',
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    fontSize: 16,
    color: '#3d3d42',
    marginLeft: 10
  },
  content: {
    marginTop: 6,
    marginLeft: 10,
    color: '#63625e',
    fontSize: 14
  },
});


class CommentListCell extends Component {

  constructor(props) {
    super(props);
  }
  componentDidMount(){

  }

  render() {
    var rowData = this.props.data
    var username = '匿名';
    if(rowData && rowData.login){
      username = rowData.login
    }

    var iconUrl;
    if(rowData.uid && rowData.avatar_file_name != 'nopic.jpg'){
      iconUrl = 'http://pic.qiushibaike.com/system/avtnew/'+(rowData.uid+'').substring(0, 4)+'/'+rowData.uid+'/thumb/'+rowData.avatar_file_name;
      // iconUrl = 'http://pic.qiushibaike.com/system/avtnew/1760/17607465/medium/nopic.jpg'

    }else{
      iconUrl = 'http://static.qiushibaike.com/images/thumb/missing.png'
    }

    if(rowData.avatar_file_name == 'avatar_file_name'){
      iconUrl = 'http://static.qiushibaike.com/images/thumb/missing.png'
    }
    var userIcon = <Image style={styles.thumbnail}
      source={{
        uri: iconUrl
      }} />



    return (

      <View style={styles.cellWrapperOuter}>
        <View style={styles.cellWrapper}>

          {{userIcon}}
          <View>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.content}>{rowData.content}</Text>
          </View>

        </View>
      </View>


        );
  }

}




module.exports = CommentListCell;
