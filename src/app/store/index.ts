import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { summaryApi } from './model';

export const store = configureStore({
    reducer: {
        [summaryApi.reducerPath]: summaryApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(summaryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
