<template>
  <v-container maxWidth="900px">
    <v-sheet rounded="lg">
      users
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
const route = useRoute()
const articleId = route.params.id

const url = useRequestURL()
useSeoMeta({
  title: 'Нановости, автор ' + articleId,
  ogTitle: 'Нановости, автор ' + articleId,
  description: 'Новости от ' + articleId,
  ogDescription: 'Новости от ' + articleId,
  ogImage: url.host + '/logo.png',
  robots: 'index, follow',
})
</script>
