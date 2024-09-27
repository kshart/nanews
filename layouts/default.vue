<template>
  <v-app>
    <v-app-bar
      absolute
      :height="70"
      :order="1"
      >
      <v-container class="mx-auto d-flex align-center justify-center">
        <v-btn
          to="/"
          width="auto"
          height="auto"
          type="text"
          :active="false"
        >
          <v-avatar
            size="50"
            image="/logo.png"
          />
        </v-btn>
        <v-spacer />
        <v-btn
          to="/"
          text="go to posts"
        />
        <v-btn
          to="/authors"
          text="authors"
        />
        <v-spacer />
      </v-container>
    </v-app-bar>

    <v-main
      :order="1"
      class="bg-grey-lighten-3"
    >
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
</script>
