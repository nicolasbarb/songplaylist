<template>
    <div>
        <input type="text" v-model="search" placeholder="Chercher un titre.."/>
        <ul>
            <div v-for="song in filteringList" :key="song.urlSong">
                <v-btn class="btn" @click="startSong(song)">
                    {{ song.title }}
                </v-btn>
            </div>
        </ul>
    </div>
</template>

<script>

    import json from "../assets/db.json";
    import { bus } from '../main'


    export default {
        name: "playlist",

        created() {
            if(this.$store.state.songs.length === 0){
                this.fetchSongs();
            }
        },

        data () {
            return {
                search: '',
                filteredList: this.$store.state.songs
            }
        },
        methods: {

            fetchSongs() {
                let jsonfile = json.playlist;
                jsonfile.map(data => this.$store.state.songs.push(data));
            },

            startSong(song) {
                bus.$emit("startsong", this.$store.state.songs.indexOf(song));
            }
        },

        computed: {
            filteringList() {
                return this.filteredList.filter(songs => {
                    return songs.title.toLowerCase().includes(this.search.toLowerCase())
                })
            }
        }
    }
</script>

<style scoped>

</style>
