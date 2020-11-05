<template>

    <v-container id="audioContainer">
        <v-container id="music">
            <v-img
                    height="250"
                    src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            ></v-img>
            <v-card-text>
                <span>{{currentTimeFormatted}}</span> / <span id="duration">{{durationFormatted}}</span>
                <v-slider :max="duration - 1 >= 0 ? duration -1 : 1" min="0" :value="currentTime ? currentTime : 0" @input="changeTime($event)"/>
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
        </v-container>


        <v-container class="playlist">
            <ul>
                <div v-for="song in songs" :key="song.urlSong">
                    <v-btn  @click="startSong(song)">
                        {{song.title}}
                    </v-btn>
                </div>

            </ul>
        </v-container>

    </v-container>

</template>

<script>

    import moment from "moment"
    import json from "../assets/db.json"

    export default {
        name: "Card",
        props: {

        },
        created(){

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
            }
        },
        methods: {
            startSong(song){

                if(this.myAudio) {
                    clearInterval(this.intervalTimer);
                    this.pause()
                }
                this.actualSong = this.songs.indexOf(song);
                this.myAudio = new Audio(song.urlSong);
                this.myAudio.addEventListener("canplaythrough", () => {
                    this.duration = this.myAudio.duration
                });
                this.intervalTimer = this.calculIntervalTime();
                this.play()
            },
            play() {
                this.myAudio.play();
            },
            pause() {
                this.myAudio.pause();
            },
            next(){
                const nextSong = this.songs[this.actualSong+1];
                if(!nextSong) {
                    return
                }
                this.startSong(nextSong)
            },
            back(){
                const prevSong = this.songs[this.actualSong-1];
                if(!prevSong) {
                    return
                }
                this.startSong(prevSong)
            },

            changeTime(e) {
                console.log(e, this.myAudio.currentTime);
                if(e < 0 || e === Math.round(this.myAudio.currentTime)) {
                    return
                }
                clearInterval(this.intervalTimer);
                this.myAudio.currentTime = e;
                this.intervalTimer = this.calculIntervalTime()
            },
            calculIntervalTime(){
                return setInterval(() => {
                    this.currentTime = this.myAudio.currentTime;
                } , 1000);
            },
            fetchSongs(){
                let jsonfile = json.playlist;
                jsonfile.map(data => this.songs.push(data));
            },
        },
        computed: {
            currentTimeFormatted() {
                return moment(this.currentTime * 1000).format("mm:ss")
            },

            durationFormatted() {
                return moment(this.duration * 1000).format('mm:ss');
            }

        },
        watch: {
        }
    }

</script>

<style scoped lang="scss">
    #audioContainer{
        border: 2px solid black;
        margin: 0;
        padding: 0;

        display: flex;
        .playlist{
            border-left: 2px solid black;
        }
    }

</style>
