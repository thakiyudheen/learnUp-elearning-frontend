import {configureStore} from '@reduxjs/toolkit'
import { userReducer } from './slices/userSlice '
import { categoryReducer } from './slices/category'
import { courseReducer } from './slices/courseSlice'

export const store = configureStore ({
    reducer: {
        user: userReducer,
        category : categoryReducer,
        course : courseReducer
    }
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType < typeof store.getState >