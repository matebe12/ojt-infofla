const state = {
    post:'',
};

const mutations = {
  setPostList(state, data) {
      console.log(data);
      state.post = data.posts;
      state.CNT = data.CNT[0].CNT;
  },
  setPost(state, data) {
      state.readpost = data;
  }
};

const actions = {};

export default {
  state,
  mutations,
  actions,
};