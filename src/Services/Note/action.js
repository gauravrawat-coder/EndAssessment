import {
  GET_DATA,
  DELETE_NOTE,
  CHANGE_MODE,
  ADD_DATA,
  FILTER_NOTE,
  LATEST_NOTE,
} from './constant';
import {BASE_URL} from '../Api';

export const createNote = (data) => async (dispatch, getState) => {
  const id = getState().auth.loginID;

  const sendData = {notes: [data]};
  const response = await fetch(`${BASE_URL}/api/notes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(sendData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const JSONResponse = await response.json();

  const newResponse = JSON.parse(JSON.stringify(JSONResponse.data));

  const formattedData = newResponse.reduce((acc, current) => {
    let found = false;
    for (let i = 0; i < acc.length; i++) {
      if (acc[i].title === current.title) {
        found = true;
        acc[i].count++;
      }
    }
    if (!found) {
      current.count = 1;
      acc.push(current);
    }
    return acc;
  }, []);

  const newData = {data: JSONResponse.data, formatData: formattedData};
  dispatch({
    type: ADD_DATA,
    payload: newData,
  });
};

export const changeMode = (data) => {
  return {type: CHANGE_MODE, payload: data};
};

export const getData = () => async (dispatch, getState) => {
  const id = getState().auth.loginID;
  const data = await fetch(`${BASE_URL}/api/notes/${id}`);
  const response = await data.json();
  const newResponse = JSON.parse(JSON.stringify(response.response));

  const formattedData = newResponse.reduce((acc, current) => {
    let found = false;
    for (let i = 0; i < acc.length; i++) {
      if (acc[i].title === current.title) {
        found = true;
        acc[i].count++;
      }
    }
    if (!found) {
      current.count = 1;
      acc.push(current);
    }
    return acc;
  }, []);

  const newData = {data: response.response, formatData: formattedData};
  dispatch({
    type: GET_DATA,
    payload: newData,
  });
  return true;
};

export const filteredNote = (key) => async (dispatch, getState) => {
  const data = getState().note.data;

  const filterData = data.filter(({title}) => title === key.title);

  dispatch({
    type: FILTER_NOTE,
    payload: filterData,
  });
};

export const deleteNote = (noteid, title) => async (dispatch, getState) => {
  const id = getState().auth.loginID;
  const data = await fetch(`${BASE_URL}/api/notes/${id}/${noteid}`, {
    method: 'DELETE',
  });
  const dataJson = await data.json();
  if (dataJson.status) {
    dispatch({
      type: DELETE_NOTE,
      payload: {noteid, title},
    });
  }
};

export const findLatest = () => async (dispatch, getState) => {
  const data = getState().note.data;
  var mostRecentDate = new Date(
    Math.max.apply(
      null,
      data.map((e) => {
        return new Date(e.createdDate);
      }),
    ),
  );
  var mostRecentObject = data.filter((e) => {
    var d = new Date(e.createdDate);
    return d.getTime() === mostRecentDate.getTime();
  });
  mostRecentObject.length > 0 &&
    dispatch({type: LATEST_NOTE, payload: mostRecentObject[0].title});
};
