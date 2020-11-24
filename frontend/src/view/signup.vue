<template>
  <div class="signup">
      <signupform></signupform>
  </div>
</template>

<script>
import signupform from '@/components/signupform'
export default {
    components:{
        signupform
    }
}
</script>

<style>
.signup {
     display: flex;
     justify-content: center;
     align-items: center;
 }
</style>