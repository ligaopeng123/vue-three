<script setup lang="ts">
import {  RouterView } from 'vue-router'
import { onBeforeUnmount } from 'vue'
import { unregisterFetch } from '@/utils/intercept';
onBeforeUnmount(()=> {
  unregisterFetch();
})
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
