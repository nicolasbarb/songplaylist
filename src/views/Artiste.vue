<template>
  <div id="container">
    <h1>Nom de l'artiste</h1>
    <p>{{ this.artisteName }}</p>
    <ul>
      <li v-for="song in artisteSongs" :key="song.title">
        <v-img :src="song.img"></v-img>
        {{song.title}}
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'Artiste',

  data() {
    return {
      artisteName: null,
      artisteSongs: []
    }
  },

  created() {
    this.artisteName = this.$route.params.artisteName;
    this.loadArtisteSong()
  },

  methods: {

    loadArtisteSong() {
      this.artisteSongs = this.getSongsPlaylist.filter(songTitle => songTitle.artiste === this.artisteName);
    }
  },

  computed: {
    ...mapGetters(["getSongsPlaylist"]),
  }
}
</script>

<style scoped lang="scss">
li {
  list-style: none;
}
</style>
