// store/index.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        songs: [],
        inWaitingSongs: [],
        previousSongs: [],
        seletedSong: null,
    },
    getters: {
        getSongsPlaylist: state => state.songs,
        getSelectedSong: state => state.seletedSong,
        getWaitingSongs: state => state.inWaitingSongs,
        getPreviousSongs: state => state.previousSongs
    },
    mutations: {

        songs(state, songs){
          state.songs = songs
        },

        addSongsInPrevious(state, song){
/*            if(state.previousSongs.includes(song))
            {
                console.log("try");
                return;
            }*/
          state.previousSongs.push(song)
        },

        addSongsInWaiting(state, song){
            state.inWaitingSongs.push(song)
        },

        playThisSong(state, songChosen){
            state.seletedSong = songChosen
        },

        spliceInWaitingSong(state, song){
            let exist = state.inWaitingSongs.includes(song);

            if(exist === true) {
                console.log("Trop efficace");
                let indexOfSong = state.inWaitingSongs.indexOf(song);
                state.inWaitingSongs.splice(indexOfSong, 1)
            } else {
                console.log("Ma foi");
            }
        },

        popPreviousSong(state, previousSongs){
            state.previousSongs = previousSongs
        }
    },
    actions: {

        songs({commit}, songs){
            commit('songs', songs)
        },

        addSongsInWaiting({commit}, song){
          commit('addSongsInWaiting', song)
        },

        addSongsInPrevious({commit}, song){
            commit('addSongsInPrevious', song)
        },

        playThisSong({commit}, songChosen){
            commit('playThisSong', songChosen)
        },

        spliceInWaitingSong({commit}, song){
            commit('spliceInWaitingSong', song)
        },

        popPreviousSong({commit}){

            let previousSongs = Array.from(this.state.previousSongs);
            let popedSong = previousSongs.pop();
            commit('popPreviousSong', previousSongs);
            return popedSong
        }
    }
});
