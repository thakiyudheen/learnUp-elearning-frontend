import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signupAction } from '../actions/auth/signupAction';
import { getAllCategoryAction } from '../actions/course/getAllCategoryAction';


export interface category {
    _id:string ,
    categoryName :string,
    createdAt :Date,

}
export interface categoryState {
    loading: boolean;
    data: category | null;
    error: string | null;
}

const initialState: categoryState = {
    loading: false,
    data: null,
    error: null,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
       
        storeCategory: (state:categoryState, action: PayloadAction<any>) => {
            
            state.data = action.payload;
        }
    },
    extraReducers(builder) {
        builder
        
        // category actin ---------------------------------------

        .addCase(getAllCategoryAction.pending , (state : categoryState) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllCategoryAction.fulfilled , (state :categoryState , action : PayloadAction<category>) =>{
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        })
        .addCase(signupAction.rejected,(state : categoryState , action ) =>{
            state.loading = true ; 
            state.data =null ;
            state.error = action.error.message || 'category getting failed';
        })


    },
});

export const { storeCategory } = categorySlice.actions;

export const categoryReducer = categorySlice.reducer;
