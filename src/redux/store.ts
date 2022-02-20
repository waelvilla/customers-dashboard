import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authApi } from 'src/services/authApi';
import { customersApi } from 'src/services/customersApi';
import authReducer from './reducers/auth.reducer';

export const store = configureStore({
  reducer: {
    [customersApi.reducerPath]: customersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customersApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
