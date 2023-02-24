import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import homeReducer from '../actions/home/home';
import artistReducer from '../actions/artist/artist';




export const store = configureStore({
  reducer: {
    home: homeReducer,
    artist: artistReducer
  },
  
    
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
