<template>
  <main>
    <HeaderLayout />
    <TodolistLayout />
    <FooterLayout />    
  </main>
</template>

<script >
import TodolistLayout from '@/components/category/TodolistPage.vue'
import HeaderLayout from '@/components/layout/HeaderLayout.vue'
import FooterLayout from '@/components/layout/FooterLayout.vue'
export default {
  components: { 
    HeaderLayout, 
    FooterLayout, 
    TodolistLayout 
    },
  name: "TodolistView",
   
    
}
</script>
