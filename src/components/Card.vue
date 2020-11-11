<template>
  <div id="audioContainer">
    <div class="music">
      <img
        class="img"
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      />
      <v-card-text>
        <span>{{ currentTimeFormatted }}</span> /
        <span id="duration">{{ durationFormatted }}</span>
        <v-slider
          :max="duration - 1 >= 0 ? duration - 1 : 1"
          min="0"
          :value="currentTime ? currentTime : 0"
          @input="changeTime($event)"
        />
        <v-btn @click="back" elevation="2" fab>
          <v-icon>mdi-skip-previous</v-icon>
        </v-btn>
        <v-btn @click="play" elevation="2" fab>
          <v-icon>mdi-play</v-icon>
        </v-btn>
        <v-btn @click="pause" elevation="2" fab>
          <v-icon>mdi-pause</v-icon>
        </v-btn>
        <v-btn @click="next" elevation="2" fab>
          <v-icon>mdi-skip-next</v-icon>
        </v-btn>
      </v-card-text>
    </div>
    <div class="playlist">
      <playlist :songs="songs" v-on:startsong="startSong($event)"></playlist>
    </div>
    <div>
      <a v-on:click.prevent="" v-on:mouseenter="showVolume = true" title="Volume">
        <svg width="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="currentColor" d="M19,13.805C19,14.462,18.462,15,17.805,15H1.533c-0.88,0-0.982-0.371-0.229-0.822l16.323-9.055C18.382,4.67,19,5.019,19,5.9V13.805z"/>
        </svg>
        <input v-model.lazy.number="volume" v-show="showVolume" type="range" min="0" max="100"/>
      </a>
    </div>
<!--    <knob-control :min="0" :max="100" :responsive="true" :animated="true" v-model="someValue">test</knob-control>-->
  </div>
</template>

<script>
import moment from "moment";
import json from "../assets/db.json";
import Playlist from "./playlist";

export default {
  name: "Card",
  components: { Playlist },
  props: {},
  created() {
    this.fetchSongs();
  },
  data() {
    return {
      myAudio: null,
      currentTime: 0,
      duration: 0,
      intervalTimer: null,
      songs: [],
      actualSong: null,
      showVolume: false,
      volume: 100
    }
  },
  methods: {
    startSong(song) {

      if (this.myAudio) {
        clearInterval(this.intervalTimer);
        this.pause();
      }
      this.actualSong = this.songs.indexOf(song);
      this.myAudio = new Audio(song.urlSong);
      this.myAudio.addEventListener("canplaythrough", () => {
        this.duration = this.myAudio.duration;
      });
      this.intervalTimer = this.calculIntervalTime();
      this.play();
    },
    play() {
      this.myAudio.play();
    },
    pause() {
      this.myAudio.pause();
    },
    next() {
      const nextSong = this.songs[this.actualSong + 1];
      if (!nextSong) {
        return;
      }
      this.startSong(nextSong);
    },
    back() {
      const prevSong = this.songs[this.actualSong - 1];
      if (!prevSong) {
        return;
      }
      this.startSong(prevSong);
    },

    changeTime(e) {
      if (e < 0 || e === Math.round(this.myAudio.currentTime)) {
        return;
      }
      clearInterval(this.intervalTimer);
      this.myAudio.currentTime = e;
      this.intervalTimer = this.calculIntervalTime();
    },
    calculIntervalTime() {
      return setInterval(() => {
        this.currentTime = this.myAudio.currentTime;
      }, 1000);
    },
    fetchSongs() {
      let jsonfile = json.playlist;
      jsonfile.map(data => this.songs.push(data));
    }
  },
  computed: {
    currentTimeFormatted() {
      return moment(this.currentTime * 1000).format("mm:ss");
    },

    durationFormatted() {
      return moment(this.duration * 1000).format("mm:ss");
    }
  },
  watch: {
    volumes(){
      this.showVolume = false;
      this.myAudio.volume = this.volume / 100;
    }
  }
}

</script>

<style scoped lang="scss">
#audioContainer {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;

  .music {
    width: 30vw;
    margin: 0;
    padding: 0;
    overflow: hidden;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    .img {
      width: inherit;
    }
  }
}
</style>
