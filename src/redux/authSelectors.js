const getIsLoggedIn = (state) => state.auth.isLoggedIn;
const getToken = (state) => state.auth.token;
const botId = (state) => state.auth.botId;

const authSelectors = {
  getIsLoggedIn,
  getToken,
  botId,
};
export default authSelectors;
