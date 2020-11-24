<template>
  <div class="container">
      <form @submit.prevent="modify()">
          <div>
              <v-select
                :items="item"
                label="카테고리"
                outlined
                v-model="POST_CATEGORY"
                >
                </v-select>
          </div>
          <div>
               <v-text-field label="제목" v-model="POST_TITLE"></v-text-field>
          </div>
          <div>
            <v-textarea
                name="input-7-1"
                label="본문"
                hint="작성하세요."
                v-model="POST_CONTENT"
            ></v-textarea>
          </div>
          <div class="btncontainer">
              <div class="btn">
                  <v-btn
                        depressed
                        color="primary"
                        @click="modify()"
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
import {updateBoard} from '@/axios/board';
export default {
    data() {
        return {
            POST_TITLE:'',
            POST_CONTENT:'',
            POST_CATEGORY: '',
            item: [
            '공지사항',
            '자유게시판',
            '건의사항'
            ]
        }
    },
    methods: {
        async modify(){
            let POST_NO = this.$store.state.board.readpost.POST_NO;
            console.log('넘버 : ' + POST_NO);
            try {
                const req = {
                    POST_NO,
                    POST_TITLE:this.POST_TITLE,
                    POST_CONTENT:this.POST_CONTENT,
                    POST_CATEGORY:this.POST_CATEGORY
                };
                const result = await updateBoard(req);
                if(result === 1){
                    alert('수정완료 되었습니다.');
                    this.$router.push(`/readboard/${POST_NO}`);
                }      
            } catch (error) {
                alert('수정중 문제가 생겼습니다.');      
            }
        }        
    },
    mounted() {
        let CONTENT = this.$store.state.board.readpost.POST_CONTENT;
        let TITLE = this.$store.state.board.readpost.POST_TITLE;
        let CATEGORY= this.$store.state.board.readpost.POST_CATEGORY;
        this.POST_TITLE = TITLE;
        this.POST_CONTENT = CONTENT;
        this.POST_CATEGORY = CATEGORY;        
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