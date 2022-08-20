import { combineReducers } from 'redux';
import { publicacionReducer } from '../reducers/publicacionReducer';
import { toastMessageReducer } from './toastMessageReducer';

export const rootReducer = combineReducers({ publicaciones: publicacionReducer, toast: toastMessageReducer });
