import { createSlice } from '@reduxjs/toolkit';
import { getUserFromLC } from '../../utils/getUserFromLC';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: 111,
    login: 'admin',
    password: 'admin',
    currentUser: getUserFromLC(),
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
