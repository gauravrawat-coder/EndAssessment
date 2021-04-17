import {SET_ID, LOGIN_SUCCESS} from './constant';
import {
  LoginManager,
  AccessToken,
  GraphRequestManager,
  GraphRequest,
} from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {BASE_URL} from '../Api';
export const registerUser = (data) => async (dispatch) => {
  const receievedData = {
    username: data.Email,
    password: data.Password,
    name: data.UserName,
    phoneNumber: 1234567809,
    socialId: null,
  };
  const response = await fetch(`${BASE_URL}/api/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(receievedData),
  });
  const JSONResponse = await response.json();
  if (JSONResponse.status) {
    await AsyncStorage.setItem('loginID', JSONResponse.body.id);
    dispatch({type: LOGIN_SUCCESS, data: JSONResponse.body});
    return true;
  }
  return false;
};

export const registerSocial = (data) => async (dispatch) => {
  const response = await fetch(`${BASE_URL}/api/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const JSONResponse = await response.json();
  if (JSONResponse.status) {
    await AsyncStorage.setItem('loginID', JSONResponse.id);

    dispatch({type: LOGIN_SUCCESS, data: JSONResponse});
    return true;
  }
  return false;
};

export const logUser = (data) => async (dispatch) => {
  const response = await fetch(`${BASE_URL}/api/authenticate`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const JSONResponse = await response.json();
  if (JSONResponse.status) {
    await AsyncStorage.setItem('loginID', JSONResponse.id);

    dispatch({type: LOGIN_SUCCESS, data: JSONResponse});
    return true;
  }
  return false;
};

export const sociallogin = () => async (dispatch) => {
  LoginManager.logInWithPermissions(['email']).then(
    function (result) {
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        AccessToken.getCurrentAccessToken().then((data) => {
          let accessToken = data.accessToken;
          const responseInfoCallback = (responseError, responseResult) => {
            if (responseError) {
            } else if (responseResult) {
              dispatch(sendSocialLogin(responseResult));
            }
          };

          const infoRequest = new GraphRequest(
            '/me',
            {
              accessToken: accessToken,
              parameters: {
                fields: {
                  string: 'first_name,id,email',
                },
              },
            },
            responseInfoCallback,
          );

          new GraphRequestManager().addRequest(infoRequest).start();
        });
      }
    },
    function (error) {},
  );
};

export const sendSocialLogin = (data) => async (dispatch) => {
  const receievedData = {
    username: data.email,
    password: data.email,
    name: data.first_name,
    phoneNumber: 1234567809,
    socialId: data.id,
  };

  const loginData = {
    socialId: data.id,
  };
  const response = await fetch(`${BASE_URL}/api/authenticate`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });
  const JSONResponse = await response.json();
  if (!JSONResponse.status) {
    dispatch(registerSocial(receievedData));
  } else {
    await AsyncStorage.setItem('loginID', JSONResponse.id);

    dispatch({type: LOGIN_SUCCESS, data: JSONResponse});
  }
};

export const setUserId = (data) => ({type: SET_ID, data: data});
