<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
                :src="require('../assets/logo.svg')"
                class="my-3"
                contain
                height="200"
        />
      </v-col>
    </v-row>

    <h1>Hello la promo Ynov !</h1>
    <h3>Bienvenue sur Ynov Songs :)</h3>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  }
}
</script>
