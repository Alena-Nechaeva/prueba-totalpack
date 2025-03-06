import { configureStore } from '@reduxjs/toolkit';
import { usersSlice } from '@/components/componentsStore';
import { usersApi } from '@/api/api';

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({}).concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
