<template>
<div>
<header><navBar></navBar></header>
      <router-view :key="$route.fullPath"></router-view>
</div>
    
</template>

<script>
import navBar from '@/components/navBar';
export default {
    components: {
        navBar
    }
}
</script>

<style>
header {
    margin-bottom: 3%;
}
</style>