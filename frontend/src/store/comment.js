import {getCommentList} from '@/axios/board';


const state = {
    comment:'',
};

const mutations = {
  setCommentList(state, data) {
      console.log(data);
      state.comment = data;
  },
};

const actions = {
    async setCommentList({commit}, data){
        try {
            const res = await getCommentList(data);
            console.log(res);
            if(!res){
                alert('댓글 불러오는데에 실패하였습니다.');
                throw new Error('에러에러');
            }else {
                return commit('setCommentList',res);
            }
        } catch (error) {
            console.log('error => ',error);
        }
    }
};

export default {
  state,
  mutations,
  actions,
};