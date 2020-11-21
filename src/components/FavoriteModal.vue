<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          See your favourites song !
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          Favorite Song
        </v-card-title>
        <v-card-text>
          <p>Text</p>
          <p>{{ favoriteSong }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Disagree
          </v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "FavoriteModal",
  props: [
    'favoriteSong'
  ],
  data() {
    return {
      dialog: false
    }
  },
}
</script>
