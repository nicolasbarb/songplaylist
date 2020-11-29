<template>
  <div id="container">
    <h1>Nom de l'artiste</h1>
    <p>{{ this.artisteName }}</p>
    <v-btn @click="showArtisteSong">{{ this.songTitle }}</v-btn>
  </div>
</template>

<script>
import json from "../assets/db.json";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'Artiste',

  data() {
    return {
      songTitle: null,
      artisteName: null,
      artisteSong: []
    }
  },

  created() {
    this.loadArtisteSongs()
    this.artisteName = this.$route.params.artisteName
    this.artisteSong = this.getArtisteSongs;
    this.showArtisteSong()
  },

  methods: {
    ...mapActions({
      fetchArtiste: 'artisteSong',
    }),

    loadArtisteSongs() {
      this.fetchArtiste(json.artiste)
    },

    showArtisteSong: function () {
      // this.songTitle = this.artisteSong.name
      this.artisteSong.map(index => {
        this.songTitle = this.artisteSong[index.name]
      })
      console.log("pute", this.songTitle)


      /*if (this.artisteName === this.artisteSong.name){
        return;
      }*/
    }
  },

  computed: {
    ...mapGetters(["getArtisteSongs"]),
  }
}
</script>

<style scoped lang="scss">
li {
  list-style: none;
}
</style>
