import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import homeReducer from './actions/home/home';
import artistReducer from './actions/artist/artist';
import albumReducer from './actions/album/album';
import playerReducer from './actions/player/player';


export const store = configureStore({
  reducer: {
    home: homeReducer,
    artist: artistReducer,
    album: albumReducer,
    player: playerReducer
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
