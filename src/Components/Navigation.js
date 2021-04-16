import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {setUserId} from '../Services/Authentication';
import {changeMode} from '../Services/Note';

import Register from './Register';
import Login from './Login';
import Note from './Note';
import SingleNote from './SingleNote';

const Drawer = createDrawerNavigator();

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {load: null};
  }
  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('loginID');
      if (value !== null) {
        this.props.setUserId(value);
        this.setState({load: true});
      } else {
        this.setState({load: false});
      }
    } catch (e) {
      // error reading value
    }
  };

  render() {
    if (this.state.load) {
      return (
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Notes"
            drawerContent={(props) => {
              const filteredProps = {
                ...props,
                state: {
                  ...props.state,

                  routes: props.state.routes.filter((route) => {
                    return (
                      route.name !== 'Login' &&
                      route.name !== 'Register' &&
                      route.name !== 'Notes' &&
                      route.name !== 'SingleNote'
                    );
                  }),
                },
              };
              return (
                <DrawerContentScrollView {...filteredProps}>
                  <DrawerItemList {...filteredProps} />
                  <DrawerItem
                    label="Toggle Mode"
                    onPress={() => this.props.changeMode(!this.props.mode)}
                  />
                  <DrawerItem
                    label="Logout"
                    onPress={() =>
                      props.navigation.reset({
                        index: 0,
                        routes: [{name: 'Login'}],
                      })
                    }
                  />
                </DrawerContentScrollView>
              );
            }}>
            <Drawer.Screen
              options={{
                headerShown: false,
              }}
              name="Notes"
              component={Note}
            />
            <Drawer.Screen
              options={{
                headerShown: false,
              }}
              name="SingleNote"
              component={SingleNote}
            />
            <Drawer.Screen
              options={{
                headerShown: false,
                swipeEnabled: false,
              }}
              name="Register"
              component={Register}
            />
            <Drawer.Screen
              options={{
                headerShown: false,
                swipeEnabled: false,
              }}
              name="Login"
              component={Login}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      );
    } else if (this.state.load === false) {
      return (
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Login"
            drawerContent={(props) => {
              const filteredProps = {
                ...props,
                state: {
                  ...props.state,

                  routes: props.state.routes.filter((route) => {
                    return (
                      route.name !== 'Login' &&
                      route.name !== 'Register' &&
                      route.name !== 'Notes' &&
                      route.name !== 'SingleNote'
                    );
                  }),
                },
              };
              return (
                <DrawerContentScrollView {...filteredProps}>
                  <DrawerItemList {...filteredProps} />
                  <DrawerItem
                    label="Toggle Mode"
                    onPress={() => this.props.changeMode(!this.props.mode)}
                  />
                  <DrawerItem
                    label="Logout"
                    onPress={() =>
                      props.navigation.reset({
                        index: 0,
                        routes: [{name: 'Login'}],
                      })
                    }
                  />
                </DrawerContentScrollView>
              );
            }}>
            <Drawer.Screen
              options={{
                headerShown: false,
              }}
              name="Notes"
              component={Note}
            />
            <Drawer.Screen
              options={{
                headerShown: false,
              }}
              name="SingleNote"
              component={SingleNote}
            />
            <Drawer.Screen
              options={{
                headerShown: false,
                swipeEnabled: false,
              }}
              name="Register"
              component={Register}
            />
            <Drawer.Screen
              options={{
                headerShown: false,
                swipeEnabled: false,
              }}
              name="Login"
              component={Login}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      );
    } else {
      return <></>;
    }
  }
}

const mapStateToProps = (state) => ({
  loginID: state.auth.loginID,
  mode: state.note.mode,
});

const mapDispatchToProps = (dispatch) => ({
  setUserId: (data) => dispatch(setUserId(data)),
  changeMode: (data) => dispatch(changeMode(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
