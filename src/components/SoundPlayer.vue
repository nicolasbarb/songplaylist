<template>
    <div class="music">
        <v-img class="img" src="actualSong.img"></v-img>
        <v-card-text>
            <p>{{this.songArtist}}</p>
            <p>{{this.songTitle}}</p>
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
        <FavoriteModal :favoriteSong="favoriteSong"/>
        <v-slider :value="volume" @input="updateVolume($event)" max="1" :min="0" step=".1" thumb-label></v-slider>
    </div>
</template>

<script>
    import moment from "moment";
    import FavoriteModal from "./FavoriteModal";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "soundPlayer",
        components: {FavoriteModal},

        created() {
        },

        data() {
            return {
                myAudio: null,
                currentTime: 0,
                duration: 0,
                intervalTimer: null,
                actualSong: null,
                songTitle: "",
                songArtist: "",
                volume: 1,
                favoriteList: [],
                favoriteSong: null,
            };
        },
        methods: {
            ...mapActions({
                addSongsInPrevious: 'addSongsInPrevious',
                popPreviousSong: 'popPreviousSong',
                spliceInWaitingSong: 'spliceInWaitingSong'
            }),

            startSong(song) {
                if (this.myAudio) {
                    clearInterval(this.intervalTimer);
                    this.pause();
                }

                this.actualSong = song;

                this.myAudio = new Audio(this.actualSong.urlSong);
                this.myAudio.addEventListener("canplaythrough", () => {
                    this.duration = this.myAudio.duration;
                });
                this.myAudio.onended = () => {
                    this.next()
                };
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
                let nextSong;

                if(this.actualSong !== this.getSongsPlaylist[this.getSongsPlaylist.length - 1]) {

                    this.addSongsInPrevious(this.actualSong);

                    if (this.getWaitingSongs.length > 0) {
                        nextSong = this.getWaitingSongs[0];
                        this.spliceInWaitingSong(nextSong)

                    } else {

                        const nextSongIndex = this.getSongsPlaylist.indexOf(this.actualSong) + 1;
                        nextSong = this.getSongsPlaylist[nextSongIndex];

                    }

                    if (!nextSong) {
                        return;
                    }
                    this.startSong(nextSong);

                } else {
                    if (this.getWaitingSongs.length > 0) {
                        nextSong = this.getWaitingSongs[0];
                        this.spliceInWaitingSong(nextSong)

                        if (!nextSong) {
                            return;
                        }
                        this.startSong(nextSong);
                    }

                }
            },

            back() {

                this.popPreviousSong().then(response => {
                    if (response) {
                        this.startSong(response)
                    }
                })
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
                if (this.myAudio.volume === 0) {
                    console.log("Volume off", volume);
                } else if (this.myAudio.volume < 0 || this.myAudio.volume > 1) {
                    console.error("Error value volume", volume)
                } else {
                    console.log(volume)
                }
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
            },
        },
        computed: {
            ...mapGetters(["getSongsPlaylist", "getSelectedSong", "getWaitingSongs", "getPreviousSongs"]),


            currentTimeFormatted() {
                return moment(this.currentTime * 1000).format("mm:ss");
            },

            durationFormatted() {
                return moment(this.duration * 1000).format("mm:ss");
            },
        },

        watch: {

            getSelectedSong(val) {
                this.startSong(val)
            },

            actualSong(val) {
                if (val.title !== "") {
                    this.songTitle = val.title;
                    this.songArtist = val.artiste;
                }
            }
        },
    }
</script>
