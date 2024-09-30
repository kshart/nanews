<template>
  <v-container maxWidth="900px">
    <v-sheet rounded="lg">
      <v-card
        :title="post.title"
      >
        <v-card-subtitle>
          <NuxtLink :to="'/authors/' + post.userId">{{ '@' + post.user?.username }}</NuxtLink>
        </v-card-subtitle>
        <v-card-text style="white-space: pre-wrap">
          {{ post.body }}
        </v-card-text>
      </v-card>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
const route = useRoute()
const postId = route.params.id
const { data: post } = await useFetch('/api/posts/' + postId)
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}
const url = useRequestURL()

useSeoMeta({
  title: post.value.title,
  ogTitle: post.value.title,
  description: 'Описание новости ' + postId,
  ogDescription: 'Описание новости ' + postId,
  ogImage: url.host + '/logo.png',
  robots: 'index, follow',
})

if (import.meta.client) {
  const viewedPostsStore = useViewedPostsStore()
  watch(() => post.value?.id, () => {
    viewedPostsStore.add(Number(postId))
  }, { immediate: true })
}
</script>
