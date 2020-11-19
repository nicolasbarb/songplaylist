<template>
  <div class="music">
    <v-img class="img" src="actualSong.img"></v-img>
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
      <v-btn @click="addFavoriteSong" elevation="2" fab>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-card-text>
    <v-slider :value="volume" @input="updateVolume($event)" max="1" :min="0" step=".1" thumb-label></v-slider>
  </div>
</template>

<script>
import {bus} from '@/main';
import moment from "moment";

export default {
  name: "soundPlayer",

  created() {
    this.songs = this.$store.state.songs;
    bus.$on('startsong', (data) => {
      console.log(data);
      this.startSong(data)
    })
  },

  data() {
    return {
      myAudio: null,
      currentTime: 0,
      duration: 0,
      intervalTimer: null,
      actualSong: null,
      songs: [],
      volume: .5,
      favoriteList: [],
      favoriteSong: null,
    };
  },
  methods: {
    startSong(song) {
      if (this.myAudio) {
        clearInterval(this.intervalTimer);
        this.pause();
      }
      this.actualSong = song;
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
    updateVolume(volume) {
      this.myAudio.volume = volume
      if (this.myAudio.volume == 0) {
        console.log("Volume off", volume);
      } else if (this.myAudio.volume < 0 || this.myAudio.volume > 1) {
        console.error("Error value volume", volume)
      } else {
        console.log(volume)
      }
      return;
    },
    addFavoriteSong() {
      if (this.myAudio == null) {
        console.error("please launch song")
      } else {
        this.favoriteSong = this.myAudio
        if (this.favoriteSong == null) {
          console.error("need song")
        } else if (this.favoriteList.includes(this.favoriteSong)) {
          this.favoriteList.splice(this.favoriteSong, 1)
          console.log("Array splice", this.favoriteList)
        } else {
          this.favoriteList.push(this.favoriteSong)
          console.log("song added", this.favoriteList)
        }
      }
      return;
    },
  },
  computed: {
    currentTimeFormatted() {
      return moment(this.currentTime * 1000).format("mm:ss");
    },

    durationFormatted() {
      return moment(this.duration * 1000).format("mm:ss");
    }
  },
}
</script>
