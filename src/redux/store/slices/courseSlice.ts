import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signupAction } from '../actions/auth/signupAction';
import { getAllCategoryAction } from '../actions/course/getAllCategoryAction';
import { getAllCourseAction } from '../actions/course/getAllCourseAction';


export interface courseState {
    loading: boolean;
    data: any | null;
    error: string | null;
}

const initialState: courseState = {
    loading: false,
    data: null,
    error: null,
};

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
       
        storeCourse: (state:courseState, action: PayloadAction<any>) => {
            
            state.data = action.payload;
        }
    },
    extraReducers(builder) {
        builder
        
        // category actin ---------------------------------------

        .addCase(getAllCourseAction.pending , (state : courseState) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllCourseAction.fulfilled , (state : courseState, action : PayloadAction<any>) =>{
            state.loading = false;
            console.log(action.payload);
            
            state.data = action.payload;
            state.error = null;
        })
        .addCase(getAllCourseAction.rejected,(state : courseState , action ) =>{
            state.loading = true ; 
            state.data =null ;
            state.error = action.error.message || 'course getting failed';
        })


    },
});

export const { storeCourse } = courseSlice.actions;

export const courseReducer = courseSlice.reducer;
