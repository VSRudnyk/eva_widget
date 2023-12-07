import { createSlice } from '@reduxjs/toolkit';
import { authAPI } from './authAPI';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isLoggedIn: false,
    botId: null,
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      authAPI.endpoints.auth.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.isLoggedIn = true;
        state.botId = payload._id;
      }
    );
    builder.addMatcher(
      authAPI.endpoints.fetchCurrentBot.matchFulfilled,
      (state, { payload }) => {
        state.isLoggedIn = true;
        state.botId = payload._id;
      }
    );
  },
  reducers: {},
});

export default authSlice.reducer;
