<template>
  <v-app id="app">
    <div class="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/card">Card</router-link>
    </div>
    <router-view/>
  </v-app>
</template>

<style lang="scss">
#app {
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  background-color: darkgrey;
  overflow: hidden;

  .nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;
      text-decoration: none;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}


</style>
