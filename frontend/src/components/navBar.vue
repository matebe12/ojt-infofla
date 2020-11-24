<template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title><router-link>OJT</router-link></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      
      <div v-if="!getUser">
        <router-link to="/login" v-if="!getUser" ><span>로그인</span></router-link>       
        <router-link to="/signup" v-if="!getUser" ><span>회원가입</span></router-link>
      </div>

      <div v-else-if="getUser">
        <router-link to="/"  @click.native="logout()" class="bar-item">로그아웃</router-link> 
        <router-link to="/myinfo" class="bar-item">내 정보</router-link>
      </div>    
       
    </v-app-bar>
  </div>
</template>

<script>
export default {
    computed: {
        getUser(){
            return this.$store.state.user.USER_ID;
        }
    },
    data() {
        return {
            drawer:false,
            group:'',
        }
    },
    methods: {
        logout(){
            this.$store.commit('logout');
            alert('로그아웃');
            this.$router.push('/login');            
        }
    },
}
</script>

<style scoped>
    .navbar {
        background-color: black;
        display: flex;
        justify-content: space-between;
    }

    ul {
        display: flex;
        justify-content: center;
    }

    li {
        list-style: none;
    }

    a {
        text-decoration: none;
        margin-right: 10px;
    }
    .menu {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        position: relative;
    }
    
    .menu:hover .menulink span{
        color: paleturquoise;
    }

    span {
        color: white;

    }
    .myinfo {
        color: black;
    }

    .menu:hover .showInfo{
        display: block;
    }

    .showInfo {
        position: absolute;
        top: 3.3rem;
        color: white;
        display: none;
        background: #eee;
        width: 200px;
    }
    p {
        text-align: center;
    }
    .bar-item {
        color: white;
    }
</style>