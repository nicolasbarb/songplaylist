<template>

        <ul>
            <div v-for="song in songs" :key="song.urlSong">
                <v-btn class="btn" @click="startSong(song)">
                    {{ song.title }}
                </v-btn>
            </div>
        </ul>
</template>

<script>
    export default {
        name: "playlist",
        props: {
            songs: {
                required: true
            }
        },
        methods: {
            startSong(song) {
                this.$emit("startsong", song)
            }
        }
    }
</script>

<style scoped>

</style>
