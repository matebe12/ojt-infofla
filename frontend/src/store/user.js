const state = {
    USER_NO: null,
    USER_ID: null,
    USER_PW: null,
    USER_NM: null,
    USER_EMAIL: null,
    USER_PHONE: null,
    USER_CORP: null
};

const mutations = {
  logout(state) {
    state.USER_NO = null;
    state.USER_ID = '';
    state.USER_PW = '';
    state.USER_NM = '';
    state.USER_EMAIL = '';
    state.USER_PHONE = '';
    state.USER_ID = '';
    state.USER_CORP = '';
    state.USER_TOKEN = '';
    localStorage.removeItem('token');
  },
  login(state, data) {
    state.USER_NO = data.USER_NO;
    state.USER_ID = data.USER_ID;
    state.USER_PW = data.USER_PW;
    state.USER_NM = data.USER_NM;
    state.USER_EMAIL = data.USER_EMAIL;
    state.USER_PHONE = data.USER_PHONE;
    state.USER_CORP = data.USER_CORP;
    state.USER_TOKEN = data.USER_TOKEN;
    //localStorage에 토큰 저장
    localStorage.setItem('token',data.USER_TOKEN);
  },
};

const actions = {};

export default {
  state,
  mutations,
  actions,
};