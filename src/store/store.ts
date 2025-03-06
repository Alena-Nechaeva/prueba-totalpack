import { configureStore } from '@reduxjs/toolkit';
import { usersSlice } from '@/components/componentsStore';
import { usersApi } from '@/api/api';
import {emailApi} from "@/api/sendEmail.api";

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [emailApi.reducerPath]: emailApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({}).concat(usersApi.middleware, emailApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
