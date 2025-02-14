import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : { content : null}
};

export const tweetSlice = createSlice({
    name : "tweet",
    initialState : initialState,
    reducers : {
        addTweet : (state, action) =>{
            //state.value.title = action.payload.title;
            state.value.content = action.payload;

            console.log(action.payload);
        }
    }
});

export const { addTweet } = tweetSlice.actions;
export default tweetSlice.reducer;