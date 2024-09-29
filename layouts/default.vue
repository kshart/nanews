<template>
  <v-app>
    <v-app-bar
      absolute
      :height="70"
    >
      <v-container class="mx-auto d-flex align-center justify-center">
        <v-btn
          to="/"
          width="auto"
          height="auto"
          type="text"
          :active="false"
        >
          <v-img
            ea3ger
            width="50px"
            src="/logo.png"
          />
        </v-btn>
        <v-spacer />
        <v-btn
          to="/"
          text="posts"
        />
        <v-btn
          to="/authors"
          text="authors"
        />
        <v-spacer />
      </v-container>
    </v-app-bar>

    <v-main
      class="bg-grey-lighten-3"
      style="
        --v-layout-left: 0px;
        --v-layout-right: 0px;
        --v-layout-top: 70px;
        --v-layout-bottom: 0px;
      "
    >
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </v-main>
  </v-app>
</template>
