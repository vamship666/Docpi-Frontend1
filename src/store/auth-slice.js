import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: null,
  },
  reducers: {
    setAuth(state, action) {
      state.login = action.payload
      // {
      //   user: name,
      //   id: id
      // }
    },
    
  },
});

export const authActions = authSlice.actions;

export default authSlice;
