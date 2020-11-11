<template>

        <ul>
            <div v-for="song in this.$store.state.songs" :key="song.urlSong">
                <v-btn class="btn" @click="startSong(song)">
                    {{ song.title }}
                </v-btn>
            </div>
        </ul>
</template>

<script>

    import json from "../assets/db.json";
    import { bus } from '../main'


    export default {
        name: "playlist",

        created() {
            this.fetchSongs();
        },
        methods: {

            fetchSongs() {
                let jsonfile = json.playlist;
                jsonfile.map(data => this.$store.state.songs.push(data));
            },

            startSong(song) {
                bus.$emit("startsong", song);
            }
        }
    }
</script>

<style scoped>

</style>
