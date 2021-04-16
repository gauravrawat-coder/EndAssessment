import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {darkModeTextColor, darkModeBackgroundColor} from '../assets/Color';
import moment from 'moment';
function RenderSingleNotes({
  createdDate,
  data,
  id,
  title,
  scale,
  mode,
  deleteNote,
}) {
  if (mode) {
    return (
      <Animated.View style={[{transform: [{scale}]}, style.container]}>
        <View style={style.topHead}>
          <Text style={style.date}>{moment(createdDate).calendar()} </Text>

          <TouchableOpacity
            style={style.deleteContainer}
            onPress={() => deleteNote(id, title)}>
            <Image source={require('../assets/Images/delete.png')} />
          </TouchableOpacity>
        </View>

        <Text style={style.title}>{title}</Text>
        <Text style={style.description}>{data}</Text>
      </Animated.View>
    );
  } else {
    return (
      <Animated.View style={[{transform: [{scale}]}, style.darkcontainer]}>
        <View style={style.topHead}>
          <Text style={style.darkdate}>{moment(createdDate).calendar()} </Text>
          <TouchableOpacity style={style.deleteContainer}>
            <Image source={require('../assets/Images/delete.png')} />
          </TouchableOpacity>
        </View>
        <Text style={style.darktitle}>{title}</Text>
        <Text style={style.darkdescription}>{data}</Text>
      </Animated.View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30,
    width: '90%',
    alignSelf: 'center',
    height: 150,
    borderRadius: 10,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },

  darkcontainer: {
    flex: 1,
    marginVertical: 30,
    width: '90%',
    alignSelf: 'center',
    height: 150,
    borderRadius: 10,
    padding: 10,
    shadowColor: darkModeTextColor,
    shadowOpacity: 1,
    shadowRadius: 2,
    backgroundColor:
      Platform.OS === 'ios' ? darkModeBackgroundColor : '#2E2C2C',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },

  topHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  date: {
    color: '#eb5448',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#555686',
  },
  description: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '400',
    color: '#555686',
  },

  darkdate: {
    color: darkModeTextColor,
    fontWeight: '500',
  },
  darktitle: {
    fontSize: 20,
    fontWeight: '700',
    color: darkModeTextColor,
  },
  darkdescription: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '400',
    color: darkModeTextColor,
  },
  deleteContainer: {
    alignSelf: 'flex-end',
  },
});
const mapStateToProps = (state) => ({
  mode: state.note.mode,
});
export default connect(mapStateToProps, null)(RenderSingleNotes);
