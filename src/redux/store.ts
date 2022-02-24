import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { persistCombineReducers, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authApi } from './api/authApi';
import { customersApi } from './api/customersApi';
import authReducer from './reducers/auth.reducer';

const persistConfig = {
  key: 'root',
  storage
};
const rootReducer = persistCombineReducers(persistConfig, {
  [customersApi.reducerPath]: customersApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customersApi.middleware)
});
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
