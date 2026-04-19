// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import heroesReducer from './features/cart/heroesSlice';
import themeReducer from './features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    heroes: heroesReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;