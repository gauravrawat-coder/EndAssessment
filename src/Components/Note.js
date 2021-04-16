import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';
import {createNote, getData, findLatest} from '../Services/Note';
import {
  whiteModeBackgroundColor,
  darkModeBackgroundColor,
  darkModeTextColor,
} from '../assets/Color';
import RenderNotes from './RenderNotes';

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      data: '',
      error: '',
      modalVisible: false,
    };
  }

  componentDidMount() {
    this.props.getData().then((_) => this.props.findLatest());
  }
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
    if (!visible) {
      this.setState({title: '', data: ''});
    }
  };
  submitData = () => {
    const {title, data} = this.state;
    this.props.createNote({title, data}).then((_) => this.props.findLatest());
    this.setState({title: '', data: '', modalVisible: false});
  };

  fillData = (content, type) => {
    this.setState({[type]: content});
  };
  renderData = ({item}) => (
    <RenderNotes
      {...item}
      {...this.props.navigation}
      latest={this.props.latest}
    />
  );

  render() {
    if (this.props.mode) {
      return (
        <SafeAreaView style={style.whiteContainer}>
          <View style={style.container}>
            <View style={style.headingContainer}>
              <Text style={style.headingFirst}>My</Text>
              <Text style={style.headingEnd}>Notes</Text>
            </View>

            <FlatList
              data={this.props.data}
              renderItem={(item) => this.renderData(item)}
              keyExtractor={(content, index) => index.toString()}
              contentContainerStyle={style.listStyle}
            />

            <View style={style.footerMenu}>
              <TouchableOpacity
                onPress={() => this.props.navigation.openDrawer()}>
                <Image source={require('../assets/Images/menu.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                <Image source={require('../assets/Images/plus.png')} />
              </TouchableOpacity>
            </View>

            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}>
              <View style={style.modalContainer}>
                <Text style={style.heading}>Create Note</Text>
                <TextInput
                  value={this.state.title}
                  onChangeText={(text) => this.fillData(text, 'title')}
                  placeholder="Enter title"
                  placeholderTextColor="grey"
                  style={style.textInput}
                />
                <TextInput
                  value={this.state.data}
                  onChangeText={(text) => this.fillData(text, 'data')}
                  placeholder="Enter Data"
                  placeholderTextColor="grey"
                  style={style.textInput}
                />
                <View style={style.btns}>
                  <TouchableOpacity
                    onPress={this.submitData}
                    style={style.btnContainer}>
                    <Text style={style.btnText}>Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={style.btnContainer}
                    onPress={() =>
                      this.setModalVisible(!this.state.modalVisible)
                    }>
                    <Text style={style.btnText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={style.darkContainer}>
          <View style={style.container}>
            <View style={style.headingContainer}>
              <Text style={style.headingFirst}>My</Text>
              <Text style={style.headingEnd}>Notes</Text>
            </View>

            <FlatList
              data={this.props.data}
              renderItem={(item) => this.renderData(item)}
              keyExtractor={(content, index) => index.toString()}
              contentContainerStyle={style.listStyle}
            />

            <View style={style.footerMenu}>
              <TouchableOpacity
                onPress={() => this.props.navigation.openDrawer()}>
                <Image source={require('../assets/Images/dark_menu.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                <Image source={require('../assets/Images/plus.png')} />
              </TouchableOpacity>
            </View>

            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}>
              <View style={style.darkModalContainer}>
                <Text style={style.darkHeading}>Create Note</Text>
                <TextInput
                  value={this.state.title}
                  onChangeText={(text) => this.fillData(text, 'title')}
                  placeholder="Enter title"
                  style={style.DarktextInput}
                  placeholderTextColor="white"
                />
                <TextInput
                  value={this.state.data}
                  onChangeText={(text) => this.fillData(text, 'data')}
                  placeholder="Enter Data"
                  style={style.DarktextInput}
                  placeholderTextColor="white"
                />
                <View style={style.btns}>
                  <TouchableOpacity
                    onPress={this.submitData}
                    style={style.btnContainer}>
                    <Text style={style.btnText}>Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={style.btnContainer}
                    onPress={() =>
                      this.setModalVisible(!this.state.modalVisible)
                    }>
                    <Text style={style.btnText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </SafeAreaView>
      );
    }
  }
}

const style = StyleSheet.create({
  whiteContainer: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: darkModeBackgroundColor,
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '85%',
    alignSelf: 'center',
  },
  headingContainer: {
    flexDirection: 'row',
    marginTop: 40,
  },
  headingFirst: {fontSize: 50, color: '#e83b2d', fontWeight: '600'},
  headingEnd: {
    color: '#3e3f76',
    fontSize: 50,
    fontWeight: '600',
    paddingLeft: 5,
  },
  listStyle: {marginTop: 50},
  heading: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 50,
  },
  darkHeading: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 50,
    color: darkModeTextColor,
  },

  footerMenu: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    zIndex: 999999,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteModeBackgroundColor,
  },
  darkModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkModeBackgroundColor,
  },

  DarktextInput: {
    width: '80%',
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    padding: 10,
    marginVertical: 10,
    color: darkModeTextColor,
  },
  textInput: {
    width: '80%',
    borderBottomColor: '#cfcfcf',
    borderBottomWidth: 2,
    padding: 10,
    marginVertical: 10,
  },
  btns: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between',
  },
  btnContainer: {
    marginTop: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
  },
});

const mapStateToProps = (state) => ({
  data: state.note.formatData,
  mode: state.note.mode,
  latest: state.note.latest,
});

const mapDispatchToProps = (dispatch) => ({
  createNote: (data) => dispatch(createNote(data)),
  getData: () => dispatch(getData()),
  findLatest: () => dispatch(findLatest()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Notes);
