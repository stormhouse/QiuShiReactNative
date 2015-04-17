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
    backgroundColor: '#ededed'
  },
  cellWrapper: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 4,
    marginBottom: 4,
    // backgroundColor: '#222121'
  },
  cellContent: {
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#fcfcfc'
  },
  titleWrapper: {
    flex: 1,
		flexDirection: 'row',
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  username: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 18
  },
  content: {
    marginTop: 12,
    color: '#63625e',
    fontSize: 16
  },
  contentImage: {
    width: 200,
    height: 200,
    resizeMode: Image.resizeMode.cover
  },
  score: {
    marginTop: 16,
    flex: 1,
    flexDirection: 'row'
  },
  up: {
    color: '#969696'
  },
  comment: {
    color: '#969696'
  },
  icons: {
    flex: 1,
    flexDirection: 'row'
  },
  icon: {
    width: 50,
    height: 50
  },
	loadingBottom: {
		fontSize: 16,
		textAlign: 'center',
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 10,
		marginRight: 10,
		color: '#666E74',
		flex:1
	},
});


class MainListCell extends Component {

  constructor(props) {
    super(props);
  }
  componentDidMount(){

  }

  render() {
    var rowData = this.props.data

    if(rowData.loadingCell == true){
      return (

        <View style={styles.cellWrapperOuter}>
          <View style={styles.cellWrapper}>
            <Text style={styles.loadingBottom}>加载中...</Text>
          </View>
        </View>


          );
    }

    var username = '匿名';
    if(rowData.user && rowData.user.login){
      username = rowData.user.login
    }

    var iconUrl;
    if(rowData.user && rowData.user.id && rowData.user.icon){
      var iconUrl = 'http://pic.qiushibaike.com/system/avtnew/'+rowData.user.id.substring(0, 4)+'/'+rowData.user.id+'/thumb/'+rowData.user.icon

    }else{
      iconUrl = 'http://pic.qiushibaike.com/system/avtnew/1760/17607465/medium/nopic.jpg'
    }
    var userIcon = <Image style={styles.thumbnail}
      source={{
        uri: iconUrl
      }} />


    var up;
    if(rowData.votes && rowData.votes.up){
       up = <Text style={styles.up}>{rowData.votes.up} 好笑</Text>
    }
    var comment
    if(rowData.comments_count){
      comment = <Text style={styles.comment}> · {rowData.comments_count}评论</Text>
    }

    var image

    if(rowData.image) {
      var imageWidth = window.width-44
      var imageName = rowData.image.replace('app', '')

//http://pic.qiushibaike.com/system/pictures/10475/104759692/medium/104759692.jpg
      var imageUrl = 'http://pic.qiushibaike.com/system/pictures/' + imageName.substring(0, 5) + '/'+imageName.substring(0, 9)+ '/medium/'+rowData.image;
      image = <Image style={{flex: 1, height: 300, resizeMode: Image.resizeMode.contain, marginTop: 10}}
        source={{
          uri: imageUrl
        }} />
    }


    return (

      <View style={styles.cellWrapperOuter}>
        <View style={styles.cellWrapper}>

            <TouchableHighlight
              onPress={() => this.props.onSelect(rowData)}
              underlayColor={'#4c0f0f'}>
              <View style={styles.cellContent}>
                <View style={styles.titleWrapper}>
                  {{userIcon}}
                  <Text style={styles.username}>{username}</Text>
                </View>
                <Text style={styles.content}>{rowData.content}</Text>

                {{image}}

                <View style={styles.score}>
                  {{up}}
                  {{comment}}
                </View>
                <View style={styles.icons}>
                  <TouchableHighlight
                    onPress={() => this.toUp(rowData.id)}
                    underlayColor={'#d9d7d7'}>
                    <Image
                      style={styles.icon}
                      source={require('image!laugh')}
                    />
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={() => this.toDown(rowData.id)}
                    underlayColor={'#d9d7d7'}>
                    <Image
                      style={styles.icon}
                      source={require('image!sad')}
                    />
                  </TouchableHighlight>
                  <Image
                    style={styles.icon}
                    source={require('image!touch_comment')}
                  />
                </View>

              </View>
            </TouchableHighlight>

        </View>
      </View>


        );
  }

  toUp(id) {
    alert('up -> '+id)
  }

  toDown(id) {
    alert('down -> '+id)
  }
}




module.exports = MainListCell;
