// store/index.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        songs: [],
        artistes: [],
        inWaitingSongs: [],
        previousSongs: [],
        selectedSong: null,
        favoriteList: [],
        favoriteSong: null,
    },
    getters: {
        getSongsPlaylist: state => state.songs,
        getArtisteSongs: state => state.artistes,
        getSelectedSong: state => state.selectedSong,
        getWaitingSongs: state => state.inWaitingSongs,
        getPreviousSongs: state => state.previousSongs,
        getFavoriteList: state => state.favoriteList,
        getFavoriteSong: state => state.favoriteSong,
    },
    mutations: {

        songs(state, songs) {
            state.songs = songs
        },
        artisteSong(state, artiste) {
            state.artistes = artiste
        },
        addSongsInPrevious(state, song) {
            state.previousSongs.push(song)
        },
        addSongsInWaiting(state, songs) {
            state.inWaitingSongs = songs
        },
        playThisSong(state, songChosen) {
            state.selectedSong = songChosen
        },
        setFavoriteSong(state, favoriteSong) {
            state.favoriteSong = favoriteSong
        },
        filterFavoriteList(state) {
            let exists = state.favoriteList.includes(state.favoriteSong)
            if (exists === true) {
                let filter = state.favoriteList.indexOf(state.selectedSong)
                state.favoriteList.splice(filter, 1)
                console.log("deleted")
            } else {
                state.favoriteList.push(state.favoriteSong)
                console.log("added")
            }
        }
    },
    actions: {

        songs({commit}, songs) {
            commit('songs', songs)
        },
        artisteSong({commit}, artiste) {
            commit('artisteSong', artiste)
        },
        addSongsInWaiting({commit}, songs) {
            commit('addSongsInWaiting', songs)
        },
        addSongsInPrevious({commit}, song) {
            commit('addSongsInPrevious', song)
        },
        playThisSong({commit}, songChosen) {
            commit('playThisSong', songChosen)
        },
        setFavoriteSong({commit}, favoriteSong) {
            commit('setFavoriteSong', favoriteSong)
        },
        filterFavoriteList({commit}, favoriteList) {
            commit('filterFavoriteList', favoriteList)
        },
    }
});
