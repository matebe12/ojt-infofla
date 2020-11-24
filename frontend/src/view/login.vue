<template>
  <div class="login">
      <loginform></loginform>
  </div>
</template>

<script>
import loginform from '@/components/loginform';
export default {
    components:{
        loginform
    }
}
</script>

<style scoped>
 .login {
     display: flex;
     justify-content: center;
     align-items: center;
 }
</style>