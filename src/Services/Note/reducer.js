import {
  GET_DATA,
  DELETE_NOTE,
  CHANGE_MODE,
  ADD_DATA,
  FILTER_NOTE,
  LATEST_NOTE,
} from './constant';

const initialState = {
  data: [],
  mode: true,
  formatData: [],
  filterData: [],
  latest: null,
};

export default function Note(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MODE: {
      return {...state, mode: action.payload};
    }
    case LATEST_NOTE: {
      return {...state, latest: action.payload};
    }
    case GET_DATA: {
      return {
        ...state,
        formatData: action.payload.formatData,
        data: action.payload.data,
      };
    }
    case FILTER_NOTE: {
      return {
        ...state,
        filterData: action.payload,
      };
    }
    case DELETE_NOTE: {
      let newData = [...state.formatData];

      const findIndex = newData.findIndex(
        (data) => data.title === action.payload.title,
      );
      if (newData[findIndex].count > 1) {
        newData[findIndex].count -= 1;
      } else {
        newData.splice(findIndex, 1);
      }

      return {
        ...state,
        filterData: state.filterData.filter(
          (data) => data.id !== action.payload.noteid,
        ),
        data: state.data.filter((data) => data.id !== action.payload.noteid),
        formatData: [...newData],
      };
    }
    case ADD_DATA: {
      return {
        ...state,
        formatData: action.payload.formatData,
        data: action.payload.data,
      };
    }

    default:
      return state;
  }
}
