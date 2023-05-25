import { createSlice } from '@reduxjs/toolkit';

const myFilesSlice = createSlice({
  name: 'myFiles',
  initialState: {
    visible: false,
  },
  reducers: {
    setModel(state, action) {
      // console.log(action.payload)
      state.visible = !state.visible
      // console.log(state.columns)
    },
    
  },
});

export const myFilesActions = myFilesSlice.actions;

export default myFilesSlice;
