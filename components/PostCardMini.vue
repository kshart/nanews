<template>
  <v-card
    :title="props.post.title"
    :to="'/posts/' + props.post.id"
  >
    <v-card-subtitle>
      <NuxtLink :to="'/authors/' +  props.post.userId">{{ '@' +  props.post.user?.username }}</NuxtLink>
    </v-card-subtitle>
    <v-card-text style="white-space: pre-wrap">{{ props.post.body }}</v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Post } from '@/types/model'

const props = defineProps<{
  post: Post
}>()
</script>
