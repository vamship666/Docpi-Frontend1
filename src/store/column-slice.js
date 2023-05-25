import { createSlice } from '@reduxjs/toolkit';

const columnSlice = createSlice({
  name: 'column',
  initialState: {
    columns: null,
  },
  reducers: {
    setColumns(state, action) {
      state.columns = action.payload
    },
    
  },
});

export const columnActions = columnSlice.actions;

export default columnSlice;
