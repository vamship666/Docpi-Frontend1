import { createSlice } from '@reduxjs/toolkit';

const sortAndFilterSlice = createSlice({
  name: 'sortAndFilter',
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

export const sortAndFilterActions = sortAndFilterSlice.actions;

export default sortAndFilterSlice;
