<template>
  <v-card
    :title="props.user.name"
    :subtitle="'@' + props.user.username"
    :to="'/authors/' + props.user.id"
  />
</template>

<script setup lang="ts">
import type { User } from '@/types/model'

const props = defineProps<{
  user: User
}>()
</script>
