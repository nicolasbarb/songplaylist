<template>
    <div id="audioContainer">
        <sound-player/>
        <playlist/>
    </div>
</template>

<script>
    import Playlist from "./Playlist";
    import SoundPlayer from "./SoundPlayer";

    export default {
        name: "Card",
        components: {SoundPlayer, Playlist},
    };
</script>

<style scoped lang="scss">
    #audioContainer {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        border: 1px solid black;
        width: 800px;
        height: 550px;
        background-color: whitesmoke;
        border-radius: 10px;
        overflow: hidden;

    }
</style>
