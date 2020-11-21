<template>
    <div>
        <input type="text" v-model="search" placeholder="Chercher un titre.."/>
        <ul>
            <div v-for="song in filteringList" :key="song.urlSong">
                <v-btn class="btn" @click="startSong(song)">
                    {{ song.title }}
                </v-btn>
                <v-btn @click="addSongsInWaiting(song)">Mettre en attente</v-btn>
            </div>
        </ul>
    </div>
</template>

<script>

    import json from "../assets/db.json";
    import { mapActions, mapGetters } from "vuex";


    export default {
        name: "playlist",

        created() {
            this.loadSongs();
            this.filteredList = this.getSongsPlaylist;
        },

        data () {
            return {
                search: '',
                filteredList: []
            }
        },
        methods: {

            loadSongs() {
                this.fetchSongs(json.playlist)
            },

            ...mapActions({
                fetchSongs: 'songs',
                startSong: 'playThisSong',
                addSongsInWaiting: 'addSongsInWaiting',
            }),

            /*
            inWaiting(song) {
                bus.$emit("inwaiting", this.$store.state.songs.indexOf(song));
            }*/
        },

        computed: {
            ...mapGetters(["getSongsPlaylist"]),

            filteringList() {
                return this.filteredList.filter(songs => {
                    return songs.title.toLowerCase().includes(this.search.toLowerCase())
                })
            },

        }
    }
</script>

<style scoped>

</style>
