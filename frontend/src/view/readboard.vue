<template>
<div class="box">
<div class="container">
      <h1>READ VIEW</h1>
      
      <v-card>
      <v-responsive>
        <v-card-text>
           <div class="title">
              <h2>[{{getPost.POST_CATEGORY}}]{{getPost.POST_TITLE}}</h2>
          </div>
          <hr>
          <div class="content">
              <div class="infoa">
                  <strong>작성자 {{getPost.POST_WRITER}} </strong>
                  <strong>작성일자 {{getPost.CREATED_DT}} </strong>
              </div>
              <div class="body">
                  <p>{{getPost.POST_CONTENT}}</p>
              </div>
          </div>
          <div class="btn">
              <div class="3btn">
                <button @click="$router.back(-1)">목록</button>
                <button v-if="getUserId === getPost.POST_WRITER" @click="modify();">수정</button>
                <button v-if="getUserId === getPost.POST_WRITER" @click="deletePost();">삭제</button>
              </div>
          </div>
        </v-card-text>
      </v-responsive>
    </v-card>
      <div class="replyboard">
          <comment :POST_NO="this.$store.state.board.readpost.POST_NO"></comment>
      </div>
  </div>
</div>
  
</template>

<script>
import {deleteBoard} from '@/axios/board';
import comment from '@/components/comment';
export default {
created() {
    console.log('jhjhk');
},
computed: {
    getPost() {
        console.log(this.$store.state.board.readpost);
        return this.$store.state.board.readpost;
    },
    getUserId() {
        return this.$store.state.user.USER_ID;
    }
},
components:{
            comment
},
methods: {
    modify(){
        this.$router.push('/modifyboard');
    },
    async deletePost(){
            let POST_NO = this.$store.state.board.readpost.POST_NO;
            console.log('넘버 : ' + POST_NO);
            try {
                const req = {
                    POST_NO
                };
                const result = await deleteBoard(req);
                console.log(result);
                if(result === 1){
                    alert('삭제완료 되었습니다.');
                    this.$router.go(-1);
                }else {
                    alert('삭제중 문제가 생겼습니다.');
                }      
            } catch (error) {
                alert('삭제중 문제가 생겼습니다.');      
            }
        },
},
}
</script>

<style scoped>
.box {
    display: flex;
    justify-content: center;
}
    h1 {
        text-align: center;
    }
    h2 {
        text-align: center;
    }
    h3 {
        text-align: center;
        display: inline-block;
        margin: 0;
    }
    .container {
        width: 1000px;
    }
    .infoa {
        display: flex;
        justify-content: space-between;
    }
    strong {
        font-size: 1rem;
    }
    .title {
        content: "";
        display: block;
        margin: 20px 0px;
    }
    .btn {
        margin-top: 50px;
        display: flex;
        justify-content: flex-end;
    }
    .body {
        margin-top: 100px;
        margin-left: 5%;
    }
    button {
        width: 50px;
        height: 50px;
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
</style>