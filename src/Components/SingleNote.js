import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {connect} from 'react-redux';
import {filteredNote, deleteNote} from '../Services/Note';
import {darkModeTextColor, darkModeBackgroundColor} from '../assets/Color';
import RenderSingleNotes from './RenderSingleNotes';

class SingleNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      data: '',
      error: '',
      modalVisible: false,
      scrollY: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.props.filteredNote(this.props.route.params);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.route.params !== this.props.route.params) {
      this.props.filteredNote(this.props.route.params);
    }
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };
  submitData = () => {
    const {title, data} = this.state;
    this.props.createNote({title, data});
  };

  fillData = (content, type) => {
    this.setState({[type]: content});
  };
  renderData = ({item, index}) => {
    const scale = this.state.scrollY.interpolate({
      inputRange: [-1, 0, 200 * index, 200 * (index + 2)],
      outputRange: [1, 1, 1, 0],
    });
    return (
      <RenderSingleNotes
        {...item}
        scale={scale}
        deleteNote={this.props.deleteNote}
      />
    );
  };
  render() {
    if (this.props.mode) {
      return (
        <SafeAreaView style={style.container}>
          <TouchableOpacity
            style={style.goBack}
            onPress={() => this.props.navigation.goBack()}>
            <Image source={require('../assets/Images/back.png')} />
            <Text style={style.goBackText}>My Notes</Text>
          </TouchableOpacity>

          <View style={style.headingContainer}>
            <View style={style.headingFirstContainer}>
              <Text style={style.headingFirst}>
                {this.props.route.params.title}
              </Text>
            </View>
            <TouchableOpacity style={style.headingEndContainer}>
              <Text style={style.headingEnd}>{this.props.data.length}</Text>
            </TouchableOpacity>
          </View>

          <Animated.FlatList
            data={this.props.data}
            renderItem={(item) => this.renderData(item)}
            keyExtractor={(content, index) => content.id.toString()}
            contentContainerStyle={style.listStyle}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
              {useNativeDriver: true},
            )}
          />
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={style.darkContainer}>
          <TouchableOpacity
            style={style.goBack}
            onPress={() => this.props.navigation.goBack()}>
            <Image source={require('../assets/Images/dark_arrow.png')} />
            <Text style={style.goBackDarkText}>My Notes</Text>
          </TouchableOpacity>

          <View style={style.headingContainer}>
            <View style={style.headingFirstContainer}>
              <Text style={style.DarkheadingFirst}>
                {this.props.route.params.title}
              </Text>
            </View>
            <TouchableOpacity style={style.headingEndContainer}>
              <Text style={style.headingEnd}>{this.props.data.length}</Text>
            </TouchableOpacity>
          </View>

          <Animated.FlatList
            data={this.props.data}
            renderItem={(item) => this.renderData(item)}
            keyExtractor={(content, index) => content.id.toString()}
            contentContainerStyle={style.listStyle}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
              {useNativeDriver: true},
            )}
          />
        </SafeAreaView>
      );
    }
  }
}

const style = StyleSheet.create({
  goBack: {
    flexDirection: 'row',
  },
  goBackText: {
    fontWeight: '400',
    fontSize: 15,
    color: '#3e3f76',
  },
  container: {
    flex: 1,
  },
  headingContainer: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  headingFirstContainer: {width: 200},
  headingFirst: {fontSize: 40, color: '#e83b2d', fontWeight: '700'},
  DarkheadingFirst: {fontSize: 40, color: darkModeTextColor, fontWeight: '700'},
  headingEnd: {
    color: '#e83b2d',
    fontSize: 30,
    fontWeight: '600',
    alignSelf: 'center',
  },
  headingEndContainer: {
    backgroundColor: '#E6B0AA',
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listStyle: {paddingVertical: 40},
  heading: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 50,
  },

  darkContainer: {
    flex: 1,
    backgroundColor: darkModeBackgroundColor,
  },
  goBackDarkText: {
    fontWeight: '400',
    fontSize: 15,
    color: darkModeTextColor,
  },
});

const mapStateToProps = (state) => ({
  data: state.note.filterData,
  mode: state.note.mode,
});

const mapDispatchToProps = (dispatch) => ({
  filteredNote: (data) => dispatch(filteredNote(data)),
  deleteNote: (id, title) => dispatch(deleteNote(id, title)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SingleNote);
