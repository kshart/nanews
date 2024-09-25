<template>
  <div>
    article 1
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const articleId = route.params.id

const url = useRequestURL()
useSeoMeta({
  title: 'Title новости ' + articleId,
  ogTitle: 'Title новости ' + articleId,
  description: 'Описание новости ' + articleId,
  ogDescription: 'Описание новости ' + articleId,
  ogImage: url.host + '/logo.png',
  robots: 'index, follow',
})
</script>
