<template>
  <v-app>
    <NuxtRouteAnnouncer />
    <v-app-bar flat>
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
          text="go main"
        />
        <v-btn
          to="/articles"
          text="articles"
        />
        <v-btn
          to="/authors"
          text="authors"
        />
        <v-spacer />
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
</script>
