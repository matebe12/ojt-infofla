<template>
  <div class="container">
      <v-form @submit.prevent="writeComment" >
          <v-col
          cols="20"
          sm="12"
          class="form"
        >
          <v-text-field
            v-model="REPLY_CONTENT"
            counter="100"
            label="댓글 입력"
            outlined
          ></v-text-field>
          <v-btn width="100px" height="50px" type="submit">작성</v-btn>
        </v-col>
      </v-form>
      <ul class="comment-list">
          <li class="comment" v-for="(item,index) in getCommentList" :key="index">
              <div class="content">
                  <div class="writer">
                      <img :src="require('@/assets/user.png')" alt="유저" class="img">
                  </div>
                  <div class="comment-content">
                      <span class="id">{{item.REPLY_WRITER}}   </span> 
                      <span class="date">{{item.CREATED_DT}}</span>
                      <v-btn height="30px" v-if="getUser === item.REPLY_WRITER" @click="toggleform(item.REPLY_NO)">수정</v-btn>
                      <v-btn height="30px" v-if="getUser === item.REPLY_WRITER" @click="deleteComment(item.REPLY_NO)">삭제</v-btn>
                      <div>
                          {{item.REPLY_CONTENT}}
                      </div>
                      <div :id="`updateform${item.REPLY_NO}`" class="updateform">
                            <v-form @submit.prevent="updateComment(item.REPLY_NO)" >
                            <v-col
                            cols="20"
                            sm="12"
                            class="form"
                            >
                            <v-text-field
                                counter="100"
                                label="댓글 입력"
                                :value="item.REPLY_CONTENT"
                                :id="`${item.REPLY_NO}`"
                                outlined
                            ></v-text-field>
                            <v-btn width="100px" height="50px" type="submit">작성</v-btn>
                            </v-col>
                        </v-form>
                      </div>
                  </div>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
import {writeComment, updateComment, deleteComment} from '@/axios/board';
export default {
    props:['POST_NO'],
    computed: {
        getCommentList(){
            return this.$store.state.comment.comment;
        },
        getUser(){
            return this.$store.state.user.USER_ID;
        }
    },
    created() {
        //초기 컴포넌트 생성때 댓글 불러옴
        this.$store.dispatch('setCommentList', this.POST_NO);
    },
    methods: {
        // 댓글 작성 후 댓글 재호출
       async writeComment() {
           try {
               if(!this.REPLY_CONTENT || this.REPLY_CONTENT.length > 100){
                   alert('댓글은 100자 이내로 입력 해주세요.');
                   return;
               }
               const reqData = {
                   REPLY_CONTENT: this.REPLY_CONTENT,
                   REPLY_WRITER: this.$store.state.user.USER_ID,
                   POST_NO: this.POST_NO
               };
               const res = await writeComment(reqData);
               console.log(res);
                if(res === 1){
                    this.$store.dispatch('setCommentList', this.POST_NO);
                    alert('댓글이 작성되었습니다.');
                    this.REPLY_CONTENT = '';    
                }else {
                    throw new Error('알 수 없는 오류 발생');
                }

           } catch (error) {
               console.log(error);
               alert('작성중 문제가 생겼습니다.',error);     
           }
        },
        async updateComment(n) {
           try {
               let input = document.getElementById(`${n}`);
               if(!input.value ||input.value.length > 100){
                   alert('댓글은 100자 이내로 입력 해주세요.');
                   return;
               }
               const reqData = {
                   REPLY_CONTENT: input.value,
                   REPLY_NO: n
               };
               const res = await updateComment(reqData);
               console.log(res);
                if(res === 1){
                    this.$store.dispatch('setCommentList', this.POST_NO);
                    alert('댓글이 수정되었습니다.');
                    this.toggleform(n);    
                }else {
                    throw new Error('알 수 없는 오류 발생');
                }

           } catch (error) {
               console.log(error);
               alert('작성중 문제가 생겼습니다.',error);     
           }
        },
        async deleteComment(n) {
           try {
               const result = confirm('댓글을 삭제하시겠습니까?');
               if(result){
                const reqData = {
                   REPLY_NO: n
               };
               const res = await deleteComment(reqData);
               console.log(res);
                if(res === 1){
                    this.$store.dispatch('setCommentList', this.POST_NO);
                    alert('댓글이 삭제되었습니다.');
                }else {
                    throw new Error('알 수 없는 오류 발생');
                }
               }             
           } catch (error) {
               console.log(error);
               alert('삭제중 문제가 생겼습니다.',error);     
           }
        },
        toggleform(n) {
            let form = document.getElementById(`updateform${n}`);
            let input = document.getElementById(`${n}`);
            if(form.style.display === 'none'){
                form.style.display = 'block';
                input.focus();
            }else {
                form.style.display = 'none';
            }
        },
    },
    data() {
        return {
            REPLY_CONTENT:'',
        }
    },
}
</script>

<style scoped>
    .content {
        display: flex;
        justify-content: flex-start;
    }
    ul {
        list-style-type: none;
    }
    .img {
        width: 50px;
        height: 50px;
        margin-right: 20px;
    }
    .comment {
        border-bottom: 1px solid;
        width: 98%;
    }
    .form {
        display: flex;
    }
    .updateform {
        display: none;
    }
</style>