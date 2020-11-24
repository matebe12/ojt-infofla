<template>
  <div class="container">
      <form @submit.prevent="writeboard()">
          <div>
                <v-select
                :items="item"
                label="카테고리"
                outlined
                v-model="CATEGORY"
                >
                </v-select>
          </div>
          <div>
              <v-text-field label="제목" v-model="POST_CATEGORY"></v-text-field>
          </div>
          <div>
              <v-textarea
          name="input-7-1"
          label="본문"
          hint="작성하세요."
        ></v-textarea>
            
          </div>
          <div class="btncontainer">
              <div class="btn">
                    <v-btn
                        depressed
                        color="primary"
                        @click="writeboard()"
                    >작성</v-btn>
                  <v-btn
                        depressed
                        color="default"
                        @click="$router.back(-1)"
                    >취소</v-btn>
              </div>
          </div>
      </form>
  </div>
</template>

<script>
import {writeboard} from '@/axios/board';
export default {
    data() {
        return {
            POST_TITLE:'',
            POST_CONTENT:'',
            POST_CATEGORY: '공지사항',
            item: [
            '공지사항',
            '자유게시판',
            '건의사항'
            ]
        }
    },
    methods: {
        async writeboard(){
            let POST_NO = this.$store.state.board.readpost.POST_NO;
            console.log('넘버 : ' + POST_NO);
            try {
                const req = {
                    POST_TITLE:     this.POST_TITLE,
                    POST_CONTENT:   this.POST_CONTENT,
                    POST_WRITER:    this.$store.state.user.USER_ID,
                    POST_CATEGORY:  this.POST_CATEGORY,
                    POST_COMPANY:   this.$store.state.user.USER_CORP
                };
                const result = await writeboard(req);
                if(result === 1){
                    alert('글 작성이 완료 되었습니다.');
                    this.$router.go(-1);
                }else{
                    throw new Error('알 수 없는 오류 발생');
                }      
            } catch (error) {
                alert('작성중 문제가 생겼습니다.');      
            }
        }        
    },
}
</script>

<style scoped>
    input {
        width: 483px;
        padding: 10px;
        margin: 10px;
        border-radius: 10px;
    }
    .btncontainer {
        display: flex;
        justify-content: flex-end;
        margin: 10px;
    }
    .btncontainer button {
        margin: 10px;
        width: 50px;
        height: 30px;
        margin: 5px;
        background-color: #eee;
        border: none;
         border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
        color:black;
        cursor: pointer;
    }
    .container {
        display: flex;
        justify-content: center;
    }
    select {
        width: 150px;
        padding: 10px;
        margin: 10px;
        border-radius: 10px;
    }
    textarea {
        width: 500px;
        height: 300px;
        margin: 10px;
        border-radius: 10px;
    }
</style>