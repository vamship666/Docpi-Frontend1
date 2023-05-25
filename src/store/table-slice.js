import { createSlice } from '@reduxjs/toolkit';

const tableSlice = createSlice({
  name: 'table',
  initialState: {
    name: null,
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload
      // {
      //   user: name,
      //   id: id
      // }
    },
    
  },
});

export const tableActions = tableSlice.actions;

export default tableSlice;
