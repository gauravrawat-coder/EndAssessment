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
import {registerUser} from '../Services/Authentication';
import {borderColor} from '../assets/Color';
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      UserName: '',
      Password: '',
      RepeatPassword: '',
      error: '',
    };
  }
  submitData = () => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    const userRegex = /^\S{4,}$/;

    const {UserName, Password, RepeatPassword, Email} = this.state;
    const {navigation} = this.props;

    if (Password !== RepeatPassword) {
      return this.setState({error: 'Password are not same'});
    } else if (!emailRegex.test(Email)) {
      return this.setState({error: 'Please check your email'});
    } else if (!userRegex.test(UserName)) {
      return this.setState({
        error: 'Username length should be atleast 4 and no space',
      });
    } else if (!passRegex.test(Password)) {
      return this.setState({
        error:
          'Password should contain 6 Characters atleast, Uppercase , lowercase , special character and number',
      });
    }
    this.setState({error: ''});
    this.props.registerUser({Email, UserName, Password}).then((data) => {
      if (data) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Notes'}],
        });
      }
    });
  };
  fillData = (content, type) => {
    this.setState({[type]: content});
  };
  render() {
    const {Email, Password, RepeatPassword, UserName} = this.state;
    return (
      <SafeAreaView style={style.container}>
        <View style={style.signInContainer}>
          <View style={style.mainContainer}>
            <TouchableOpacity>
              <Text style={style.currentTitle}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.reset({
                  index: 0,
                  routes: [{name: 'Login'}],
                })
              }>
              <Text style={style.otherTitle}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={style.imageContainer}>
            <Image source={require('../assets/Images/camera.png')} />
          </View>
          <TextInput
            style={[style.space_adjust, style.textInput]}
            placeholder="Email Address"
            placeholderTextColor="grey"
            value={Email}
            onChangeText={(text) => this.fillData(text, 'Email')}
          />
          <TextInput
            style={[style.space_adjust, style.textInput]}
            placeholder="Username"
            placeholderTextColor="grey"
            value={UserName}
            onChangeText={(text) => this.fillData(text, 'UserName')}
          />
          <View style={[style.space_adjust, style.passwordContainer]}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="grey"
              style={style.passwordInput}
              value={Password}
              onChangeText={(text) => this.fillData(text, 'Password')}
            />
            <TouchableOpacity style={style.passwordBtn}>
              <Image source={require('../assets/Images/openeye.png')} />
            </TouchableOpacity>
          </View>
          <View style={[style.space_adjust, style.passwordContainer]}>
            <TextInput
              placeholder="Repeat Password"
              placeholderTextColor="grey"
              style={style.passwordInput}
              value={RepeatPassword}
              onChangeText={(text) => this.fillData(text, 'RepeatPassword')}
            />
            <TouchableOpacity style={style.passwordBtn}>
              <Image source={require('../assets/Images/openeye.png')} />
            </TouchableOpacity>
          </View>
          <Text style={style.errorCode}>{this.state.error}</Text>
          <TouchableOpacity
            style={style.loginBtnContainer}
            onPress={this.submitData}>
            <Image source={require('../assets/Images/tick.png')} />

            <Text style={style.loginBtnText}>SIGN UP</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.termsText}>
            <Text>Terms of Service</Text>
          </TouchableOpacity>
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
    height: Platform.OS === 'ios' ? 300 : 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
    width: '100%',
  },
  space_adjust: {
    marginVertical: Platform.OS === 'ios' ? 20 : 0,
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
    borderRadius: 100,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
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

  termsText: {alignSelf: 'center', color: '#cecece'},
  errorCode: {
    color: 'red',
  },
});

const mapStateToProps = (state) => ({
  data: state.auth.data,
});

const mapDispatchToProps = (dispatch) => ({
  registerUser: (data) => dispatch(registerUser(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);
