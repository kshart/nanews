<template>
  <v-card
    :title="props.post.title"
    :subtitle="'@' + props.post.user?.username"
    :to="'/posts/' + props.post.id"
  >
    <v-card-text style="white-space: pre-wrap">{{ props.post.body }}</v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Post } from '@/types/model'

const props = defineProps<{
  post: Post
}>()
</script>
