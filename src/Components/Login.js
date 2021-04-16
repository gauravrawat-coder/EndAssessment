import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {sociallogin, logUser, setUserId} from '../Services/Authentication';
import {borderColor} from '../assets/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    };
  }
  componentDidMount() {
    this.logOut();
  }

  logOut = async (data) => {
    try {
      await AsyncStorage.removeItem('loginID');
      this.props.setUserId(null);
    } catch (e) {}
  };
  submitData = () => {
    const {username, password} = this.state;
    this.props.logUser({username, password}).then((data) => {
      if (data) {
        this.props.navigation.reset({
          index: 0,
          routes: [{name: 'Notes'}],
        });
      }
    });
  };
  changeText = (data, type) => {
    this.setState({[type]: data});
  };
  socialLogin = () => {
    this.props.sociallogin();
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.loginID !== prevProps.loginID &&
      this.props.loginID !== null
    ) {
      this.props.navigation.reset({
        index: 0,
        routes: [{name: 'Notes'}],
      });
    }
  }
  render() {
    return (
      <SafeAreaView style={style.container}>
        <View style={style.signInContainer}>
          <View style={style.mainContainer}>
            <TouchableOpacity>
              <Text style={style.currentTitle}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.reset({
                  index: 0,
                  routes: [{name: 'Register'}],
                })
              }>
              <Text style={style.otherTitle}>Sign up</Text>
            </TouchableOpacity>
          </View>
          <View style={style.imageContainer}>
            <Image source={require('../assets/Images/user.png')} />
          </View>
          <TextInput
            style={[style.space_adjust, style.textInput]}
            placeholder="Username or email address"
            value={this.state.username}
            placeholderTextColor="grey"
            onChangeText={(text) => this.changeText(text, 'username')}
          />

          <View style={style.passwordContainer}>
            <TextInput
              placeholder="Password"
              style={style.passwordInput}
              value={this.state.password}
              placeholderTextColor="grey"
              onChangeText={(text) => this.changeText(text, 'password')}
            />
            <TouchableOpacity style={style.passwordBtn}>
              <Image source={require('../assets/Images/openeye.png')} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={style.lifeSupport}>
            <Image source={require('../assets/Images/life.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.loginBtnContainer}
            onPress={this.submitData}>
            <Image source={require('../assets/Images/tick.png')} />

            <Text style={style.loginBtnText}>LOG IN</Text>
          </TouchableOpacity>
          <Text style={style.loginText}>Login with</Text>
          <View style={style.socialContainer}>
            <TouchableOpacity>
              <Image source={require('../assets/Images/google.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../assets/Images/github.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../assets/Images/twitter.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.socialLogin}>
              <Image source={require('../assets/Images/facebook.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  currentTitle: {
    fontSize: 30,
    fontWeight: '600',
  },
  otherTitle: {
    fontSize: 25,
    fontWeight: '400',
    color: 'grey',
  },

  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 30,
  },

  signInContainer: {
    marginHorizontal: 50,
    flex: 1,
  },
  imageContainer: {
    height: Platform.OS === 'ios' ? 300 : 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
    width: '100%',
  },
  space_adjust: {
    marginVertical: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 1,
  },
  passwordInput: {
    flex: 1,
  },
  passwordBtn: {
    alignSelf: 'center',
  },

  loginBtnContainer: {
    flexDirection: 'row',
    marginBottom: 40,
    marginTop: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 100,
    justifyContent: 'center',
    padding: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  loginBtnText: {
    fontSize: 20,
    marginLeft: 10,
    color: '#8b96d3',
    fontWeight: '800',
  },

  lifeSupport: {alignSelf: 'flex-end', marginVertical: 20},
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    flex: 1,
    marginBottom: 50,
  },
  loginText: {
    textAlign: 'center',
    marginVertical: 50,
    color: 'grey',
  },
  termsText: {alignSelf: 'center'},
});

const mapStateToProps = (state) => ({
  loginID: state.auth.loginID,
});

const mapDispatchToProps = (dispatch) => ({
  sociallogin: () => dispatch(sociallogin()),
  logUser: (data) => dispatch(logUser(data)),
  setUserId: (data) => dispatch(setUserId(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
