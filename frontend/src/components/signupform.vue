<template>
<div class="signform">
    <searchModal v-if="show" @close="closeModal"></searchModal>
       <h2>Sign Up</h2>    
    <div class="form" @submit.prevent="signup()">  
      <form>
          
          <div>
              <v-text-field label="아이디" v-model="USER_ID"></v-text-field>
          </div>
          
          <div>
              <v-text-field label="비밀번호" type="password" v-model="USER_PW"></v-text-field>
          </div>
          
          <div>
              <v-text-field label="이름" v-model="USER_NM"></v-text-field>
          </div>

          <div>
              <v-text-field label="이메일" v-model="USER_EMAIL"></v-text-field>
          </div>

          <div>
              <v-text-field label="전화번호" v-model="USER_PHONE"></v-text-field>
          </div>
          
          <div>
            <v-text-field label="회사 검색" v-model="USER_CORP"></v-text-field>
            <button type="button" class="searchBtn" @click="showModal()">검색</button>
          </div>

          <div>
            <button class="signBtn">회원가입</button>
          </div>
          
          <div>
            <button type="button" class="homeBtn" @click="$router.push('/')">홈으로</button>
          </div>                   
      </form>
    </div>
</div>
  
</template>

<script>
import Validation from '@/util/Validation.js';
import searchModal from '@/components/searchmodal';
import MODAL_MIXIN from '@/util/modalMix.js';
//import {loginUser} from '@/axios/user.js';
import axios from 'axios';
export default {
    components:{
        searchModal
    },
    mixins:[MODAL_MIXIN],
    data(){
        return {
            USER_ID: '',
            USER_PW: '',
            USER_NM:'',
            USER_EMAIL: '',
            USER_PHONE: '',
            USER_CORP: null,
            loginState: ''
        }
    },
    methods: {
        closeModal(selectData){
            console.log(selectData);
            this.show = false;
            this.USER_CORP = selectData;
        },
        async signup() {
            if(!Validation.isNull(this.USER_ID) || !Validation.isNull(this.USER_PW)){
                this.loginState = '아이디 및 비밀번호를 입력해주세요.';
            }else{
                this.loginState = '';
            }
            const reqData = {
                USER_ID: this.USER_ID,
                USER_PW: this.USER_PW,
            };
            try {
                //await loginUser(reqData);
                const res = await axios.post("http://localhost:3000/graphql", {
                query: `
                    mutation{
                    createUser(
                        USER_ID:"${this.USER_ID}",
                        USER_PW:"${this.USER_PW}",
                        USER_NM:"${this.USER_NM}",
                        USER_EMAIL:"${this.USER_EMAIL}",
                        USER_PHONE:"${this.USER_PHONE}",
                        USER_CORP:"${this.USER_CORP}",
                    )
                }
                `
                });
                let result = res.data.data.createUser;
                if(result === 1){
                    alert('회원가입이 완료되었습니다.');
                    this.$router.push('/');
                }
            } catch (error) {
                console.log(error);
            }
            console.log(reqData);
        },
        showModal(){
            this.show = true;
        }
    },
}
</script>

<style scoped>
    .form {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30rem;
        width: 500px;
        
    }
    .signform div {
        display: flex;
        justify-content: center;
        border-radius: 10px;
    }
    input {
        width: 258px;
        height: 50px;
        margin: 1%;
        border-radius: 2px 2px 2px 2px;
    }
    
    .signBtn, .homeBtn {
        width: 400px;
        height: 50px;
        margin: 1%;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
        font-size: 16px;
        color: rgb(255, 255, 255);
        text-align: center;
        line-height: 2.5em;
        background-color: rgb(52, 152, 219);
        border: none;
    }

    .searchBtn {
        width: 150px;
        background-color: rgb(52, 152, 219);
        border: none;
         border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
        color: rgb(255, 255, 255);
    }
    
    button {
        cursor: pointer;
    }

    label {
        display: flex;
        align-items: center;
    }

    h2 {
        text-align: center;
    }
    
    .state {
        color: crimson;
    }
    
    #inputcorp {
        width: 100px;
    }
</style>