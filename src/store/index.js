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
          state.previousSongs.push(song)
        },

        addSongsInWaiting(state, songs){
            state.inWaitingSongs = songs
        },

        playThisSong(state, songChosen){
            state.seletedSong = songChosen
        }
    },
    actions: {

        songs({commit}, songs){
            commit('songs', songs)
        },

        addSongsInWaiting({commit}, songs){
          commit('addSongsInWaiting', songs)
        },

        addSongsInPrevious({commit}, song){
            commit('addSongsInPrevious', song)
        },

        playThisSong({commit}, songChosen){
            commit('playThisSong', songChosen)
        },
    }
});
