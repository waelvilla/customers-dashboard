import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { customersApi } from 'src/services/api';

export const store = configureStore({
  reducer: {
    [customersApi.reducerPath]: customersApi.reducer
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
