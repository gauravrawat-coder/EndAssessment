import {combineReducers} from 'redux';
import {Note, Auth} from './Services';

export default combineReducers({
  note: Note,
  auth: Auth,
});
