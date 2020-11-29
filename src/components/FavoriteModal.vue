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
          <ul class="listModal" >
            <li v-for="song in getFavoriteList" :key="song.urlSong">
              {{ song.artiste }} - {{ song.title }}
            </li>
          </ul>
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
import {mapGetters} from "vuex";

export default {
  name: "FavoriteModal",
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapGetters(["getFavoriteList"]),
  }
}
</script>

<style scoped lang="scss">

.listModal {
  li {
    padding-bottom: 5px;
    list-style: none;
    border-bottom: 1px solid black;
  }
}

</style>
