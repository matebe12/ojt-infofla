<template>
<div class="loginform">
       <h2>LOGIN</h2>    
    <div class="form" @submit.prevent="login()">  
      <form>
          <div>
              <label for="inputid"><span><i class="fas fa-user fa-2x"></i></span></label>
            <input type="text" id="inputid" placeholder="아이디" autocomplete="off" v-model="USER_ID">
          </div>
          <div>
              <label for="inputpw"><span><i class="fas fa-lock fa-2x"></i></span></label>
            <input type="password" id="inputpw" placeholder="비밀번호" autocomplete="off" v-model="USER_PW">
          </div>
          <div>
              <span class="state">{{loginState}}</span>
          </div>
          <div>
            <button class="loginBtn" @click="login()">로그인</button>
          </div>
          <div>
            <button type="button" class="signBtn" @click="$router.push('/signup')">회원가입</button>
          </div>                   
      </form>
    </div>
</div>
  
</template>

<script>
import Validation from '@/util/Validation.js';
//import {loginUser} from '@/axios/user.js';
import axios from 'axios';
export default {
    data(){
        return {
            USER_ID: '',
            USER_PW: '',
            loginState: ''
        }
    },
    methods: {
        async login() {
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
                    login(USER_ID:"${this.USER_ID}",USER_PW:"${this.USER_PW}"){
                            USER_NO 
                            USER_ID
                            USER_NM
                            USER_EMAIL
                            USER_PHONE
                            USER_CORP
                            USER_TOKEN
                    }
                }
                `
                });
                console.log(typeof res.data);
                if(res.data.errors){
                    this.loginState = res.data.errors[0].message;
                }else {
                    let userData = res.data.data.login;
                    console.log(userData);
                    this.$store.commit('login', userData);
                    this.$router.push('/');
                }
                //if(!res.data.data.login){
                    //console.log(res.data.errors[0]);
                //}
                //let result = res.data.data.login;
                //let userData = result;
                //this.loginSatate = 
                //this.$store.commit('login', userData);
                //this.$router.push('/');
                // if(result.status === 1){
                //     let userData = result.result;
                //     this.$store.commit('login', userData);
                //     this.$router.push('/');
                // }else {
                //     this.loginState = '아이디 및 비밀번호가 틀립니다.';
                // }
                //console.log(result);
            } catch (error) {
                console.log(error);
            }
            console.log(reqData);
        }
    },
}
</script>

<style scoped>
    .form {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 20rem;
        width: 500px;
        
    }
    .loginform div {
        background: #eee;
        display: flex;
        justify-content: center;
        border-radius: 10px;
    }
    input {
        width: 258px;
        height: 50px;
        margin: 1%;
        border: 1px solid;
        border-radius: 2px 2px 2px 2px;
        background: white;
    }
    
    button {
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
    
</style>