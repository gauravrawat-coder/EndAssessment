import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {whiteModeTextColor, darkModeTextColor} from '../assets/Color';
import {connect} from 'react-redux';
function RenderNotes({title, count, mode, navigate, latest}) {
  if (mode) {
    return (
      <TouchableOpacity
        style={style.container}
        onPress={() => navigate('SingleNote', {title: title})}>
        <Text style={[style.text, latest === title ? style.highlight : null]}>
          {title}
        </Text>

        <View style={latest === title ? style.highlightNumberContainer : null}>
          <Text
            style={[
              style.number,
              latest === title ? style.highlightNumber : null,
            ]}>
            {count}
          </Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => navigate('SingleNote', {title: title})}
        style={style.container}>
        <Text
          style={[
            style.darkText,
            latest === title ? style.darkhighlight : null,
          ]}>
          {title}
        </Text>
        <View style={latest === title ? style.highlightNumberContainer : null}>
          <Text
            style={[
              style.darkNumber,
              latest === title ? style.darkhighlightNumber : null,
            ]}>
            {count}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 32,
    fontWeight: '800',
    color: whiteModeTextColor,
  },
  number: {
    fontSize: 32,
    fontWeight: '800',
    color: whiteModeTextColor,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  highlight: {
    color: 'red',
  },
  highlightNumber: {
    color: 'red',
  },
  highlightNumberContainer: {
    backgroundColor: '#fad6d3',
    borderRadius: 1000,
  },

  darkText: {
    fontSize: 32,
    fontWeight: '800',
    color: darkModeTextColor,
  },
  darkNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: darkModeTextColor,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },

  darkhighlight: {
    color: 'red',
  },
  darkhighlightNumber: {
    color: 'red',
  },
  darkhighlightNumberContainer: {
    backgroundColor: '#fad6d3',
    borderRadius: 1000,
  },
});

const mapStateToProps = (state) => ({
  data: state.note.formatData,
  mode: state.note.mode,
});

export default connect(mapStateToProps, null)(RenderNotes);
