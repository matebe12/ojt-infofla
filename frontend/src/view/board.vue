<template>
  <div class="boardlist">
      <boardList></boardList>
  </div>
</template>

<script>
import boardList from '@/components/boardlist';
export default {
components:{
    boardList
}
}
</script>

<style scoped>
.boardlist {
     display: flex;
     justify-content: center;
     align-items: center;
 }
</style>