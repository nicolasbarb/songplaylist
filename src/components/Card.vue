<template>
  <div id="audioContainer">
    <sound-player></sound-player>
    <div class="playlist">
      <playlist></playlist>
    </div>
  </div>
</template>

<script>
import Playlist from "./Playlist";
import SoundPlayer from "./SoundPlayer";

export default {
  name: "Card",
  components: { SoundPlayer, Playlist },
};
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
