<template>
  <v-card
    :title="props.post.title"
    :to="'/posts/' + props.post.id"
    :color="color"
    :style="'background:' + color"
  >
    <v-card-subtitle>
      {{ '@' + props.post.user?.username }}
    </v-card-subtitle>
    <v-card-text style="white-space: pre-wrap">{{ props.post.body }}</v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Post } from '@/types/models'

const props = defineProps<{
  post: Post
}>()

const viewedPostsStore = useViewedPostsStore()
onMounted(() => {
  viewedPostsStore.init()
})
const color = computed(() => viewedPostsStore.postIds.includes(props.post.id) ? '#e0e0e0' : undefined)
</script>
